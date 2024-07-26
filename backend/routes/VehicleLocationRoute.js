import express from "express"
import { vehicleLocation } from "../controller/VehicleLocationController.js"

const router =  express.Router()

//excute the python script
router.get("/location", vehicleLocation)

export default router 