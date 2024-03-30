import { Tent } from "../model/tent_model.js";

// Controller function to create a tent entry in the database
export const createTentEntry = async (req, res) => {
    try {
      // Extracting relevant fields from the request body
      const { customerId, orderedItems, orderedItemsCount, area } = req.body;
  
      // Creating a new instance of the Tent model
      const newTentEntry = new Tent({
        customerId,
        orderedItems,
        orderedItemsCount,
        area
      });
  
      // Saving the new tent entry to the database
      await newTentEntry.save();
  
      // Sending a success response
      res.status(201).json({ message: 'Tent entry created successfully', tentEntry: newTentEntry });
    } catch (error) {
      // Handling any errors that occur during the process
      console.error('Error creating tent entry:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  // Controller function to update a tent entry in the database
export const updateTentEntry = async (req, res) => {
    try {
      // Extracting the tent ID from the request parameters
      const tentId = req.params.id;
  
      // Checking if the provided tent ID is valid
      if (!tentId) {
        return res.status(400).json({ message: 'Invalid tent ID' });
      }
  
      // Finding the tent entry by ID in the database
      const existingTentEntry = await Tent.findById(tentId);
  
      // Checking if the tent entry exists
      if (!existingTentEntry) {
        return res.status(404).json({ message: 'Tent entry not found' });
      }
  
      // Updating the tent entry with the provided data from the request body
      const { customerId, orderedItems, orderedItemsCount } = req.body;
      existingTentEntry.customerId = customerId || existingTentEntry.customerId;
      existingTentEntry.orderedItems = orderedItems || existingTentEntry.orderedItems;
      existingTentEntry.orderedItemsCount = orderedItemsCount || existingTentEntry.orderedItemsCount;
  
      // Saving the updated tent entry to the database
      await existingTentEntry.save();
  
      // Sending a success response
      res.status(200).json({ message: 'Tent entry updated successfully', tentEntry: existingTentEntry });
    } catch (error) {
      // Handling any errors that occur during the process
      console.error('Error updating tent entry:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
 // Controller function to delete a tent entry from the database
export const deleteTentEntry = async (req, res) => {
  try {
    // Extracting the tent ID from the request parameters
    const tentId = req.params.id;

    // Checking if the provided tent ID is valid
    if (!tentId) {
      return res.status(400).json({ message: 'Invalid tent ID' });
    }

    // Finding the tent entry by ID in the database
    const existingTentEntry = await Tent.findById(tentId);

    // Checking if the tent entry exists
    if (!existingTentEntry) {
      return res.status(404).json({ message: 'Tent entry not found' });
    }

    // Deleting the tent entry from the database
    await existingTentEntry.remove();

    // Sending a success response
    res.status(200).json({ message: 'Tent entry deleted successfully' });
  } catch (error) {
    // Handling any errors that occur during the process
    console.error('Error deleting tent entry:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

