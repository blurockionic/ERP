import { User } from "../model/auth_model.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/feature.js";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

//registration
export const registration = async (req, res) => {
  //fetch data from request body
  const { companyName, fullName, email, isAgreed, mobileNumber, industrySize } =
    req.body;

  try {
    let companyId = companyName.slice(0, 5) + uuidv4();
    let password = companyName.slice(0, 5) + "7823";
    //validation first name
    if (!companyName) {
      return res.status(400).json({
        success: false,
        message: "Please Enter company name",
      });
    }
    // validate lastname
    if (!mobileNumber) {
      return res.status(400).json({
        success: false,
        message: "Please enter mobile  number",
      });
    }
    //validate email
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Please enter email.",
      });
    }
    if (!fullName) {
      return res.status(400).json({
        success: false,
        message: "Please enter full name .",
      });
    }

    if (!isAgreed) {
      return res.status(400).json({
        success: false,
        message: "Please accept terms and conditions of company.",
      });
    }

    //check if email is exist
    const isEmailExit = await User.findOne({ email });

    if (isEmailExit) {
      return res.status(400).json({
        success: false,
        message: "Email already exist",
      });
    }

    //encrypt password
    const hashpassword = await bcrypt.hash(password, 10);

    // generate verification token
    const verificationToken = uuidv4();

    //create entry on db
    const user = await User.create({
      companyId,
      companyName,
      fullName,
      email,
      password: hashpassword,
      industrySize,
      verificationToken,
      temPassword: password,
    });

    //return

    sendCookie(user, res, `Account created successfully.`, 201);
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      message: "Internal server error",
    });
  }
};

//login
export const login = async (req, res) => {
  // Fetch all the data from request body
  const { email, password } = req.body;

  try {
    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter email and password!",
      });
    }

    // Check if email exists
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Email does not exist! Please register!",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Please enter the correct password!",
      });
    }

    // Generate a JSON Web Token (JWT)
    const token = jwt.sign(
      { _id: user._id },
      process.env.JWT_SECRET || "your_jwt_secret",
      {
        expiresIn: "3d",
      }
    );

    // Set cookie for token and return success response
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
      httpOnly: true,
      sameSite: "None",
      secure: true,
    };

    console.log(user)

    return res.cookie("token", token, options).status(200).json({
      success: true,
      token,
      user,
      message: "Login successful!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "An error occurred during login",
    });
  }
};

//handle for get user details
export const getMyProfile = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "details is fetched",
      user: req.user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//handle for logout
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

//varify email
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;

    const user = await User.findOne({ verificationToken: token });

    if (user) {
      // Mark the user as verified and clear the verification token
      user.isVerified = true;
      user.verificationToken = null;
      await user.save();

      res.send("Email verified successfully!");
    } else {
      res.status(404).send("Invalid verification token.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
