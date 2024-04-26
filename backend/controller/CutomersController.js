import { Customer } from "../model/Customer.js";

//create order
export const NewCustomer = async (req, res) => {
  //GENRATE ORDER ID
  let orderCounter = 0; // Initialize the order counter

  async function generateOrderId() {
    // Fetching the count of existing orders asynchronously
    const order_count = await Customer.countDocuments({});

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
  try {
    // Extracting relevant fields from the request body
    const {
      customerName,
      customerAddress,
      customerPhoneNumber,
      customerEmail,
      otherDetails,
      isTentOrdered,
      dateAndTime,
      isCateringOrdered,
      isDecorationOrdered,
      isBistarOrdered,

      isLightOrdered,
      status,

    } = req.body.data;
 
    console.log("frontend se aa rahi date", dateAndTime);

    // Set status based on date
    const orderDate = new Date(dateAndTime);
    orderDate.setUTCHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0 for comparison
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0 for comparison
    const calculatedStatus = orderDate < today ? "completed" : status;

    // Create a new instance of the Customer model
    // Creating a new instance of the Customer model
    const newCustomer = new Customer({
      orderId: await generateOrderId(),
      customerName,
      customerAddress,
      customerPhoneNumber,
      customerEmail,
      otherDetails,
      dateAndTime,
      isTentOrdered,
      isCateringOrdered,
      isDecorationOrdered,
      isBistarOrdered,
      isLightOrdered,
      status: calculatedStatus, // Use calculated status
    });

    // Saving the new customer entry to the database
    await newCustomer.save();

    // // find previous latest one
    // const previousOrder =  await Customer.find().sort({ createdAt: -1 });

    // //validation if prevorder is emplty
    // if(!previousOrder){
    //   console.log(previousOrder.orderId)
    // }

    // // if previousOrder is not empty
    // if(previousOrder){
    //   console.log(previousOrder.orderId)
    // }

    // Sending a success response
    res.status(201).json({
      success: true,
      message: "Customer created successfully",
      customer: newCustomer,
    });
  } catch (error) {
    // Handling any errors that occur during the process
    console.error("Error creating customer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// controller for update
export const updateCustomer = async (req, res) => {
  try {
    // Extracting the customer ID from the request parameters
    const customerId = req.params.id;

    const { customerName, customerAddress, customerPhoneNumber } = req.body;

    // Checking if the provided customer ID is valid
    if (!customerId) {
      return res.status(400).json({ message: "Invalid customer ID" });
    }

    // Finding the customer entry by ID in the database
    const existingCustomer = await Customer.findById(customerId);

    // Checking if the customer exists
    if (!existingCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Updating the customer entry with the provided data from the request body
    existingCustomer.customerAddress = customerAddress;
    existingCustomer.customerName = customerName;
    existingCustomer.customerPhoneNumber = customerPhoneNumber;

    // Saving the updated customer entry to the database
    await existingCustomer.save();

    // Sending a success response
    res.status(200).json({
      success: true,
      message: "Customer order updated successfully",
      customer: existingCustomer,
    });
  } catch (error) {
    // Handling any errors that occur during the process
    console.error("Error updating customer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// controller for update only status of orde
export const updateOrderStatus = async (req, res) => {
  try {
    // Extracting the customer ID from the request parameters
    const customerId = req.params.id;

    const {status} = req.body;
    console.log("new status",status);

    // Checking if the provided customer ID is valid
    if (!customerId) {
      return res.status(400).json({ message: "Invalid customer ID" });
    }

    // Finding the customer entry by ID in the database
    const existingCustomer = await Customer.findById(customerId);

    // Checking if the customer exists
    if (!existingCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Updating the customer entry with the provided data from the request body
    existingCustomer.status = status;

    // Saving the updated customer entry to the database
    await existingCustomer.save();

    // Sending a success response
    res.status(200).json({
      success: true,
      message: "Order's Status updated successfully",
      customer: existingCustomer,
    });
  } catch (error) {
    // Handling any errors that occur during the process
    console.error("Error updating order status :", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


//controller for get all customer
export const getAllCustomer = async (req, res) => {
  try {
    // Fetching all customer entries from the database sorted by createdAt field in descending order
    const customers = await Customer.find().sort({ createdAt: -1 });

    // Sending a success response with the list of customers
    res.status(200).json({ success: true, customers });
  } catch (error) {
    // Handling any errors that occur during the process
    console.error("Error fetching customers:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//controller for delete customer
export const deleteCustomer = async (req, res) => {
  try {
    // Extracting the customer ID from the request parameters
    const customerId = req.params.id;

    // Checking if the provided customer ID is valid
    if (!customerId) {
      return res.status(400).json({ message: "Invalid customer ID" });
    }

    // Finding the customer entry by ID in the database
    const existingCustomer = await Customer.findById(customerId);

    // Checking if the customer exists
    if (!existingCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Deleting the customer entry from the database
    await existingCustomer.remove();

    // Sending a success response
    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    // Handling any errors that occur during the process
    console.error("Error deleting customer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//cotroller for get specific cutomer details
export const getSpecificCustmerDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const orders = await Customer.findOne({ _id: id });
    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
