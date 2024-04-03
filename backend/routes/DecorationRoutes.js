import express from "express"
import { createDecorationOrder, deleteDecoration, getSpecifivDecorationDetails, updateDecoration } from "../controller/DecorationController.js"

const router =  express.Router()


//route for new bistar order controller
router.post("/new", createDecorationOrder)

router.put("/update/:id", updateDecoration)

router.get("/:id", deleteDecoration)

router.get("/specific/:id", getSpecifivDecorationDetails)

export default router