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
    companyId,
    itemName,
    itemCategoryType,
    itemSize,
    totalItemQuantity,
    isConsumable,
  } = req.body;

  try {
    const inventoryItem = await Inventary.create({
      companyId,
      itemId: await generateOrderId(),
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
    const inventaryItems = await Inventary.find().sort({ createdAt: -1 });
    res.status(200).json(inventaryItems);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateInvetoryItemCount = async (req, res) => {
  // this id comes from order
  const { id } = req.params;
  const { companyId, itemId } = req.body;
  try {
    // Find customer order using id
    const customerOrder = await CustomerOrder.findById(id);
    // console.log(customerOrder)

    // Get inventory
    const inventoryItems = await Inventary.find({ companyId: companyId });

    // console.log(inventoryItems)
    // Update orderStatus on order collection

    // Then check the customer order category
    if (customerOrder.isBistarOrdered) {
      const bistarItemlength = customerOrder.bistarOrder.length;
      for (let i = 0; i < bistarItemlength; i++) {
        // Get the current Bistar order item
        const bistarOrderItem = customerOrder.bistarOrder[i];

        // Find the corresponding inventory item by matching the item name
        const inventoryItem = inventoryItems.find(
          (item) => item.itemName === bistarOrderItem.itemNameBistar
        );

        if (inventoryItem) {
          // Ensure the item count for the order is a valid number before performing operations
          const itemCountForOrderBistar = parseInt(
            bistarOrderItem.itemCountForOrderBistar
          );
          if (!isNaN(itemCountForOrderBistar)) {
            // Update the itemOutForWork field by adding the item count for the order
            inventoryItem.itemOutForWork =
              (inventoryItem.itemOutForWork || 0) + itemCountForOrderBistar;

            // // Initialize itemRequired if it is undefined, then add the item count required for this order
            // inventoryItem.itemRequired = inventoryItem.itemRequired === 0 ?  ((inventoryItem.itemCurrentAvailability || 0) -
            // itemCountForOrderBistar)  : inventoryItem.itemRequired + inventoryItem.itemCurrentAvailability

            // Update the itemCurrentAvailability field by subtracting the item count for the order
            inventoryItem.itemCurrentAvailability = Math.max(
              (inventoryItem.itemCurrentAvailability || 0) -
                itemCountForOrderBistar,
              0
            );

            // Save the updated inventory item to the database
            await inventoryItem.save();
          }
        }
      }
    }

    // Check if the customer has ordered a tent
    if (customerOrder.isTentOrdered) {
      // Get the length of the item list in the tent order
      const inventoryItemLength = customerOrder.tentOrder.itemList.length;

      // Loop through each item in the tent order item list
      for (let i = 0; i < inventoryItemLength; i++) {
        // Get the current tent order item
        const tentOrderItem = customerOrder.tentOrder.itemList[i];

        // Find the corresponding inventory item by matching the item name
        const inventoryItem = inventoryItems.find(
          (item) => item.itemName === tentOrderItem.itemNameTent
        );

        if (inventoryItem) {
          // Ensure the item count for the order is a valid number before performing operations
          const itemCountForOrderTent = parseInt(
            tentOrderItem.itemCountForOrderTent
          );
          if (!isNaN(itemCountForOrderTent)) {
            // Update the itemOutForWork field by adding the item count for the order
            inventoryItem.itemOutForWork =
              (inventoryItem.itemOutForWork || 0) + itemCountForOrderTent;

            // Initialize itemRequired if it is undefined, then add the item count required for this order
            // inventoryItem.itemRequired =
            //   (inventoryItem.itemRequired || 0) + itemCountForOrderTent;

            // Update the itemCurrentAvailability field by subtracting the item count for the order
            inventoryItem.itemCurrentAvailability = Math.max(
              (inventoryItem.itemCurrentAvailability || 0) -
                itemCountForOrderTent,
              0
            );

            // Save the updated inventory item to the database
            await inventoryItem.save();
          }
        }
      }
    }

    if (customerOrder.isLightOrdered) {
      for (let i = 0; i < customerOrder.lightOrder.length; i++) {
        // Get the current light order item
        const lightOrderItem = customerOrder.lightOrder[i];

        // Find the corresponding inventory item by matching the item name
        const inventoryItem = inventoryItems.find(
          (item) => item.itemName === lightOrderItem.itemNameLight
        );

        if (inventoryItem) {
          // Ensure the item count for the order is a valid number before performing operations
          const itemCountForOrderLight = parseInt(
            lightOrderItem.itemCountForOrderLight
          );
          if (!isNaN(itemCountForOrderLight)) {
            // Update the itemOutForWork field by adding the item count for the order
            inventoryItem.itemOutForWork =
              (inventoryItem.itemOutForWork || 0) + itemCountForOrderLight;

            // Initialize itemRequired if it is undefined or null, then add the item count required for this order
            inventoryItem.itemRequired =
              (inventoryItem.itemRequired || 0) + itemCountForOrderLight;

            // Update the itemCurrentAvailability field by subtracting the item count for the order
            inventoryItem.itemCurrentAvailability = Math.max(
              (inventoryItem.itemCurrentAvailability || 0) -
                itemCountForOrderLight,
              0
            );

            // Save the updated inventory item to the database
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

// when order is completed then
export const updateInvetoryItemCountRetrun = async (req, res) => {
  // this id comes from order
  const { id } = req.params;
  const { companyId, itemId } = req.body;
  try {
    // Find customer order using id
    const customerOrder = await CustomerOrder.findById(id);
    // console.log(customerOrder)

    // Get inventory
    const inventoryItems = await Inventary.find({ companyId: companyId });

    // console.log(inventoryItems)
    // Update orderStatus on order collection

    // Then check the customer order category
    if (customerOrder.isBistarOrdered) {
      const bistarItemlength = customerOrder.bistarOrder.length;
      for (let i = 0; i < bistarItemlength; i++) {
        // Get the current Bistar order item
        const bistarOrderItem = customerOrder.bistarOrder[i];

        // Find the corresponding inventory item by matching the item name
        const inventoryItem = inventoryItems.find(
          (item) => item.itemName === bistarOrderItem.itemNameBistar
        );

        if (inventoryItem) {
          // Ensure the item count for the order is a valid number before performing operations
          const itemCountForOrderBistar = parseInt(
            bistarOrderItem.itemCountForOrderBistar
          );
          if (!isNaN(itemCountForOrderBistar)) {
            // Update the itemOutForWork field by adding the item count for the order
            inventoryItem.itemOutForWork = 0;

            // // Initialize itemRequired if it is undefined, then add the item count required for this order
            // inventoryItem.itemRequired = inventoryItem.itemRequired === 0 ?  ((inventoryItem.itemCurrentAvailability || 0) -
            // itemCountForOrderBistar)  : inventoryItem.itemRequired + inventoryItem.itemCurrentAvailability

            // Update the itemCurrentAvailability field by subtracting the item count for the order
            inventoryItem.itemCurrentAvailability = inventoryItem.totalItemQuantity;

            // Save the updated inventory item to the database
            await inventoryItem.save();
          }
        }
      }
    }

    // Check if the customer has ordered a tent
    if (customerOrder.isTentOrdered) {
      // Get the length of the item list in the tent order
      const inventoryItemLength = customerOrder.tentOrder.itemList.length;

      // Loop through each item in the tent order item list
      for (let i = 0; i < inventoryItemLength; i++) {
        // Get the current tent order item
        const tentOrderItem = customerOrder.tentOrder.itemList[i];

        // Find the corresponding inventory item by matching the item name
        const inventoryItem = inventoryItems.find(
          (item) => item.itemName === tentOrderItem.itemNameTent
        );

        if (inventoryItem) {
          // Ensure the item count for the order is a valid number before performing operations
          const itemCountForOrderTent = parseInt(
            tentOrderItem.itemCountForOrderTent
          );
          if (!isNaN(itemCountForOrderTent)) {
            // Update the itemOutForWork field by adding the item count for the order
            inventoryItem.itemOutForWork = 0;
            // Initialize itemRequired if it is undefined, then add the item count required for this order
            // inventoryItem.itemRequired =
            //   (inventoryItem.itemRequired || 0) + itemCountForOrderTent;

            // Update the itemCurrentAvailability field by subtracting the item count for the order
            inventoryItem.itemCurrentAvailability = inventoryItem.totalItemQuantity;

            // Save the updated inventory item to the database
            await inventoryItem.save();
          }
        }
      }
    }

    if (customerOrder.isLightOrdered) {
      for (let i = 0; i < customerOrder.lightOrder.length; i++) {
        // Get the current light order item
        const lightOrderItem = customerOrder.lightOrder[i];

        // Find the corresponding inventory item by matching the item name
        const inventoryItem = inventoryItems.find(
          (item) => item.itemName === lightOrderItem.itemNameLight
        );

        if (inventoryItem) {
          // Ensure the item count for the order is a valid number before performing operations
          const itemCountForOrderLight = parseInt(
            lightOrderItem.itemCountForOrderLight
          );
          if (!isNaN(itemCountForOrderLight)) {
            // Update the itemOutForWork field by adding the item count for the order
            inventoryItem.itemOutForWork = 0;

            // Initialize itemRequired if it is undefined or null, then add the item count required for this order
            // inventoryItem.itemRequired =
            //   (inventoryItem.itemRequired || 0) + itemCountForOrderLight;

            // Update the itemCurrentAvailability field by subtracting the item count for the order
            inventoryItem.itemCurrentAvailability = inventoryItem.totalItemQuantity;

            // Save the updated inventory item to the database
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
