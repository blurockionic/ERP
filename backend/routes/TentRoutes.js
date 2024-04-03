import express from "express"
import { createTentEntry, deleteTentEntry, getSpecificTentDetails, updateTentEntry } from "../controller/TentController.js"

const router =  express.Router()


//route for new bistar order controller
router.post("/new", createTentEntry)

router.put("/update/:id", updateTentEntry)

router.get("/:id", deleteTentEntry)

router.get("/specific/:id", getSpecificTentDetails)


export default router