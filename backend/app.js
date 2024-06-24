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
import whatsappRoute from "./routes/whatsappRoute.js"
import inventaryRoute from "./routes/InventaryRoutes.js"
import customerOrderRoute from "./routes/CustomerOrderRoutes.js"
import recipeRoute from "./routes/RecipeRoute.js"
import payment  from "./routes/paymentRoute.js"

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


// whatsapp bot 
app.use("/api/v1/whatsapp-bot", whatsappRoute)


app.use("/api/v1/inventory", inventaryRoute)

app.use("/api/v1/order", customerOrderRoute)

app.use("/api/v1/recipe", recipeRoute)

app.use("/api/v1/payment", payment)


// //lead routes
// app.use("/api/v1/lead", leadRoutes)
// app.use("/api/v1/grant", grantRoute)
