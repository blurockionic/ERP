import express from "express"
import { createNewBedingOrder, getSpecificOrders, updateOrder } from "../controller/BedingManagement.js"

const router =  express.Router()


//route for new beding order controller
router.post("/new", createNewBedingOrder)

router.put("/update/:id", updateOrder)

router.get("/specific/:id", getSpecificOrders)


export default router