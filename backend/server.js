import {app, server} from "./app.js"
import { connectDatabase } from "./config/dbConnection.js"


// default port 
const PORT = process.env.PORT || 5000

// Create Socket.IO server


//connect database
connectDatabase()
server.listen(PORT, ()=>{
    console.log(`Server is woriking on port ${PORT}`)
})