import express from "express"
import { capturePayment, initiatePayment, webHook } from "../controller/PaymentController.js"

const router =  express.Router()

//post initiat payment
router.post("/createOrder", initiatePayment)

//capture payment 
router.post("/capturePayment", capturePayment)

//fail or success
router.post("/webhook", webHook)

export default router