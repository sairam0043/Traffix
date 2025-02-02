const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");

const app = express();
const PORT = 5000;

// 🌐 Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

// 📂 Multer Storage (For Proof Uploads)
const upload = multer({ dest: "uploads/" });

// 🌟 Predefined Admin & User Credentials
const ADMIN_EMAIL = "admin@traffic.com";
const ADMIN_PASSWORD = "admin123";
const USER_EMAIL = "user@traffic.com";
const USER_PASSWORD = "user123";

// 📝 Temporary Users Storage (In-memory)
const users = [
    { full_name: "Admin User", email: ADMIN_EMAIL, phone: "1234567890", password: ADMIN_PASSWORD, role: "admin" },
    { full_name: "John Doe", email: USER_EMAIL, phone: "9876543210", password: USER_PASSWORD, role: "user" }
];

// 📝 Temporary Storage for Reports (In-memory)
let reports = [];

// 🔑 Login Route (For User & Admin)
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        return res.json({ 
            message: `${user.role === "admin" ? "Admin" : "User"} Login successful!`, 
            success: true, 
            role: user.role 
        });
    }

    res.status(401).json({ error: "Invalid email or password!" });
});

// 📝 Signup Route (For New User Registration)
app.post("/signup", (req, res) => {
    const { full_name, email, phone, password } = req.body;

    // Check if the user already exists
    if (users.some(user => user.email === email)) {
        return res.status(400).json({ error: "User already exists!" });
    }

    // Save new user (Role defaults to "user")
    const newUser = { full_name, email, phone, password, role: "user" };
    users.push(newUser);
    res.json({ message: "Signup successful! Please log in." });
});

// 🚨 Submit a New Violation Report (User)
app.post("/submit-report", upload.array("proof"), (req, res) => {
    const { description, place, location, date } = req.body;
    const proofFiles = req.files.map(file => file.filename); // Get uploaded filenames

    // Generate a unique Report ID
    const reportId = `REP-${Math.floor(1000 + Math.random() * 9000)}`;

    // Store report in memory
    const newReport = {
        id: reportId,
        description,
        place,
        location,
        date,
        proof: proofFiles,
        status: "Pending"
    };

    reports.push(newReport);
    res.json({ message: "Report submitted successfully!", reportId });
});

// 🔎 Check Report Status (User)
app.get("/check-status/:id", (req, res) => {
    const report = reports.find(r => r.id === req.params.id);

    if (!report) {
        return res.status(404).json({ error: "Report ID not found!" });
    }

    res.json({ status: report.status });
});

// 📌 Admin Routes to Fetch, Update, and Delete Reports
// Middleware to check if the logged-in user is an Admin
function isAdmin(req, res, next) {
    const { role } = req.body;
    if (role !== "admin") {
        return res.status(403).json({ error: "Admin access required!" });
    }
    next();
}

// Fetch all reports for Admin
app.get("/admin/reports", isAdmin, (req, res) => {
    res.json(reports);
});

// Update a report status (Admin only)
app.put("/admin/reports/:id", isAdmin, (req, res) => {
    const report = reports.find(r => r.id === req.params.id);
    if (!report) return res.status(404).json({ error: "Report not found!" });

    const { status } = req.body;
    report.status = status;
    res.json({ message: "Report updated successfully!", updatedReport: report });
});

// Delete a report (Admin only)
app.delete("/admin/reports/:id", isAdmin, (req, res) => {
    const reportIndex = reports.findIndex(report => report.id === req.params.id);
    if (reportIndex === -1) return res.status(404).json({ error: "Report not found!" });

    reports.splice(reportIndex, 1);
    res.json({ message: "Report deleted successfully!" });
});

// 🚀 Start Server
app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
