import crypto from 'crypto';
import razorpay from "../config/razorpay.js"

// Create payment
export const initiatePayment = async (req, res) => {
  const { amount, currency, receipt } = req.body;

  const options = {
    amount: amount * 100, // Amount is in the smallest currency unit (e.g., paise for INR)
    currency,
    receipt,
    payment_capture: '1', // Auto capture
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Capture payment
export const capturePayment = async (req, res) => {
  const { paymentId, amount } = req.body;

  try {
    const payment = await razorpay.payments.capture(paymentId, amount * 100);
    res.json(payment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Webhook endpoint to handle Razorpay payment success/failure callbacks
export const webHook = async (req, res) => {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

  // Verify webhook signature
  const shasum = crypto.createHmac('sha256', secret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest('hex');

  if (digest === req.headers['x-razorpay-signature']) {
    // Handle the payment
    console.log('Payment is legit');
    // Do something with the event data
  } else {
    // Invalid signature
    console.log('Invalid signature');
  }

  res.status(200).json({ status: 'ok' });
};
