const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const nodemailer = require("nodemailer");

const router = express.Router();
const verificationCodes = {}; // Temporary storage for verification codes

// 📧 Configure Email Transporter (Use your SMTP settings)
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "sairam44sairam@gmail.com", // Replace with your email
        pass: "hqmg mkqf dmqf ycbx"  // Replace with your app password (not your actual password)
    }
});

// 📌 **Step 1: Send Verification Code**
router.post("/send-code", async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: "User not found!" });

        // Generate 6-digit verification code
        const code = Math.floor(100000 + Math.random() * 900000);
        verificationCodes[email] = code; 

        // Send email
        const mailOptions = {
            from: "your-email@gmail.com",
            to: email,
            subject: "Password Reset Verification Code",
            text: `Your password reset code is: ${code}`
        };

        await transporter.sendMail(mailOptions);
        res.json({ message: "Verification code sent!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error sending verification code." });
    }
});

// 📌 **Step 2: Verify Code**
router.post("/verify-code", (req, res) => {
    const { email, code } = req.body;

    if (verificationCodes[email] && verificationCodes[email] == code) {
        res.json({ message: "Code verified successfully!" });
    } else {
        res.status(400).json({ error: "Invalid verification code!" });
    }
});

// 📌 **Step 3: Reset Password**
router.post("/reset-password", async (req, res) => {
    const { email, newPassword } = req.body;

    try {
        if (!verificationCodes[email]) {
            return res.status(400).json({ error: "Verification required!" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await User.findOneAndUpdate({ email }, { password: hashedPassword });

        delete verificationCodes[email]; // Remove code after successful reset
        res.json({ message: "Password reset successful!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error resetting password." });
    }
});

module.exports = router;
