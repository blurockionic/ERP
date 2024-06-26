import mongoose from "mongoose";
import nodemailer from "nodemailer";

const authSchema = new mongoose.Schema(
  {
    companyId: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    isAgreed: {
      type: Boolean,
      required: true,
      default: "false",
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    verificationToken: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    country: {
      type: String,
    },
    mobileNumber: {
      type: String,
    },
    company: {
      type: String,
    },
    industry: {
      type: String,
    },
    language: {
      type: String,
    },
    industrySize: {
      type: String,
    },
    primaryIntrest: {
      type: String,
    },
    isFirstTimeAuth: {
      type: Boolean,
      default: false,
    },
    temPassword: {
      type: String,
    },
    subscription: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscription",
    },
  },
  {
    timestamps: true,
  }
);

//send the notification on mail
authSchema.post("save", async (doc) => {
  try {
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
      <p>Hello ${doc.fullName},</p>
      <p>Thank you for joining our platform. We are excited to have you on board!</p>
      <p>Login in credential</p>
      <p>Email: ${doc.email}</br>Password: ${doc.temPassword}</p>
      <p>Your account has been successfully created. Please click the link below to verify your email:</p>
      <a href="http://localhost:4000/api/v1/auth/verify-email?token=${doc.verificationToken}">Verify Email</a>
      <p>If you did not create an account on our platform, please disregard this email.</p>
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
        res.status(500).json({ error: "Failed to send verification email." });
      } else {
        console.log("Verification email sent:", info.response);
      }
    });
  } catch (error) {
    console.error("Unable to send the mail.");
  }
});

export const User = mongoose.model("user", authSchema);
