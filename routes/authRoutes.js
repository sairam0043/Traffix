const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const router = express.Router();

// 🔑 User Signup
router.post("/signup", async (req, res) => {
    const { full_name, email, phone, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ error: "User already exists!" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ full_name, email, phone, password: hashedPassword });
        await newUser.save();
 
        res.status(201).json({ message: "Signup successful! Please log in." });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Server error during signup." });
    }
});

// 🔑 User Login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ error: "Invalid email or password!" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: "Invalid email or password!" });

        res.json({ message: `${user.role} Login successful!`, success: true, role: user.role });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Server error during login." });
    }
});

module.exports = router;
