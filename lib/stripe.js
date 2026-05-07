import Stripe from 'stripe';

// Initialize Stripe with secret key (server-side only)
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

// Helper function to format amount for Stripe (converts dollars to cents)
export function formatAmountForStripe(amount) {
  return Math.round(amount * 100);
}

// Helper function to format amount from Stripe (converts cents to dollars)
export function formatAmountFromStripe(amount) {
  return amount / 100;
}
