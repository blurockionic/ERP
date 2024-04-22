import express from "express"
import { createInventary, deleteInventary, getAllInventary, updateInventary } from "../controller/InventaryController.js"

const router =  express.Router()

// ROUTE FOR INVENTARY CREATE 
router.post("/new", createInventary)

// ROUTE FOR GET ALL INVENTARY
router.get("/all", getAllInventary)

//ROUTE FOR UPDATE SPECIFIC INVENTARY
router.put("/update/:id", updateInventary)

//ROUTE FOR DELETE SPECIFIC INVENTARY
router.delete("/delete/:id", deleteInventary)


export default router