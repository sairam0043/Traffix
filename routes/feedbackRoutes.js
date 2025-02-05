const express = require("express");
const router = express.Router();
const Feedback = require("../models/feedback");

// 📝 POST route to handle feedback submissions
router.post("/submit-feedback", async (req, res) => {
    try {
        console.log("📩 Received feedback request:", req.body); // Debug log

        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        const newFeedback = new Feedback({ name, email, message });
        await newFeedback.save();

        console.log("✅ Feedback saved:", newFeedback); // Debug log
        res.status(201).json({ success: true, message: "Feedback submitted successfully!" });
    } catch (error) {
        console.error("❌ Error saving feedback:", error.message);
        res.status(500).json({ success: false, message: "Error submitting feedback", error: error.message });
    }
});

module.exports = router;
