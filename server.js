const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// 🌐 Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

// 🌟 Predefined Admin Credentials
const ADMIN_EMAIL = "admin@traffic.com";
const ADMIN_PASSWORD = "admin123";

// 🌟 Predefined User Credentials
const USER_EMAIL = "user@traffic.com";
const USER_PASSWORD = "user123";

// 📝 Temporary Users Storage (In-memory for now)
const users = [
    { full_name: "Admin User", email: ADMIN_EMAIL, phone: "1234567890", password: ADMIN_PASSWORD, role: "admin" },
    { full_name: "John Doe", email: USER_EMAIL, phone: "9876543210", password: USER_PASSWORD, role: "user" }
];

// 📝 Temporary storage for reports (in-memory, no database)
let reports = [
    { id: 1, description: "Running red light", location: "Main Street", date: "2024-02-01", status: "Pending" },
    { id: 2, description: "Over speeding", location: "Highway 23", date: "2024-02-02", status: "Pending" }
];

// 🔑 Login Route (Predefined Admin & User Credentials)
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    // Check if the user is an admin
    const admin = users.find(user => user.email === email && user.password === password && user.role === "admin");
    if (admin) {
        return res.json({ message: "Admin Login successful!", success: true, role: "admin" });
    }

    // Check if the user is a regular user
    const user = users.find(user => user.email === email && user.password === password && user.role === "user");
    if (user) {
        return res.json({ message: "User Login successful!", success: true, role: "user" });
    }

    res.status(401).json({ error: "Invalid email or password!" });
});

// 📝 Signup Route (For User Registration)
app.post("/signup", (req, res) => {
    const { full_name, email, phone, password } = req.body;

    // Check if the user already exists
    const userExists = users.find(user => user.email === email);
    if (userExists) {
        return res.status(400).json({ error: "User already exists!" });
    }

    // Save new user
    const newUser = { full_name, email, phone, password, role: "user" };
    users.push(newUser);
    res.json({ message: "Signup successful! Please log in." });
});

// 📌 Admin Routes to Fetch, Update, and Delete Reports
app.get("/admin/reports", (req, res) => {
    res.json(reports);
});

app.put("/admin/reports/:id", (req, res) => {
    const reportId = parseInt(req.params.id);
    const { status } = req.body;

    const report = reports.find(r => r.id === reportId);
    if (!report) return res.status(404).json({ error: "Report not found!" });

    report.status = status;
    res.json({ message: "Report updated successfully!", updatedReport: report });
});

app.delete("/admin/reports/:id", (req, res) => {
    const reportId = parseInt(req.params.id);
    reports = reports.filter(report => report.id !== reportId);
    res.json({ message: "Report deleted successfully!" });
});

// 🚀 Start Server
app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
