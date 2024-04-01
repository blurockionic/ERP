import { Customer } from "../model/Customer.js";
import { Decoration } from "../model/decoration_model.js";

//controller for create the decoration order
export const createDecorationOrder = async (req, res) => {
  try {
    // Extracting relevant fields from the request body
    const { customerId, decorationOrderedItem, decorationOrderedCount } =
      req.body;

      //now update the customer details
      const updateCustomerTentOrder =  await Customer.findById(customerId)

      // assign true 
      updateCustomerTentOrder.isDecorationOrdered =  true

      //update the detail
      await updateCustomerTentOrder.save()

    // Creating a new instance of the Decoration model
    const newDecoration = new Decoration({
      customerId,
      decorationOrderedItem,
      decorationOrderedCount,
    });

    // Saving the new decoration entry to the database
    await newDecoration.save();

    // Sending a success response
    res
      .status(201)
      .json({
        success: true,
        message: "Decoration entry created successfully",
        decoration: newDecoration,
      });
  } catch (error) {
    // Handling any errors that occur during the process
    console.error("Error creating decoration entry:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const updateDecoration = async (req, res) => {
    try {
      // Extracting the decoration ID from the request parameters
      const decorationId = req.params.id;
  
      // Checking if the provided decoration ID is valid
      if (!decorationId) {
        return res.status(400).json({ message: 'Invalid decoration ID' });
      }
  
      // Finding the decoration entry by ID in the database
      const existingDecoration = await Decoration.findById(decorationId);
  
      // Checking if the decoration entry exists
      if (!existingDecoration) {
        return res.status(404).json({ message: 'Decoration entry not found' });
      }
  
      // Updating the decoration entry with the provided data from the request body
      const { customerId, decorationOrderedItem, decorationOrderedCount } = req.body;
      existingDecoration.customerId = customerId || existingDecoration.customerId;
      existingDecoration.decorationOrderedItem = decorationOrderedItem || existingDecoration.decorationOrderedItem;
      existingDecoration.decorationOrderedCount = decorationOrderedCount || existingDecoration.decorationOrderedCount;
  
      // Saving the updated decoration entry to the database
      await existingDecoration.save();
  
      // Sending a success response
      res.status(200).json({ message: 'Decoration entry updated successfully', decoration: existingDecoration });
    } catch (error) {
      // Handling any errors that occur during the process
      console.error('Error updating decoration entry:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

// Controller function to delete a decoration entry from the database
export const deleteDecoration = async (req, res) => {
    try {
      // Extracting the decoration ID from the request parameters
      const decorationId = req.params.id;
  
      // Checking if the provided decoration ID is valid
      if (!decorationId) {
        return res.status(400).json({ message: 'Invalid decoration ID' });
      }
  
      // Finding the decoration entry by ID in the database
      const existingDecoration = await Decoration.findById(decorationId);
  
      // Checking if the decoration entry exists
      if (!existingDecoration) {
        return res.status(404).json({ message: 'Decoration entry not found' });
      }
  
      // Deleting the decoration entry from the database
      await existingDecoration.remove();
  
      // Sending a success response
      res.status(200).json({ message: 'Decoration entry deleted successfully' });
    } catch (error) {
      // Handling any errors that occur during the process
      console.error('Error deleting decoration entry:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
};
  
 
