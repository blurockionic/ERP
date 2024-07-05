import express from "express"
import { isAuthenticated } from "../middleware/auth.js";
import {loginUser, registerUser} from "../controller/AuthController.js"

const router = express.Router()

//routes for create new user
router.post("/signup", registerUser);

//routes for login user
router.post("/login", loginUser);

// my progile
// router.get("/me", getMyProfile);

//routes for logout
// router.get("/logout", logout)

// router.get("/verify-email", verifyEmail)

export default router
