import crypto from "crypto";
import Razorpay from "razorpay";

// Create payment
export const initiatePayment = async (req, res) => {
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  const { amount, currency, receipt } = req.body;

  const options = {
    amount: amount * 100, // Amount is in the smallest currency unit (e.g., paise for INR)
    currency,
    receipt,
    payment_capture: "1", // Auto capture
  };

  try {
    const order = await razorpay.orders.create(options);

    // validation
    if (!order) {
      return res.status(500).json({
        success: false,
        message: "payment not initiate successfully!",
      });
    }

    res.status(200).json({
      success: true,
      order,
      message: "Payment initiated successfully.",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//validate payment
export const velidatePayment = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  } = req.body;

  try{
    const sha = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    // order_id + "|" + razorpay_payment_id
    sha.update(`${razorpay_order_id}|${razorpay_payment_id}`)

    const digest = sha.digest("hex")
    if(digest !== razorpay_signature){
      return res.status(400).json({
        success: false,
        message: "Transaction is not valid."
      })
    }

    res.status(200).json({
      sucess: true,
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      message: "Payement successfully."
    })
  }catch(error){
    console.log(error)
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

