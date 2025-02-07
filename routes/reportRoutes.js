const express = require("express");
const multer = require("multer");
const Report = require("../models/Report");
const router = express.Router();

// 📂 Multer Storage (For Proof Uploads)
const upload = multer({ dest: "uploads/" });

// 🚨 Submit a New Violation Report (User)
router.post("/submit-report", upload.array("proof"), async (req, res) => {
    try {
        const { description, place, location, date, email } = req.body;  // ✅ Added email
        const proofFiles = req.files.map(file => file.filename);

        // Generate a unique Report ID
        const reportId = `REP-${Math.floor(1000 + Math.random() * 9000)}`;

        const newReport = new Report({
            reportId,
            email,  // ✅ Store email of logged-in user
            description,
            place,
            location,
            date,
            proof: proofFiles,
            status: "Pending"
        });

        await newReport.save();
        res.json({ message: "✅ Report submitted successfully!", reportId });
    } catch (error) {
        console.error("❌ Error submitting report:", error);
        res.status(500).json({ error: "Server error while submitting report." });
    }
});

// 🔎 Check Report Status (User)
router.get("/check-status/:id", async (req, res) => {
    try {
        const report = await Report.findOne({ reportId: req.params.id });
        if (!report) return res.status(404).json({ error: "❌ Report ID not found!" });

        res.json({ 
            reportId: report.reportId,
            email: report.email, // ✅ Return email in response
            description: report.description,
            place: report.place,
            location: report.location,
            date: report.date,
            status: report.status
        });
    } catch (error) {
        console.error("❌ Error checking report status:", error);
        res.status(500).json({ error: "Server error while checking status." });
    }
});

// 📌 Admin Routes: Fetch, Update, and Delete Reports
router.get("/admin/reports", async (req, res) => {
    try {
        const reports = await Report.find();
        res.json(reports); // ✅ Return reports with email
    } catch (error) {
        console.error("❌ Error fetching reports:", error);
        res.status(500).json({ error: "Server error while fetching reports." });
    }
});

router.put("/admin/reports/:id", async (req, res) => {
    try {
        const updatedReport = await Report.findOneAndUpdate(
            { reportId: req.params.id },
            { status: req.body.status },
            { new: true }
        );
        if (!updatedReport) return res.status(404).json({ error: "❌ Report not found!" });

        res.json({ message: "✅ Report updated successfully!", updatedReport });
    } catch (error) {
        console.error("❌ Error updating report:", error);
        res.status(500).json({ error: "Server error while updating report." });
    }
});

router.delete("/admin/reports/:id", async (req, res) => {
    try {
        const deletedReport = await Report.findOneAndDelete({ reportId: req.params.id });
        if (!deletedReport) return res.status(404).json({ error: "❌ Report not found!" });

        res.json({ message: "✅ Report deleted successfully!" });
    } catch (error) {
        console.error("❌ Error deleting report:", error);
        res.status(500).json({ error: "Server error while deleting report." });
    }
});

module.exports = router;
