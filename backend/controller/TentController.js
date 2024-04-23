import { Customer } from "../model/Customer.js";
import { Tent } from "../model/tent_model.js";
import { Inventary } from "../model/inventary_model.js";

// Controller function to create a tent entry in the database
export const createTentEntry = async (req, res) => {
  try {
    // Extracting relevant fields from the request body
    const { customerId, orderedItems, orderedItemsCount, area } = req.body;

    //now update the customer details
    const updateCustomerTentOrder = await Customer.findById(customerId);

    // assign true
    updateCustomerTentOrder.isTentOrdered = true;

    //update the detail
    await updateCustomerTentOrder.save();

    // get all the Inventory
    const inventaryItems = await Inventary.find({}); // Assuming Inventary is your model

    // Iterate through each ordered item
    for (let itemName of orderedItems) {
        // Find the corresponding inventory item
        const inventoryItem = inventaryItems.find(item => item.itemName === itemName);
    
        if (inventoryItem) {
            // Update inventory for each ordered item count
            for (let itemCount of orderedItemsCount) {
                // Create a new object for each item to be saved
                const itemAvailable = (parseInt(inventoryItem.totalItemQuantity) - parseInt(itemCount)).toString()
                const updatedItem = {
                    ...inventoryItem.toObject(), // Convert Mongoose document to plain JavaScript object
                    itemOutForWork: itemCount.toString(),
                    itemCurrentAvailability: itemAvailable
                };
    
                // Save the updated inventory item
                await Inventary.findByIdAndUpdate(inventoryItem._id, updatedItem, { new: true });
            }
        }
    }
    

    // Creating a new instance of the Tent model
    const newTentEntry = new Tent({
      customerId,
      orderedItems,
      orderedItemsCount,
      area,
    });

    // Saving the new tent entry to the database
    await newTentEntry.save();

    // Sending a success response
    res.status(201).json({
      message: "Tent entry created successfully",
      tentEntry: newTentEntry,
    });
  } catch (error) {
    // Handling any errors that occur during the process
    console.error("Error creating tent entry:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function to update a tent entry in the database
export const updateTentEntry = async (req, res) => {
  try {
    // Extracting the tent ID from the request parameters
    const tentId = req.params.id;

    // Checking if the provided tent ID is valid
    if (!tentId) {
      return res.status(400).json({ message: "Invalid tent ID" });
    }

    // Finding the tent entry by ID in the database
    const existingTentEntry = await Tent.findById(tentId);

    // Checking if the tent entry exists
    if (!existingTentEntry) {
      return res.status(404).json({ message: "Tent entry not found" });
    }

    // Updating the tent entry with the provided data from the request body
    const { customerId, orderedItems, orderedItemsCount } = req.body;
    existingTentEntry.customerId = customerId || existingTentEntry.customerId;
    existingTentEntry.orderedItems =
      orderedItems || existingTentEntry.orderedItems;
    existingTentEntry.orderedItemsCount =
      orderedItemsCount || existingTentEntry.orderedItemsCount;

    // Saving the updated tent entry to the database
    await existingTentEntry.save();

    // Sending a success response
    res.status(200).json({
      message: "Tent entry updated successfully",
      tentEntry: existingTentEntry,
    });
  } catch (error) {
    // Handling any errors that occur during the process
    console.error("Error updating tent entry:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function to delete a tent entry from the database
export const deleteTentEntry = async (req, res) => {
  try {
    // Extracting the tent ID from the request parameters
    const tentId = req.params.id;

    // Checking if the provided tent ID is valid
    if (!tentId) {
      return res.status(400).json({ message: "Invalid tent ID" });
    }

    // Finding the tent entry by ID in the database
    const existingTentEntry = await Tent.findById(tentId);

    // Checking if the tent entry exists
    if (!existingTentEntry) {
      return res.status(404).json({ message: "Tent entry not found" });
    }

    // Deleting the tent entry from the database
    await existingTentEntry.remove();

    // Sending a success response
    res.status(200).json({ message: "Tent entry deleted successfully" });
  } catch (error) {
    // Handling any errors that occur during the process
    console.error("Error deleting tent entry:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//controller for get specific details of tent
export const getSpecificTentDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const orders = await Tent.findOne({ customerId: id });
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
