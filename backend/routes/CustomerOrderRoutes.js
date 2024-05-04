import express  from "express" 
import { createOrder, deleteOrder, getAllOrders, updateOrder } from "../controller/CustomerOrderController.js"

const router =  express.Router()

//create new order
router.post("/new", createOrder)

//get all order
router.get("/all", getAllOrders)

//update details
router.put("/update/:id", updateOrder)

//delete order
router.delete("/delete/:id", deleteOrder)


export default router