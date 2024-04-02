import express from "express"
import { createTentEntry, deleteTentEntry, updateTentEntry } from "../controller/TentController.js"

const router =  express.Router()


//route for new bistar order controller
router.post("/new", createTentEntry)

router.put("/update/:id", updateTentEntry)

router.get("/:id", deleteTentEntry)


export default router