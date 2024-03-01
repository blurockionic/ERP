import mongoose from "mongoose";
import nodemailer from "nodemailer";

const authSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    verificationToken: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
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
      <p>Hello ${doc.firstName} ${doc.lastName},</p>
      <p>Thank you for joining our platform. We are excited to have you on board!</p>
      <p>Your account has been successfully created. Please click the link below to verify your email:</p>
      <a href="${doc.verificationLink}">Verify Email</a>
      <p>If you did not create an account on our platform, please disregard this email.</p>
      <p>Best regards,<br> The Platform Team</p>
    </div>
  </body>
  </html>
  `,
    };

    // Read the email template file
    // Read the email template file
    // const emailTemplateSource = fs.readFileSync(
    //   "backend\mailTemplate\signup.html",
    //   "utf8"
    // );

    // console.log("working");
    // // Compile the template using Handlebars
    // const emailTemplate = handlebars.compile(emailTemplateSource);

    // // Replace placeholders with actual values
    // const templateData = {
    //   userName: `${doc.firstName}+ " " + ${doc.lastName}`,
    //   verificationLink: `http://localhost:3000/verify-email?token=${doc.verificationToken}`,
    //   // email: doc.email,
    // };

    // // Render the HTML with actual values
    // const htmlContent = emailTemplate(templateData);

    // Define the email information
    // const mailOptions = {
    //   from: `Blurock Innovations | ERP Solutions <${doc.email}>`,
    //   to: doc.email,
    //   subject: "Verify Your Email",
    //   html: htmlContent,
    // };

    // Send the email
    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to send verification email." });
      } else {
        console.log("Verification email sent:", info.response);
        res.status(201).json({
          message:
            "User registered successfully. Check your email for verification.",
        });
      }
    });
  } catch (error) {
    console.error("Unable to send the mail.");
  }
});

export const User = mongoose.model("user", authSchema);
