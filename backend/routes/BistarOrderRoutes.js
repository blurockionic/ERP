import express from "express"
import { createNewBisterOrder, getAllOrders, updateOrder } from "../controller/BisterManagement.js"

const router =  express.Router()


//route for new bistar order controller
router.post("/new", createNewBisterOrder)

router.put("/update/:id", updateOrder)

router.get("/all", getAllOrders)


export default router