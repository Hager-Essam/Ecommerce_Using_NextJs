# 💳 Payment Integration Guide

## 🎯 Payment Methods Implemented

### 1. Stripe (Credit/Debit Cards)
- ✅ Most popular payment gateway
- ✅ Supports all major cards
- ✅ PCI compliant
- ✅ Easy integration

### 2. Cash on Delivery (COD)
- ✅ Already implemented
- ✅ No payment gateway needed
- ✅ Payment collected on delivery

---

## 🚀 Quick Setup - Stripe Integration

### Step 1: Create Stripe Account

1. Go to https://stripe.com
2. Click "Start now" or "Sign up"
3. Complete registration
4. Verify your email

### Step 2: Get API Keys

1. Go to https://dashboard.stripe.com/test/apikeys
2. Copy your keys:
   - **Publishable key** (starts with `pk_test_`)
   - **Secret key** (starts with `sk_test_`)

### Step 3: Update .env.local

```env
# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

### Step 4: Install Stripe Package

```bash
npm install @stripe/stripe-js stripe
```

### Step 5: Restart Server

```bash
npm run dev
```

---

## 📝 Implementation Files

I'll create the complete Stripe integration for you. Here's what will be added:

### Files to Create:

1. **`lib/stripe.js`** - Stripe configuration
2. **`app/api/create-payment-intent/route.js`** - Payment API
3. **`app/api/webhooks/stripe/route.js`** - Webhook handler
4. **`components/StripeCheckoutForm.jsx`** - Payment form
5. **`app/checkout/payment/page.js`** - Payment page

---

## 💳 Stripe Integration Code

### 1. Stripe Configuration (`lib/stripe.js`)

```javascript
import Stripe from 'stripe';

// Initialize Stripe with secret key
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

// Get Stripe publishable key for client
export const getStripePublishableKey = () => {
  return process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
};
```

### 2. Create Payment Intent API (`app/api/create-payment-intent/route.js`)

```javascript
import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { amount, currency = 'usd', metadata } = await req.json();

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      metadata: {
        userId: session.user.id,
        ...metadata,
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error('Payment intent error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
```

### 3. Stripe Webhook Handler (`app/api/webhooks/stripe/route.js`)

```javascript
import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';

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
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}

async function handlePaymentSuccess(paymentIntent) {
  try {
    await connectDB();
    
    // Update order status
    const order = await Order.findOne({
      'payment.transactionId': paymentIntent.id,
    });

    if (order) {
      order.payment.status = 'paid';
      order.status = 'processing';
      await order.save();
      
      console.log('✅ Payment successful for order:', order.orderNumber);
    }
  } catch (error) {
    console.error('Error handling payment success:', error);
  }
}

async function handlePaymentFailure(paymentIntent) {
  try {
    await connectDB();
    
    const order = await Order.findOne({
      'payment.transactionId': paymentIntent.id,
    });

    if (order) {
      order.payment.status = 'failed';
      order.status = 'cancelled';
      await order.save();
      
      console.log('❌ Payment failed for order:', order.orderNumber);
    }
  } catch (error) {
    console.error('Error handling payment failure:', error);
  }
}
```

### 4. Stripe Checkout Form Component (`components/StripeCheckoutForm.jsx`)

```javascript
'use client';

import { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { Loader } from 'lucide-react';

export default function StripeCheckoutForm({ amount, onSuccess, onError }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error: submitError } = await elements.submit();
      
      if (submitError) {
        setError(submitError.message);
        setLoading(false);
        return;
      }

      const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/checkout/success`,
        },
        redirect: 'if_required',
      });

      if (confirmError) {
        setError(confirmError.message);
        if (onError) onError(confirmError);
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        if (onSuccess) onSuccess(paymentIntent);
      }
    } catch (err) {
      setError(err.message);
      if (onError) onError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader className="h-5 w-5 animate-spin" />
            Processing...
          </>
        ) : (
          `Pay $${amount.toFixed(2)}`
        )}
      </button>
    </form>
  );
}
```

---

## 🧪 Testing

### Test Cards (Stripe Test Mode):

#### Successful Payments:
- **Card Number:** `4242 4242 4242 4242`
- **Expiry:** Any future date (e.g., 12/34)
- **CVC:** Any 3 digits (e.g., 123)
- **ZIP:** Any 5 digits (e.g., 12345)

#### Failed Payments:
- **Card Declined:** `4000 0000 0000 0002`
- **Insufficient Funds:** `4000 0000 0000 9995`
- **Expired Card:** `4000 0000 0000 0069`

### Test Flow:

1. **Add items to cart**
2. **Go to checkout**
3. **Fill shipping information**
4. **Select "Credit Card" payment**
5. **Enter test card details**
6. **Click "Pay"**
7. **Order should be created**
8. **Payment should be processed**

---

## 🔒 Security Best Practices

### 1. Never Store Card Details
- ✅ Stripe handles all card data
- ✅ Your server never sees card numbers
- ✅ PCI compliance handled by Stripe

### 2. Use Webhooks
- ✅ Verify payments server-side
- ✅ Don't trust client-side confirmations
- ✅ Handle async payment updates

### 3. Validate Amounts
- ✅ Calculate totals server-side
- ✅ Never trust client-sent amounts
- ✅ Verify before creating payment intent

### 4. Use HTTPS
- ✅ Required for Stripe
- ✅ Protects customer data
- ✅ Required for production

---

## 📊 Payment Flow

### Complete Payment Flow:

```
1. User adds items to cart
   ↓
2. User goes to checkout
   ↓
3. User fills shipping info
   ↓
4. User selects payment method
   ↓
5. If Credit Card:
   a. Frontend requests payment intent
   b. Server creates Stripe payment intent
   c. Server returns client secret
   d. Frontend shows Stripe payment form
   e. User enters card details
   f. Stripe processes payment
   g. Webhook confirms payment
   h. Order status updated
   ↓
6. If Cash on Delivery:
   a. Order created immediately
   b. Payment status: "pending"
   c. Will be collected on delivery
   ↓
7. Order confirmation shown
   ↓
8. Confirmation email sent
```

---

## 🌍 Supported Countries

### Stripe Supports 45+ Countries:
- 🇺🇸 United States
- 🇬🇧 United Kingdom
- 🇨🇦 Canada
- 🇦🇺 Australia
- 🇩🇪 Germany
- 🇫🇷 France
- And many more...

Check full list: https://stripe.com/global

---

## 💰 Pricing

### Stripe Fees:
- **Online payments:** 2.9% + $0.30 per transaction
- **No setup fees**
- **No monthly fees**
- **No hidden costs**

### Example:
- Order total: $100.00
- Stripe fee: $3.20
- You receive: $96.80

---

## 🐛 Troubleshooting

### Issue: "Stripe is not defined"

**Solution:**
```bash
npm install @stripe/stripe-js stripe
```

### Issue: "Invalid API key"

**Solution:**
- Check `.env.local` has correct keys
- Keys should start with `pk_test_` and `sk_test_`
- Restart server after adding keys

### Issue: "Webhook signature verification failed"

**Solution:**
- Get webhook secret from Stripe Dashboard
- Add to `.env.local` as `STRIPE_WEBHOOK_SECRET`
- Format: `whsec_...`

### Issue: "Payment succeeds but order not updated"

**Solution:**
- Check webhook is configured
- Check webhook endpoint is accessible
- Check server logs for errors

---

## 📚 Additional Resources

- [Stripe Documentation](https://stripe.com/docs)
- [Stripe Testing](https://stripe.com/docs/testing)
- [Stripe Webhooks](https://stripe.com/docs/webhooks)
- [Stripe Dashboard](https://dashboard.stripe.com)

---

## ✅ Setup Checklist

- [ ] Stripe account created
- [ ] API keys obtained
- [ ] Keys added to `.env.local`
- [ ] Stripe packages installed
- [ ] Server restarted
- [ ] Test payment successful
- [ ] Webhook configured (for production)
- [ ] Order creation working
- [ ] Email confirmation working

---

**Payment integration is ready! 🎉**

**Next:** Test with test cards, then switch to live keys for production.
