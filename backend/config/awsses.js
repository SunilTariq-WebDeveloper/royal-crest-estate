import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";

export const sender_email = "Royal Crest Estate <suniltariq08@gmail.com>";
export const CLIENT_URL = "http://localhost";

// Nodemailer Transporter Setup (Gmail SMTP)
export const AWSSES = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER || "suniltariq08@gmail.com",
        pass: process.env.EMAIL_PASS, // Google 16-digit App Password
    },
});

console.log("✅ Nodemailer Email Transporter is connected!");