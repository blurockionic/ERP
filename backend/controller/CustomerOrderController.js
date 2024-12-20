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
    companyId,
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
    isCateringOrdered,
    isTentOrdered,
    isBistarOrdered,
    isLightOrdered,
  } = req.body;
  try {
    const order = await CustomerOrder.create({
      companyId,
      orderId: await generateOrderId(),
      customerName,
      customerAddress,
      customerPhoneNumber,
      customerEmail,
      otherDetails,
      dateAndTime,
      orderStatus,
      isCateringOrdered,
      isTentOrdered,
      isBistarOrdered,
      isLightOrdered,
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
    const orders = await CustomerOrder.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// controller for retrieving particular customer all order
export const getAllOrderOfACustomer = async (req, res) => {
  try {
    // Aggregate orders by customer name and phone number
    const ordersByCustomer = await CustomerOrder.aggregate([
      {
        $group: {
          _id: {
            name: "$customerName",
            phoneNumber: "$customerPhoneNumber",
            customerAddress: "$customerAddress",
            companyId: "$companyId",
          },
          orders: { $push: "$$ROOT" },
        },
      },
    ]);

    // Extract unique customer names and phone numbers
    const uniqueCustomers = ordersByCustomer.map((item) => ({
      customerName: item._id.name,
      customerPhoneNumber: item._id.phoneNumber,
      customerAddress: item._id.customerAddress,
      companyId: item._id.companyId,
      orders: item.orders, // Orders for each unique customer
    }));

    res.status(200).json({ success: true, data: uniqueCustomers });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controller for retrieving a single order by orderId
export const getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const orders = await CustomerOrder.findOne({ _id: id });
    if (!orders) {
      return res.status(404).json({ success: false, error: "Order not found" });
    }
    res.status(200).json({ success: true, data: orders });
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

//update status
export const updateOrderStatus = async (req, res) => {
  const { id } = req.params;

  const { orderStatus } = req.body;
  try {
    // Find customer order
    const updateOrder = await CustomerOrder.findById(id);

    // Validate
    if (!updateOrder) {
      return res.status(400).json({
        success: false,
        message: "Order not found!",
      });
    }

    // Update the value
    updateOrder.orderStatus = orderStatus;

    // Save the updated field
    await updateOrder.save();

    res.status(200).json({
      success: true,
      message: `Now order is ${orderStatus}.`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//UPDATE ITEM FROM ODERDETAILS
export const addItems = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  console.log(req.body);
  const { flag, item } = req.body;
  try {
    //find the order first and then push the items
    const findOrder = await CustomerOrder.findById(id);
    //validation
    if (!findOrder) {
      return res.status(500).json({
        success: false,
        message: "order not found",
      });
    }

    // if flag id bedding then
    if (flag === "beding") {
      // Check if the item already exists
      const itemIndex = findOrder.bistarOrder.findIndex(
        (orderItem) => orderItem.itemNameBistar === item.itemName
      );

      if (itemIndex > -1) {
        // Item exists, update the quantity
        findOrder.bistarOrder[itemIndex].itemCountForOrderBistar =
          item.quantity;
        var message = "item updated";
      } else {
        // Item does not exist, push new item
        findOrder.bistarOrder.push({
          itemNameBistar: item.itemName,
          itemCountForOrderBistar: item.quantity,
        });
        var message = "new item added";
      }

      const addedNew = await findOrder.save();

      // Return the response
      res.status(200).json({
        success: true,
        message: message,
        item: addedNew,
      });
    }

    // if flag id bedding then
    if (flag === "light") {
      console.log(findOrder.lightOrder);
      // then push bistar order
      findOrder.bistarOrder.push(item);
      const addedNew = await findOrder.save();

      //retrun the response
      res.status(200).json({
        success: true,
        message: "new item added",
      });
    }
    // if flag id bedding then
    if (flag === "tent") {
      console.log(findOrder.bistarOrder);
      // then push bistar order
      findOrder.bistarOrder.push(item);
      const addedNew = await findOrder.save();

      //retrun the response
      res.status(200).json({
        success: true,
        message: "new item added",
      });
    }
    // if flag id bedding then
    if (flag === "catering") {
      console.log(findOrder.cateringOrder);
      // then push bistar order
      findOrder.cateringOrder.push(item);
      const addedNew = await findOrder.save();

      //retrun the response
      res.status(200).json({
        success: true,
        message: "new item added",
      });
    }
  } catch (error) {}
};

// delete controller for remove the item
export const removeItem = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  console.log(req.body);

  const { flag, item } = req.body;

  try {
    // Find the order first
    const findOrder = await CustomerOrder.findById(id);

    // Validation
    if (!findOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // If flag is "beding"
    if (flag === "beding") {
      // Check if the item exists
      const itemIndex = findOrder.bistarOrder.findIndex(
        (orderItem) => orderItem.itemNameBistar === item.itemNameBistar
      );

      console.log("working");
      console.log(itemIndex);

      if (itemIndex === -1) {
        // Item not found
        return res.status(404).json({
          success: false,
          message: "Item not found",
        });
      }

      // Remove the item
      findOrder.bistarOrder.splice(itemIndex, 1);

      // Save the updated order
      const updatedOrder = await findOrder.save();

      // Return the response
      res.status(200).json({
        success: true,
        message: "Item removed successfully",
        item: updatedOrder.bistarOrder,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Invalid flag value",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred",
    });
  }
};
