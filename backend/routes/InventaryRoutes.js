import express from "express"
import { createInventary, deleteInventary, getAllInventary, updateInventary, updateInvetoryItemCount, updateInvetoryItemCountRetrun } from "../controller/InventaryController.js"

const router =  express.Router()

// ROUTE FOR INVENTARY CREATE 
router.post("/new", createInventary)

// ROUTE FOR GET ALL INVENTARY
router.get("/all", getAllInventary)

//ROUTE FOR UPDATE SPECIFIC INVENTARY
router.put("/update/:id", updateInventary)

//ROUTE FOR DELETE SPECIFIC INVENTARY
router.delete("/delete/:id", deleteInventary)

router.put("/update/item/count/:id", updateInvetoryItemCount)
// itrm return  
router.put("/update/item/count/return/:id", updateInvetoryItemCountRetrun)


export default router