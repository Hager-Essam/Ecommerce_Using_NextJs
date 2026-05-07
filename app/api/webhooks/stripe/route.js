import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';

// Disable body parsing for webhook
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    );
  }

  // Handle the event
  try {
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        await handlePaymentSuccess(paymentIntent);
        break;

      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object;
        await handlePaymentFailure(failedPayment);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error('Webhook handler error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

async function handlePaymentSuccess(paymentIntent) {
  try {
    await connectDB();

    const metadata = paymentIntent.metadata;
    const items = JSON.parse(metadata.items || '[]');

    // Create order in database
    const order = await Order.create({
      user: metadata.userId,
      items: items.map((item) => ({
        product: item.productId,
        quantity: item.quantity,
        price: item.price,
      })),
      totalAmount: paymentIntent.amount / 100,
      paymentMethod: 'stripe',
      paymentStatus: 'paid',
      paymentIntentId: paymentIntent.id,
      status: 'processing',
      shippingAddress: {
        fullName: metadata.shippingName || '',
        address: metadata.shippingAddress || '',
        city: metadata.shippingCity || '',
        postalCode: metadata.shippingPostalCode || '',
        country: metadata.shippingCountry || '',
      },
    });

    console.log('Order created successfully:', order._id);
  } catch (error) {
    console.error('Error creating order:', error);
  }
}

async function handlePaymentFailure(paymentIntent) {
  console.log('Payment failed:', paymentIntent.id);
  // Handle payment failure (send email, update records, etc.)
}
