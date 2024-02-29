import {app} from "./app.js"
import { connectDatabase } from "./config/dbConnection.js"


// default port 
const PORT = process.env.PORT || 5000

//connect database
connectDatabase()
app.listen(PORT, ()=>{
    console.log(`Server is woriking on port ${PORT}`)
})