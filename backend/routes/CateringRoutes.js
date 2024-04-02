import express from "express"
import { createCateringEntry, deleteCateringEntry, getSpecificCateringOrder, updateCateringEntry } from "../controller/CateringController.js"


const router =  express.Router()


//route for new bistar order controller
router.post("/new", createCateringEntry)

router.put("/update/:id", updateCateringEntry)

router.delete("/:id", deleteCateringEntry)

//get specific order
router.get("/specific/:id", getSpecificCateringOrder)


export default router