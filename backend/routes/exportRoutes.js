import express from "express";
import { exportToExcel } from "../controller/ExportController.js";

const router = express.Router()

//convert data into excel data
router.get("/exportToExcel", exportToExcel)


export default router