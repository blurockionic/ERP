import mongoose from "mongoose";
import nodemailer from "nodemailer"

const userAccessSchema = new mongoose.Schema(
  {
    userName:{
      type: String
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    gender:{
      type:String,
    },
    isActive:{
      type:Boolean,
      default: false
    },
    email: {
      type: String,
      required: true,
    },
    collectionName: {
      type: String,
      required: true,
    },
    readAccess: {
      type: Boolean,
      default: false,
    },
    writeAccess: {
      type: Boolean,
      default: false,
    },
    designation:{
      type:String
    }
  },
  {
    timestamps: true,
  }
);

//send the notification on mail
userAccessSchema.post("save", async (doc) => {
  try {
    console.log(doc)
    // mail transporter
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    // Define the email information
    const mailOptions = {
      from: `Blurock Innovations | ERP Solutions <${doc.email}>`,
      to: doc.email,
      subject: "Access Granted to lead management system",
      html: `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Grant Mail</title>
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
          <p>Hello ${doc.userName},</p>
          <p>We are excited to have you on board!</p>
          <p>Your account has been granted successfully to lead management.</p>
          <!-- <a href="{{ verificationLink }}">Verify Email</a> -->
          <p>Your login crendential: </p>
          <p>Email: ${doc.email}</p>
          <p>Password: 123456</p>
          <p>Best regards,<br> The Platform Team</p>
        </div>
      </body>
      </html>
      `,
    };

    // Send the email
   await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (error) {
    console.error("Unable to send the mail.");
  }
});

export const UserAccess = mongoose.model("UserAccess", userAccessSchema);
