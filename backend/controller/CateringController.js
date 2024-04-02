import { Customer } from "../model/Customer.js";
import { Catering } from "../model/catering_model.js";

// Controller function to create a catering entry in the database
export const createCateringEntry = async (req, res) => {
  try {
    const { customerId, breakfast, lunch, dinner } = req.body;
    //now update the customer details
    const updateCustomerTentOrder = await Customer.findById(customerId);

    // assign true
    updateCustomerTentOrder.isCateringOrdered = true;

    //update the detail
    await updateCustomerTentOrder.save();

    const catering = await Catering.create({
      customerId,
      breakfast,
      lunch,
      dinner,
    });
    res.status(201).json({
      success: true,
      message: "Catring module updated",
      catering,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller function to get all catering entries
const getAllCatering = async (req, res) => {
  try {
    const caterings = await Catering.find();
    res.status(200).json(caterings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function to update a catering entry in the database
export const updateCateringEntry = async (req, res) => {
  const { id } = req.params;
  const { customerId, breakfast, lunch, dinner } = req.body;

  try {
    const catering = await Catering.findById(id);
    if (!catering) {
      return res.status(404).json({ message: "Catering not found" });
    }

    // Update the catering entry
    if (customerId) catering.customerId = customerId;
    if (breakfast) catering.breakfast = breakfast;
    if (lunch) catering.lunch = lunch;
    if (dinner) catering.dinner = dinner;

    await catering.save();
    res.status(200).json(catering);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function to delete a catering entry from the database
export const deleteCateringEntry = async (req, res) => {
  const { id } = req.params;

  try {
    const catering = await Catering.findById(id);
    if (!catering) {
      return res.status(404).json({ message: "Catering not found" });
    }

    // Delete the catering entry
    await catering.remove();
    res.status(200).json({ message: "Catering deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSpecificCateringOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const orders = await Catering.findOne({ customerId: id });

    res.status(200).json({
      success: true,
      orders
    })
  } catch (error) {}
};
