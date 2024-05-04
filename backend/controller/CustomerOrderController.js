import { CustomerOrder } from "../model/customerOrder.js";

// Controller for creating a new order
export const createOrder = async (req, res) => {
  //GENRATE ORDER ID
  let orderCounter = 0; // Initialize the order counter

  async function generateOrderId() {
    // Fetching the count of existing orders asynchronously
    const order_count = await CustomerOrder.countDocuments({});

    // Incrementing the count for the new order
    const orderCounter = order_count + 1;

    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}${(
      currentDate.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}${currentDate.getDate().toString().padStart(2, "0")}`;

    // Padding the order number to ensure it's always three digits
    const paddedOrderNumber = orderCounter.toString().padStart(3, "0");

    return `ORD-${formattedDate}-${paddedOrderNumber}`;
  }

  const {
    customerName,
    customerAddress,
    customerPhoneNumber,
    customerEmail,
    otherDetails,
    dateAndTime,
    orderStatus,
    tentOrder,
    bistarOrder,
    lightOrder,
    cateringOrder,
  } = req.body;
  try {
    const order = await CustomerOrder.create({
      orderId: await generateOrderId(),
      customerName,
      customerAddress,
      customerPhoneNumber,
      customerEmail,
      otherDetails,
      dateAndTime,
      orderStatus,
      tentOrder,
      bistarOrder,
      lightOrder,
      cateringOrder,
    });
    res.status(201).json({ success: true, data: order });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Controller for retrieving all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await CustomerOrder.find();
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controller for retrieving a single order by orderId
export const getOrderById = async (req, res) => {
  try {
    const order = await CustomerOrder.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ success: false, error: "Order not found" });
    }
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controller for updating an order
export const updateOrder = async (req, res) => {
  try {
    const order = await CustomerOrder.findByIdAndUpdate(
      req.params.orderId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!order) {
      return res.status(404).json({ success: false, error: "Order not found" });
    }
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Controller for deleting an order
export const deleteOrder = async (req, res) => {
  try {
    const order = await CustomerOrder.findByIdAndDelete(req.params.orderId);
    if (!order) {
      return res.status(404).json({ success: false, error: "Order not found" });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
