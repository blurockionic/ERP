import { User } from "../model/auth_model.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/feature.js";
import { v4 as uuidv4 } from 'uuid';



//registration
export const registration = async (req, res) => {
  //fetch data from request body
  const { firstName, lastName, email, password } = req.body;

  try {
    //validation first name
    if (!firstName) {
      return res.status(400).json({
        success: false,
        message: "Please enter fistname.",
      });
    }
    // validate lastname
    if (!lastName) {
      return res.status(400).json({
        success: false,
        message: "Please enter lastname.",
      });
    }
    //validate email
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Please enter email.",
      });
    }
    //validate password
    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Please enter password.",
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
    const verificationToken =  uuidv4();


    //create entry on db
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashpassword,
      verificationToken,
    });

    //return

    sendCookie(user, res, `Account created successfully.`, 201);
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      message: error,
    });
  }
};

//login
export const login = async (req, res) => {
  // fetch all the data from request body
  const { email, password } = req.body;

  try {
    // validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email does not exist! Please Register!",
      });
    }

    // check email exist ot not

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Email does not exist! Please Register!",
      });
    }

    // console.log(user)
    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    // console.log("working")

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Please enter correct password!",
      });
    }

    // Generate a JSON Web Token (JWT)
    sendCookie(user, res, `welcome back ${user.name} `, 200);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
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
