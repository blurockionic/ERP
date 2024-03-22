import { Catering } from "../model/catering_model";

// Controller function to create a catering entry in the database
export const createCateringEntry = async (req, res) => {
  try {
    // Extracting relevant fields from the request body
    const {
      customerId,
      orderedBreakFastItems,
      orderedLaunchItems,
      orderedDinnerItems,
    } = req.body;

    // Creating a new instance of the Catering model
    const newCateringEntry = new Catering({
      customerId,
      orderedBreakFastItems,
      orderedLaunchItems,
      orderedDinnerItems,
    });

    // Saving the new catering entry to the database
    await newCateringEntry.save();

    // Sending a success response
    res
      .status(201)
      .json({
        message: "Catering entry created successfully",
        cateringEntry: newCateringEntry,
      });
  } catch (error) {
    // Handling any errors that occur during the process
    console.error("Error creating catering entry:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function to update a catering entry in the database
export const updateCateringEntry = async (req, res) => {
  try {
    // Extracting the catering ID from the request parameters
    const cateringId = req.params.id;

    // Checking if the provided catering ID is valid
    if (!cateringId) {
      return res.status(400).json({ message: "Invalid catering ID" });
    }

    // Finding the catering entry by ID in the database
    let existingCateringEntry = await Catering.findById(cateringId);

    // Checking if the catering entry exists
    if (!existingCateringEntry) {
      return res.status(404).json({ message: "Catering entry not found" });
    }

    // Updating the catering entry with the provided data from the request body
    const {
      customerId,
      orderedBreakFastItems,
      orderedLaunchItems,
      orderedDinnerItems,
    } = req.body;
    existingCateringEntry.customerId =
      customerId || existingCateringEntry.customerId;
    existingCateringEntry.orderedBreakFastItems =
      orderedBreakFastItems || existingCateringEntry.orderedBreakFastItems;
    existingCateringEntry.orderedLaunchItems =
      orderedLaunchItems || existingCateringEntry.orderedLaunchItems;
    existingCateringEntry.orderedDinnerItems =
      orderedDinnerItems || existingCateringEntry.orderedDinnerItems;

    // Saving the updated catering entry to the database
    await existingCateringEntry.save();

    // Sending a success response
    res
      .status(200)
      .json({
        message: "Catering entry updated successfully",
        cateringEntry: existingCateringEntry,
      });
  } catch (error) {
    // Handling any errors that occur during the process
    console.error("Error updating catering entry:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function to delete a catering entry from the database
export const deleteCateringEntry = async (req, res) => {
    try {
      // Extracting the catering ID from the request parameters
      const cateringId = req.params.id;
  
      // Checking if the provided catering ID is valid
      if (!cateringId) {
        return res.status(400).json({ message: 'Invalid catering ID' });
      }
  
      // Finding the catering entry by ID in the database
      const existingCateringEntry = await Catering.findById(cateringId);
  
      // Checking if the catering entry exists
      if (!existingCateringEntry) {
        return res.status(404).json({ message: 'Catering entry not found' });
      }
  
      // Deleting the catering entry from the database
      await existingCateringEntry.remove();
  
      // Sending a success response
      res.status(200).json({ message: 'Catering entry deleted successfully' });
    } catch (error) {
      // Handling any errors that occur during the process
      console.error('Error deleting catering entry:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
