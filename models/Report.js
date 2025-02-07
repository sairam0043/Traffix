const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
    reportId: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    place: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: String, required: true },
    proof: [{ type: String }],  // Array of file names
    status: { type: String, required: true, default: "Pending" },
    email: { type: String, required: true }  // ✅ Added Email Field
});

const Report = mongoose.model("Report", reportSchema);
module.exports = Report;
