import mongoose from "mongoose";


const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    companyId: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    verificationToken: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    tempPassword: {
      type: String,
    },
    password: {
      type: String,
    },
    status: {
      type: String,
      default: "Inactive",
    },
    softwareName: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
    role: {
      type: String,
      enum: ["User", "Admin"],
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  {
    timestamps: true,
  }
);



const User = mongoose.model("grant_access_user", userSchema);

export default User;
