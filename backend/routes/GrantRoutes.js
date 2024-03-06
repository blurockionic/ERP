import express from "express"
import { deleteGrant, hasGrant, newGrant, updateGrant } from "../controller/GrantAcessController.js"

const router =  express.Router()


//route for new grant 
router.post("/new", newGrant)

//route for hasGrant 
router.get("/hasgrant", hasGrant)

//route for update grant
router.put("/:id", updateGrant)


//delete grant 
router.delete("/:id", deleteGrant)


export default router 