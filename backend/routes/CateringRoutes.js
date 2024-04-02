import express from "express"
import { createCateringEntry, deleteCateringEntry, updateCateringEntry } from "../controller/CateringController.js"


const router =  express.Router()


//route for new bistar order controller
router.post("/new", createCateringEntry)

router.put("/update/:id", updateCateringEntry)

router.get("/:id", deleteCateringEntry)


export default router