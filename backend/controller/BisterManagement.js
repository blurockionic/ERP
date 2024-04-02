import { Customer } from "../model/Customer.js";
import { BisterManageModel } from "../model/bister_manage_model.js";

//for new order
export const createNewBisterOrder = async (req, res) => {
  try {
    // Extract necessary data from request body
    const { customerId, orderItems } = req.body;

    const { pillow, bed, bedsheet, blanket } = orderItems;

    //now update the customer details
    const updateCustomerTentOrder = await Customer.findById(customerId);

    // assign true
    updateCustomerTentOrder.isBistarOrdered = true;

    //update the detail
    await updateCustomerTentOrder.save();

    // Create a new bister order instance
    const newBisterOrder = new BisterManageModel({
      customerId,
      pillow,
      bed,
      bedsheet,
      blanket,
    });

    // Save the new bister order to the database
    const bistar = await newBisterOrder.save();

    // Send a success response
    res.status(201).json({
      success: true,
      message: "New bister order created successfully",
      id: bistar._id,
    });
  } catch (error) {
    // Handle any errors that occur during the process
    res.status(500).json({
      message: "Failed to create new bister order",
      error: error.message,
    });
  }
};

// Controller function to fetch all orders
export const getSpecificOrders = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch all orders from the database
    const orders = await BisterManageModel.findOne({ customerId: id });

    // Send the orders as a response
    res.status(200).json({ success: true, orders });
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
    const { orderItems, orderedTentItemCount, orderedTentItemName } = req.body;

    // Find the order by ID and update it with the new data
    const updatedOrder = await BisterManageModel.findByIdAndUpdate(
      id,
      {
        $set: {
          orderedTentItemCount,
          orderedTentItemName,
          orderBistarItems: orderItems,
        },
      },
      { new: true }
    );

    if (!updatedOrder) {
      // If the order with the given ID is not found, return a 404 error
      return res.status(404).json({ message: "Order not found" });
    }

    // Send the updated order as a response
    res.status(200).json({
      success: true,
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
