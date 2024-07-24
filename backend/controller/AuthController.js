import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import mongoose from "mongoose";
import User from "../model/auth_model.js";
import nodemailer from "nodemailer";

//google mail authentication
export const google = async (req, res, next) => {
  const { name, email, photo } = req.body;

  try {
    let user = await User.findOne({ email: email });

    if (user) {
      const token = jwt.sign(
        { email: user.email, id: user._id },
        "dfahdirieirhfdajf", // Consider using environment variables for secrets
        { expiresIn: "1h" }
      );

      res.status(200).json({
        success: true,
        message: "Logged in successfully!",
        user,
        token,
      });
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      const hashedPassword = await bcrypt.hash(generatedPassword, 12);

      user = await User.create({
        username: name.split(" ").join("").toLowerCase(),
        email,
        profilePicture: photo,
        password: hashedPassword,
      });

      const token = jwt.sign(
        { email: user.email, id: user._id },
        "dfahdirieirhfdajf", // Consider using environment variables for secrets
        { expiresIn: "1h" }
      );

      res.status(200).json({
        success: true,
        message: "Login successfully",
        user,
        token,
      });
    }
  } catch (error) {
    next(errorHandler(500, "Something went wrong"));
  }
};

// User Registration Controller
export const registerUser = async (req, res) => {
  const { fullName, companyId, email, role, status, softwareName } = req.body;

  try {
    // Validate input
    if (!fullName || typeof fullName !== "string") {
      return res.status(400).json({ message: "Invalid full name." });
    }
    if (!email || typeof email !== "string") {
      return res.status(400).json({ message: "Invalid email." });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists." });
    }

    // Create a verification token
    const verificationToken = crypto.randomBytes(20).toString("hex");

    // Generate a temporary password
    const modifiedPassword = fullName.slice(0, 4) + "3223";
    const hashPassword = await bcrypt.hash(modifiedPassword, 12);

    // Create a new user
    const newUser = new User({
      fullName,
      companyId,
      email,
      password: hashPassword,
      tempPassword: modifiedPassword,
      verificationToken,
      role,
      status,
      softwareName,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({
      success: true,
      newUser,
      message: "User registered successfully. Please verify your email.",
    });

    // Send verification email
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailOptions = {
      from: `Blurock Innovations | ERP Solutions <${process.env.MAIL_USER}>`,
      to: newUser.email,
      subject: "Verify Your Email",
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Link</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      background-color: #f4f4f4;
      color: #333;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      padding: 20px;
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    h1 {
      color: #007bff;
    }
    p {
      line-height: 1.6;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Welcome to our platform!</h1>
    <p>Hello ${newUser.fullName},</p>
    <p>Thank you for joining our platform. We are excited to have you on board!</p>
    <p>Login credentials:</p>
    <p>Email: ${newUser.email}<br>Password: ${newUser.tempPassword}</p>
    <p>Your account has been successfully created. Please click the link below to verify your email:</p>
    <a href="http://localhost:4000/api/v1/auth/verify-email?token=${newUser.verificationToken}">Verify Email</a>
    <p>If you did not create an account on our platform, please disregard this email.</p>
    <p>Best regards,<br> The Platform Team</p>
  </div>
</body>
</html>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Failed to send verification email:", error);
      } else {
        console.log("Verification email sent:", info.response);
      }
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};
// User Login Controller
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Check if the user's email is verified
    if (!user.isVerified) {
      return res.status(401).json({ message: "Email not verified." });
    }

    // status validation
    if (user.status === "Inactive") {
      return res.status(401).json({
        success: false,
        message: "Your account is in-active. Please contact owner",
      });
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res
      .status(200)
      .json({ success: true, token, user, message: "Login successful." });
  } catch (error) {
    console.error("Error logging in user:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

//verify user
export const verifyUser = async (req, res) => {
  try {
    console.log("working");
    // extract token from cookie
    const { token } = req.cookies;

    //check token exist or not
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Please Login!",
      });
    }

    //verify token
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    // check user exist or not
    req.user = await AuthUser.findById(decode._id);

    res.status(200).json({
      success: true,
      message: "Verified",
      token,
      user: req.user,
    });
  } catch (error) {
    console.log(error);
  }
};

// get all user
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

export const removeUser = async (req, res) => {
  const { id } = req.params;
  try {
    // Find and delete user
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "User removed successfully",
    });
  } catch (error) {
    console.error("Error removing user:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// update user details and change the access right
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { userData } = req.body;
  console.log(id);

  try {
    // Validate input
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID." });
    }

    // Update user
    const updatedUser = await User.findByIdAndUpdate(id, userData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({
      success: true,
      updatedUser,
      message: "User updated successfully.",
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

//logout
export const logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", "", {
        expires: new Date(Date.now()),
      })
      .json({
        success: true,
        message: "logout successfully!",
        user: null,
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//forgot password
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send("User not found");

    const token = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailOptions = {
      to: user.email,
      from: process.env.MAIL_USER,
      subject: "Password Reset",
      text: `Please click on the following link, or paste this into your browser to complete the process:\n\n
      http://localhost:3000/reset?token=${token}\n\n
      If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    await transporter.sendMail(mailOptions);
    res.send("Password reset email sent");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//password reset
export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  console.log(token);
  console.log(password);

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user)
      return res
        .status(400)
        .send("Password reset token is invalid or has expired");

    user.password = await bcrypt.hash(password, 12);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();
    res.send("Password has been reset");
  } catch (error) {
    res.status(500).send(error.message);
  }
};
