import  express  from "express";
import { CalendarEventController } from "../controller/CalendarEventController.js";
import { isAuthenticated } from "../middleware/auth.js";
 

const router = express.Router();
// set the event on calendar
router.post("/newevent", CalendarEventController)


 export  default router;