import express from "express";
import { deleteLead, getLead, newLead, updateLead } from "../controller/LeadController.js";

const router = express.Router()

// routes for create new lead 
router.post("/new", newLead)

//get all leads 
router.get("/all", getLead)

//update the lead 
router.put("/:id", updateLead)

//delete the lead 
router.delete("/:id", deleteLead)


export default router