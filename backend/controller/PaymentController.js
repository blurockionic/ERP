import crypto from "crypto";
import Razorpay from "razorpay";
import Subscription from "../model/subscription_model.js";
// Create payment
export const initiatePayment = async (req, res) => {
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  const { amount, currency, receipt, companyId, plan, startDate, status } =
    req.body;

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

    const paymentHistory = {
      invoiceId: order.receipt,
      amount: order.amount,
      date: order.created_at,
    };

    // Calculate the end date one year from the start date

    //save payemnt instance in db
    const subscriptionDetails = await Subscription.create({
      companyId,
      plan,
      startDate,
      endDate: startDate,
      status,
      paymentHistory: [paymentHistory],
    });

    res.status(200).json({
      success: true,
      order,
      subscriptionDetails,
      message: "Payment initiated successfully.",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//validate payment
export const velidatePayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  try {
    const sha = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
    // order_id + "|" + razorpay_payment_id
    sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);

    const digest = sha.digest("hex");
    if (digest !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Transaction is not valid.",
      });
    }

    res.status(200).json({
      sucess: true,
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      message: "Payement successfully.",
    });
  } catch (error) {
    console.log(error);
  }
};

// Capture payment
export const updatePayment = async (req, res) => {
  const { id } = req.params;

  try {
    const payment = await Subscription.find({ _id: id });
    console.log(payment);
    res.json(payment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
