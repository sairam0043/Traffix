const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// 🌐 Middleware
app.use(cors());  // Enable CORS for frontend requests
app.use(bodyParser.json());  // Parse JSON request bodies
app.use(express.static("public")); // Serve static frontend files

// 🌟 Hardcoded Admin Login Credentials
const ADMIN_EMAIL = "n210043@rguktn.ac.in";
const ADMIN_PASSWORD = "1234567890";  

// 🌟 Temporary Users Storage (Replace with Database Later)
const users = [
    { full_name: "Admin User", email: ADMIN_EMAIL, phone: "1234567890", password: ADMIN_PASSWORD }
];

// 🔑 Login Route (Predefined Email & Password)
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        res.json({ message: "Login successful!", success: true });
    } else {
        res.status(401).json({ error: "Invalid email or password!" });
    }
});

// 📝 Signup Route (If You Want User Registration)
app.post("/signup", (req, res) => {
    const { full_name, email, phone, password } = req.body;

    // Check if the user already exists
    const userExists = users.find(user => user.email === email);
    if (userExists) {
        return res.status(400).json({ error: "User already exists!" });
    }

    // Save new user
    users.push({ full_name, email, phone, password });
    res.json({ message: "Signup successful! Please log in." });
});

// 🚀 Start Server
app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
