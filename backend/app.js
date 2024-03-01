import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"

//import all the routes
import authRoutes from "./routes/AuthRoutes.js"
// import leadRoutes from "./routes/LeadRoutes.js"
// import grantRoute from "./routes/GrantRoutes.js"

//export express
export const app = express()

//configure dot env file
dotenv.config({
    path: "./config/.env"
})

// middleware 
app.use(express.json())
app.use(cookieParser())


//default 
app.get("/",(res)=>{
    res.send("Nice working.")
})

//auth routes
app.use("/api/v1/auth", authRoutes)

// //lead routes
// app.use("/api/v1/lead", leadRoutes)

// app.use("/api/v1/grant", grantRoute)