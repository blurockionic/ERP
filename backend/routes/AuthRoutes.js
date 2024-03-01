import express from "express"
import { getMyProfile, login, logout, registration, verifyEmail } from "../controller/AuthController.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router()

//routes for create new user
router.post("/signup", registration);

//routes for login user
router.post("/login", login);

// my progile
router.get("/me",isAuthenticated, getMyProfile);

//routes for logout
router.get("/logout", logout)

router.get("/verify-email", verifyEmail)

export default router
