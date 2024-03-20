import express from "express"
import { whatsappBot } from "../controller/ExecutePythonMsgBot.js"

const router =  express.Router()

//excute the python script
router.post("/send", whatsappBot)

export default router 