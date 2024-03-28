import express from "express"
import { createLightEntry, deleteLightEntry, updateLightEntry } from "../controller/LightController.js"


const router =  express.Router()


//route for new bistar order controller
router.post("/new", createLightEntry)

router.put("/update/:id", updateLightEntry)

router.get("/:id", deleteLightEntry)


export default router