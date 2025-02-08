const express = require("express");
const cors = require("cors");  // ✅ Import CORS
const connectDB = require("./config/db");  // ✅ Import database connection
const authRoutes = require("./routes/authRoutes");
const reportRoutes = require("./routes/reportRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes"); // ✅ Import feedback routes


const app = express();
const PORT = 5000;

// 🌐 Middleware
app.use(cors());  // ✅ Enable CORS to allow frontend requests
app.use(express.json());  // ✅ Parse JSON request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// 🔗 Connect to MongoDB (Ensuring it runs before handling requests)
connectDB();

// 🛠️ Routes
app.use("/api/auth", authRoutes);  // ✅ Changed route structure
app.use("/api/reports", reportRoutes);
app.use("/api/feedback", feedbackRoutes);  // ✅ Add feedback route
const forgotPasswordRoutes = require("./routes/forgotPasswordRoutes");
app.use("/api/password-reset", forgotPasswordRoutes);

// 🚀 Start Server
app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
