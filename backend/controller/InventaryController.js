import { CustomerOrder } from "../model/customerOrder.js";
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


// update inventory Item when order active 

export const updateInvetoryItemCount = async(req, res) =>{
  // this id come form order 
  const {id} =  req.params
  try {
    //find customer user using id
    const customerOrder =  await CustomerOrder.findById(id)

    console.log(customerOrder)

    //  get inventory 
    const inventoryItem =  await Inventary.find({})

    // update orderStatus on order collection

    //then check the customer order category
    if(customerOrder.isBistarOrdered){
      
    }

    if(customerOrder.isTentOrdered){
       console.log(customerOrder.tentOrder)
       for(let i =0; i < customerOrder.tentOrder.length; i++){
          if(inventoryItem.itemName === customerOrder.tentOrder[i].itemNameTent){
             inventoryItem.itemOutForWork = inventoryItem.itemOutForWork  + parseInt(customerOrder.tentOrder[i].itemCountForOrderTent)
            //  inventoryItem.totalItemQuantity = inventoryItem. 
             await inventoryItem.save()
          }
       }
    }

    if(customerOrder.isLightOrdered){

    }

    // then update each item count from inventory 
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error
    })
  }
}
