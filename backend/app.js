import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"

//export express
export const app = express()

//configure dot env file
dotenv.config({
    path: "./config/.env"
})

// middleware 
app.use(express.json())
app.use(cookieParser())

app.get("/",(res)=>{
    res.send("Nice working.")
})