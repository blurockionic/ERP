import { CustomerOrder } from "../model/customerOrder.js";
import { Inventary } from "../model/inventary_model.js";

// Controller for creating inventory items
export const createInventary = async (req, res) => {
  //GENRATE ORDER ID
  let orderCounter = 0; // Initialize the order counter

  async function generateOrderId() {
    // Fetching the count of existing orders asynchronously
    const order_count = await Inventary.countDocuments({});

    // Incrementing the count for the new order
    const orderCounter = order_count + 1;

    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}${(
      currentDate.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}${currentDate.getDate().toString().padStart(2, "0")}`;

    // Padding the order number to ensure it's always three digits
    const paddedOrderNumber = orderCounter.toString().padStart(4, "0");

    return `ITEM-${formattedDate}-${paddedOrderNumber}`;
  }

  const {
    itemName,
    itemCategoryType,
    itemSize,
    totalItemQuantity,
    isConsumable,
  } = req.body;

  try {
    const inventoryItem = await Inventary.create({
      itemId:await generateOrderId(),
      itemName,
      itemCategoryType,
      itemSize,
      totalItemQuantity,
      itemCurrentAvailability: totalItemQuantity,
      isConsumable: isConsumable ? true : false,
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
    res.status(200).json({
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

// update inventory Item when order active

export const updateInvetoryItemCount = async (req, res) => {
  // this id comes from order
  const { id } = req.params;
  try {
    // Find customer order using id
    const customerOrder = await CustomerOrder.findById(id);

    // Get inventory
    const inventoryItems = await Inventary.find({});

    // Update orderStatus on order collection

    // Then check the customer order category
    if (customerOrder.isBistarOrdered) {
      for (let i = 0; i < customerOrder.bistarOrder.length; i++) {
        const bistarOrderItem = customerOrder.bistarOrder[i];
        const inventoryItem = inventoryItems.find(
          (item) => item.itemName === bistarOrderItem.itemNameBistar
        );
        if (inventoryItem) {
          // Ensure the values are valid numbers before performing operations
          const itemCountForOrderBistar = parseInt(
            bistarOrderItem.itemCountForOrderBistar
          );
          if (!isNaN(itemCountForOrderBistar)) {
            inventoryItem.itemOutForWork =
              (inventoryItem.itemOutForWork || 0) + itemCountForOrderBistar;
            inventoryItem.itemCurrentAvailability =
              (inventoryItem.itemCurrentAvailability || 0) -
              itemCountForOrderBistar;
            await inventoryItem.save();
          }
        }
      }
    }

    if (customerOrder.isTentOrdered) {
      for (let i = 0; i < customerOrder.tentOrder.length; i++) {
        const tentOrderItem = customerOrder.tentOrder[i];
        const inventoryItem = inventoryItems.find(
          (item) => item.itemName === tentOrderItem.itemNameTent
        );
        if (inventoryItem) {
          // Ensure the values are valid numbers before performing operations
          const itemCountForOrderTent = parseInt(
            tentOrderItem.itemCountForOrderTent
          );
          if (!isNaN(itemCountForOrderTent)) {
            inventoryItem.itemOutForWork =
              (inventoryItem.itemOutForWork || 0) + itemCountForOrderTent;
            inventoryItem.itemCurrentAvailability =
              (inventoryItem.itemCurrentAvailability || 0) -
              itemCountForOrderTent;
            await inventoryItem.save();
          }
        }
      }
    }

    if (customerOrder.isLightOrdered) {
      for (let i = 0; i < customerOrder.lightOrder.length; i++) {
        const lightOrderItem = customerOrder.lightOrder[i];
        const inventoryItem = inventoryItems.find(
          (item) => item.itemName === lightOrderItem.itemNameLight
        );
        if (inventoryItem) {
          // Ensure the values are valid numbers before performing operations
          const itemCountForOrderLight = parseInt(
            lightOrderItem.itemCountForOrderLight
          );
          if (!isNaN(itemCountForOrderLight)) {
            // item out for work 
            inventoryItem.itemOutForWork =
              (inventoryItem.itemOutForWork || 0) + itemCountForOrderLight;
              // item current availibility  
            inventoryItem.itemCurrentAvailability =
              (inventoryItem.itemCurrentAvailability || 0) -
              itemCountForOrderLight;
            await inventoryItem.save();
          }
        }
      }
    }

    // Then update each item count from inventory
    res.status(200).json({
      success: true,
      message: "Inventory items updated successfully",
    });
  } catch (error) {
    console.error("Error updating inventory item count:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
