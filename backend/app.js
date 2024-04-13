import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"

// /import all the routes
import authRoutes from "./routes/AuthRoutes.js"
import leadRoutes from "./routes/LeadRoutes.js"
import grantRoute from "./routes/GrantRoutes.js"
import exportToExcelRoute from "./routes/exportRoutes.js"
import importRoute from "./routes/importRoute.js"
import calendarRoute from "./routes/CalendarEventRoutes.js"
import bistarRoute from "./routes/BistarOrderRoutes.js"
import tentRoute from "./routes/TentRoutes.js"
import cateringRoute from "./routes/CateringRoutes.js"
import lightRoutes from "./routes/LightRoutes.js"
import decorationRoutes from "./routes/DecorationRoutes.js"
import whatsappRoute from "./routes/whatsappRoute.js"
import customerRoute from "./routes/CustomerRoutes.js"

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
app.get("/", (req, res) => {
    res.send("Nice working.");
  });
  

// /cross origin resources sharing 
app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    secure: true
}))

//auth routes
app.use("/api/v1/auth", authRoutes)

//lead routes
app.use("/api/v1/lead", leadRoutes)

//grant routes
app.use("/api/v1/grant", grantRoute)

//export
app.use("/api/v1/export", exportToExcelRoute)

// import
app.use("/api/v1/import", importRoute)

// calender Route 
app.use("/api/v1/calendarevent",calendarRoute)

app.use("/api/v1/bistar", bistarRoute)

// whatsapp bot 
app.use("/api/v1/whatsapp-bot", whatsappRoute)

app.use("/api/v1/decoration", decorationRoutes)

app.use("/api/v1/light", lightRoutes)

app.use("/api/v1/tent", tentRoute)

app.use("/api/v1/catering", cateringRoute)
app.use("/api/v1/customer", customerRoute)



// //lead routes
// app.use("/api/v1/lead", leadRoutes)

// app.use("/api/v1/grant", grantRoute)
