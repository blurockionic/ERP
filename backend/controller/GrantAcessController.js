import { UserAccess } from "../model/access_right_model.js";
import { User } from "../model/auth_model.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

//create user togive the access grant
export const newGrant = async (req, res) => {
  try {
    // Get the details from req.body
    const {
      firstName,
      lastName,
      gender,
      collectionName,
      email,
      readAccess,
      writeAccess,
    } = req.body;

    // Validation
    if (!collectionName || !email) {
      return res.status(400).json({
        success: false,
        error: "Please enter user email and collection name.",
      });
    }

    // Create password
    const password = "123456";
    const hashPass = await bcrypt.hash(password, 10);

    // generate verification token
    const verificationToken = uuidv4();

    //create entry on db
    await User.create({
      firstName,
      lastName,
      email,
      password: hashPass,
      verificationToken,
    });

    // Check if the email already exists
    const isEmailExist = await UserAccess.findOne({ email });
    if (isEmailExist) {
      return res.status(400).json({
        success: false,
        error: "User exists.",
      });
    }

    // Create username
    const userName = firstName + " " + lastName;

    // Check if the user already has access to the collection
    const existingAccess = await UserAccess.findOne({
      email,
      collectionName,
    });

    if (existingAccess) {
      return res.status(400).json({
        success: false,
        error: "User already has access to the collection.",
      });
    }

    // Create entry in the database
    const newAccessGrant = await UserAccess.create({
      userName,
      firstName,
      lastName,
      gender,
      email,
      collectionName,
      readAccess,
      writeAccess,
    });

    // Return the result
    res.status(200).json({
      success: true,
      message: `Access granted to ${email}`,
      newAccessGrant,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: "Internal server error.",
    });
  }
};

//has user have grant or not
export const hasGrant = async (req, res) => {
  try {
    // Check if the user has access
    const access = await UserAccess.find();


    res.status(200).json({
      success: true,
      access,
      message: "fetched successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//update grant
export const updateGrant = async (req, res) => {
  try {
    const { userId, collectionName } = req.params;
    const { readAccess, writeAccess } = req.body;

    // Validate request body
    if (readAccess === undefined && writeAccess === undefined) {
      return res.status(400).json({
        error: "At least one of readAccess or writeAccess is required.",
      });
    }

    // Update access rights
    const updatedAccess = await UserAccess.findOneAndUpdate(
      { userId, collectionName },
      { $set: { readAccess, writeAccess } },
      { new: true } // Return the updated document
    );

    // Check if the user and collection exist in the access control list
    if (!updatedAccess) {
      return res.status(404).json({
        error: "User or collection not found in the access control list.",
      });
    }

    res
      .status(200)
      .json({ message: "Access rights updated successfully.", updatedAccess });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//delete grant
export const deleteGrant = async (req, res) => {
  try {
    const { userId, collectionName } = req.params;

    // Delete the access record
    const deletedAccess = await UserAccess.findOneAndDelete({
      userId,
      collectionName,
    });

    // Check if the user and collection exist in the access control list
    if (!deletedAccess) {
      return res.status(404).json({
        error: "User or collection not found in the access control list.",
      });
    }

    res
      .status(200)
      .json({ message: "Access rights deleted successfully.", deletedAccess });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
