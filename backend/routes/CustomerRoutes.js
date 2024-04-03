import express from "express"
import { NewCustomer, deleteCustomer, getAllCustomer, getSpecificCustmerDetails, updateCustomer } from "../controller/CutomersController.js"


const router =  express.Router()


//route for new bistar order controller
router.post("/new", NewCustomer)

router.put("/update/:id", updateCustomer)

router.get("/all", getAllCustomer)

router.get("/:id", deleteCustomer)

router.get("/specific/:id", getSpecificCustmerDetails)

export default router