import { BisterManageModel } from "../model/bister_manage_model.js";
import TwilioClient  from "twilio";

const accountSid = "ACc60ceee5eb007832f00eb3c467d7bcf5";
const authToken = "02c3bba9be473169d95a89d8111fe822";

const client = new TwilioClient(accountSid, authToken);

//for new order
export const createNewBisterOrder = async (req, res) => {
  try {
    // Extract necessary data from request body
    const {
      name,
      phoneNumber,
      alternatePhone,
      address,
      dateAndTime,
      otherDetails,
      orderType,
    } = req.body;

    // Create a new bister order instance
    const newBisterOrder = new BisterManageModel({
      name,
      phoneNumber,
      alternatePhone,
      address,
      dateAndTime,
      otherDetails,
      orderType,
    });

    // Save the new bister order to the database
    const bistar = await newBisterOrder.save();

    // Send a success response
    res.status(201).json({
      success: true,
      message: "New bister order created successfully",
      id: bistar._id,
    });

    //send whatapp mssage
    // Call the form submission handler

    const formData = {
      phoneNumber: "9506497032", // Replace with the recipient's phone number
      messageContent: "Hello from Node.js!", // Replace with the desired message content
    };

    formSubmitHandler(formData);
  } catch (error) {
    // Handle any errors that occur during the process
    res.status(500).json({
      message: "Failed to create new bister order",
      error: error.message,
    });
  }
};

// Function to send WhatsApp message
async function sendWhatsAppMessage(to, message) {
  try {
      const result = await client.messages.create({
          from: 'whatsapp:+14155238886', // Twilio-provided WhatsApp number
          body: message,
          to: `whatsapp:${to}`
      });
      console.log('WhatsApp message sent:', result.sid);
  } catch (err) {
      console.error('Error sending WhatsApp message:', err);
  }
}

// Example usage after successful form submission
const formSubmitHandler = async (formData) => {
  // Process form data
  // Assuming you have the phone number and message content in formData
  const { phoneNumber, messageContent } = formData;

  // Send WhatsApp message
  await sendWhatsAppMessage(phoneNumber, messageContent);
};


// Controller function to fetch all orders
export const getAllOrders = async (req, res) => {
  try {
    // Fetch all orders from the database
    const orders = await BisterManageModel.find();

    // Send the orders as a response
    res.status(200).json(orders);
  } catch (error) {
    // Handle any errors that occur during the process
    res
      .status(500)
      .json({ message: "Failed to fetch orders", error: error.message });
  }
};

// Controller function to update an order
export const updateOrder = async (req, res) => {
  try {
    // Extract order ID from request parameters
    const { id } = req.params;
    // Extract updated order data from request body
    const updatedOrderData = req.body;
    // Find the order by ID and update it with the new data
    const updatedOrder = await BisterManageModel.findByIdAndUpdate(
      id,
      updatedOrderData,
      { new: true }
    );

    if (!updatedOrder) {
      // If the order with the given ID is not found, return a 404 error
      return res.status(404).json({ message: "Order not found" });
    }

    // Send the updated order as a response
    res.status(200).json({
      sucess: true,
      message: "Updated successfully",
      updatedOrder,
    });
  } catch (error) {
    // Handle any errors that occur during the process
    res
      .status(500)
      .json({ message: "Failed to update order", error: error.message });
  }
};

// Controller function to delete an order
export const deleteOrder = async (req, res) => {
  try {
    // Extract order ID from request parameters
    const { id } = req.params;

    // Find the order by ID and delete it
    const deletedOrder = await BisterManageModel.findByIdAndDelete(id);

    if (!deletedOrder) {
      // If the order with the given ID is not found, return a 404 error
      return res.status(404).json({ message: "Order not found" });
    }

    // Send a success response
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    // Handle any errors that occur during the process
    res
      .status(500)
      .json({ message: "Failed to delete order", error: error.message });
  }
};
