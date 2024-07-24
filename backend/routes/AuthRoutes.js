import express from "express"
import {forgotPassword, getAllUsers, loginUser, logout, registerUser, removeUser, resetPassword, updateUser} from "../controller/AuthController.js"

const router = express.Router()

//routes for create new user
router.post("/signup", registerUser);

//routes for login user
router.post("/login", loginUser);

// get all user
router.get("/all", getAllUsers);

//routes for logout
router.get("/logout", logout)

router.put("/:id", updateUser);

router.delete("/:id", removeUser);

// router.get("/verify-email", verifyEmail)

//forgot password
router.post("/forgot-password", forgotPassword)
//reset password
router.post("/reset/:token", resetPassword)

export default router
