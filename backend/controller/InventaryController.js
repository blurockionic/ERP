import { Inventary } from "../model/inventary_model.js";

// Controller for creating inventory items
export const createInventary = async (req, res) => {
  const {
    itemName,
    itemCategoryType,
    itemSize,
    totalItemQuantity,
    isConsumable
  } = req.body;

  try {

    const inventoryItem = await Inventary.create({
      itemName,
      itemCategoryType,
      itemSize,
      totalItemQuantity,
      isConsumable :  isConsumable ? true : false,
    });

    

    // Find the latest created inventory item
    const latestInventoryItem = await Inventary.findOne({})
      .sort({ _id: -1 })
      .limit(1);

    if (latestInventoryItem) {
      // Update the stock availability of the latest inventory item
      latestInventoryItem.isStockAvailable = true;
      await latestInventoryItem.save();
    }

    res.status(201).json({
      success: true,
      message: "Item added successfully.",
      inventoryItem,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller for updating inventory items
export const updateInventary = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedInventaryItem = await Inventary.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    res
      .status(200)
      .json({
        success: true,
        message: "Item details Updated Successfully",
        updatedInventaryItem,
      });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller for deleting inventory items
export const deleteInventary = async (req, res) => {
  try {
    const { id } = req.params;
    await Inventary.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Inventory item deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Controller for getting all inventory items
export const getAllInventary = async (req, res) => {
  try {
    const inventaryItems = await Inventary.find();
    res.status(200).json(inventaryItems);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
