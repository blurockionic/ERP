import { UserAccess } from "../model/access_right_model.js";
import { User } from "../model/auth_model.js";

//create user togive the access grant
export const newGrant = async (req, res) => {
  try {
    //get the details from req. body
    const {collectionName, email, readAccess, writeAccess} = req.body;

    // console.log(req.body)

    // validation
    if ( !collectionName || !email) {
      return res.status(400).json({
        success: false,
        error: "please Enter user email",
      });
    }

    //check userId is available
    const isEmailExist = await User.findOne({ email: email });
    if (!isEmailExist) {
      return res.status(400).json({
        sucess: false,
        error: "User not registered.",
      });
    }

    const userName =  isEmailExist.firstName +" "+ isEmailExist.lastName

    // Check if the user already has read access to the collection
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

    // console.log("working")

    //create entry on db
    const newAccessGrant = await UserAccess.create({
      userId: isEmailExist._id,
      email,
      collectionName,
      userName,
      readAccess,
      writeAccess,
    });

    //return the result
    res.status(200).json({
      suceess: true,
      message: `Access granted to ${email} `,
      newAccessGrant,
    });
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      error: "Internal server error.",
    });
  }
};

//has user have grant or not
export const hasGrant = async (req, res) => {
  try {
    const { userId, collectionName } = req.params;

    console.log(req.params)

    console.log(userId)
    console.log(collectionName) 

    // Check if the user has access
    const access = await UserAccess.findOne({
      userId,
      collectionName,
    });

    console.log(access)

    const hasAccess = access !== null;

    res.status(200).json({
      sucess: true,
      hasAccess,
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
      return res
        .status(404)
        .json({
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
