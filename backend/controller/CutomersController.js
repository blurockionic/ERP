import { Customer } from "../model/Customer.js";

export const NewCustomer = async (req, res) => {
  try {
    // Extracting relevant fields from the request body
    const {
      customerName,
      customerAddress,
      customerPhoneNumber,
      customerAlternatePhoneNumber,
      otherDetails,
      isTentOrdered,
      dateAndTime,
      isCateringOrdered,
      isDecorationOrdered,
      isBistarOrdered,
      isLightOrdered,
    } = req.body.data;


    //genrate orderId
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}${(currentDate.getMonth() + 1).toString().padStart(2, '0')}${currentDate.getDate().toString().padStart(2, '0')}`;
    const generatedOrderId = `ORD-DG-${formattedDate}${currentDate.getHours().toString().padStart(2, '0')}${currentDate.getMinutes().toString().padStart(2, '0')}${currentDate.getSeconds().toString().padStart(2, '0')}${currentDate.getMilliseconds().toString().padStart(3, '0')}`;

    console.log(generatedOrderId)
    // Creating a new instance of the Customer model
    const newCustomer = new Customer({
      orderId: generatedOrderId,
      customerName,
      customerAddress,
      customerPhoneNumber,
      customerAlternatePhoneNumber,
      otherDetails,
      dateAndTime,
      isTentOrdered,
      isCateringOrdered,
      isDecorationOrdered,
      isBistarOrdered,
      isLightOrdered,
    });

    // Saving the new customer entry to the database
    await newCustomer.save();

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

    console.log(customerId)

    const {checkedItems} =  req.body 


    console.log(checkedItems)

    let isTentOrdered
    let dateAndTime
    let isCateringOrdered
    let isDecorationOrdered
    let isBistarOrdered
    let isLightOrdered

    for(let i=0; i< checkedItems.length; i++){
      if(checkedItems[i] === "tent"){
        isTentOrdered = true 
      }

      //bistar
      if(checkedItems[i] === "catering"){
        isCateringOrdered = true
      }

      //light 
      if(checkedItems[i] === "light"){
        isLightOrdered =  true
      }

      //bistar
      if(checkedItems[i] ===  "bistar"){
        isBistarOrdered =  true
      }
    }

    console.log(isBistarOrdered, isLightOrdered, isCateringOrdered, isTentOrdered)

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
    existingCustomer.isBistarOrdered = isBistarOrdered
    existingCustomer.isTentOrdered =  isTentOrdered
    existingCustomer.isCateringOrdered = isCateringOrdered
    existingCustomer.isLightOrdered = isLightOrdered

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

//controller for get all customer
export const getAllCustomer = async(req, res)=>{
  try {
      // Fetching all customer entries from the database sorted by createdAt field in descending order
      const customers = await Customer.find().sort({ createdAt: -1 });
  
      // Sending a success response with the list of customers
      res.status(200).json({ success: true, customers });
  } catch (error) {
      // Handling any errors that occur during the process
      console.error('Error fetching customers:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
}


//controller for delete customer
export const deleteCustomer = async(req, res)=>{
    try {
        // Extracting the customer ID from the request parameters
        const customerId = req.params.id;
    
        // Checking if the provided customer ID is valid
        if (!customerId) {
          return res.status(400).json({ message: 'Invalid customer ID' });
        }
    
        // Finding the customer entry by ID in the database
        const existingCustomer = await Customer.findById(customerId);
    
        // Checking if the customer exists
        if (!existingCustomer) {
          return res.status(404).json({ message: 'Customer not found' });
        }
    
        // Deleting the customer entry from the database
        await existingCustomer.remove();
    
        // Sending a success response
        res.status(200).json({ message: 'Customer deleted successfully' });
      } catch (error) {
        // Handling any errors that occur during the process
        console.error('Error deleting customer:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
}