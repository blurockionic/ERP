import { Light } from "../model/light_order_model.js";

// Controller function to create a light entry in the database
export const createLightEntry = async (req, res) => {
    try {
      // Extracting relevant fields from the request body
      const { customerId, lightOrderedItem, lightOrderedCount } = req.body;
  
      // Creating a new instance of the Light model
      const newLightEntry = new Light({
        customerId,
        lightOrderedItem,
        lightOrderedCount
      });
  
      // Saving the new light entry to the database
      await newLightEntry.save();
  
      // Sending a success response
      res.status(201).json({ message: 'Light entry created successfully', lightEntry: newLightEntry });
    } catch (error) {
      // Handling any errors that occur during the process
      console.error('Error creating light entry:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

// Controller function to update a light entry in the database
export const updateLightEntry = async (req, res) => {
    try {
      // Extracting the light ID from the request parameters
      const lightId = req.params.id;
  
      // Checking if the provided light ID is valid
      if (!lightId) {
        return res.status(400).json({ message: 'Invalid light ID' });
      }
  
      // Finding the light entry by ID in the database
      const existingLightEntry = await Light.findById(lightId);
  
      // Checking if the light entry exists
      if (!existingLightEntry) {
        return res.status(404).json({ message: 'Light entry not found' });
      }
  
      // Updating the light entry with the provided data from the request body
      const { customerId, lightOrderedItem, lightOrderedCount } = req.body;
      existingLightEntry.customerId = customerId || existingLightEntry.customerId;
      existingLightEntry.lightOrderedItem = lightOrderedItem || existingLightEntry.lightOrderedItem;
      existingLightEntry.lightOrderedCount = lightOrderedCount || existingLightEntry.lightOrderedCount;
  
      // Saving the updated light entry to the database
      await existingLightEntry.save();
  
      // Sending a success response
      res.status(200).json({ message: 'Light entry updated successfully', lightEntry: existingLightEntry });
    } catch (error) {
      // Handling any errors that occur during the process
      console.error('Error updating light entry:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  // Controller function to delete a light entry from the database
export const deleteLightEntry = async (req, res) => {
    try {
      // Extracting the light ID from the request parameters
      const lightId = req.params.id;
  
      // Checking if the provided light ID is valid
      if (!lightId) {
        return res.status(400).json({ message: 'Invalid light ID' });
      }
  
      // Finding the light entry by ID in the database
      const existingLightEntry = await Light.findById(lightId);
  
      // Checking if the light entry exists
      if (!existingLightEntry) {
        return res.status(404).json({ message: 'Light entry not found' });
      }
  
      // Deleting the light entry from the database
      await existingLightEntry.remove();
  
      // Sending a success response
      res.status(200).json({ message: 'Light entry deleted successfully' });
    } catch (error) {
      // Handling any errors that occur during the process
      console.error('Error deleting light entry:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };