import { loadStripe } from '@stripe/stripe-js';

let stripePromise = null;

// FUNCTION TO GET STRIPE INSTANCE
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_PUBLISH_KEY);
  }
  return stripePromise;
};

// FUNCTION TO HANDLE PAYMENT
export async function checkout({ lineItems }) {
  const stripe = await getStripe(); // Wait for the Stripe instance

  const body = {
    products: lineItems
  }

  console.log("Line items in checkout:", lineItems);

  const headers = {
    "Content-Type": "application/json",
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/create-checkout-session`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body),
  }); // Fetch the API

  const session = await response.json(); // Get the session from the API

  const result = stripe.redirectToCheckout({
    sessionId: session.session_id,
  }); // Redirect to checkout

  if (result.error) {
    console.error('Error redirecting to checkout:', result.error);
    alert('Payment failed. Please try again.');
  }
}
