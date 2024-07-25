import express  from "express" 
import { addItems, createOrder, deleteOrder, getAllOrderOfACustomer, getAllOrders, getOrderById, updateOrder, updateOrderStatus } from "../controller/CustomerOrderController.js"

const router =  express.Router()

//create new order
router.post("/new", createOrder)

//get all order
router.get("/all", getAllOrders)

// get all customer
router.get("/allOrderOfACustomer", getAllOrderOfACustomer)

//update details
router.put("/update/:id", updateOrder)

//delete order
router.delete("/delete/:id", deleteOrder)

//get specific order
router.get("/specific/:id", getOrderById)

// update status 
router.put("/update/status/:id", updateOrderStatus)

//to add items in order details page
router.post("/add-item/:id", addItems)


export default router