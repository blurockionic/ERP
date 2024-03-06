import express from "express"
import multer from "multer";
import { importCsvOrExcel } from "../controller/ImportController.js";

const router =  express.Router()
//set up for file upload 
const storage = multer.memoryStorage();
const upload = multer({storage: storage})

router.post("/importData", upload.single('file'), importCsvOrExcel )


export default router