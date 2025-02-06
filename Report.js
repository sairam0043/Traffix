const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
    reportId: { type: String, unique: true, required: true },
    email:{type:String , unique:true,required:true},
    description: { type: String, required: true },
    place: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: Date, required: true },
    proof: { type: [String], required: true },  // Store filenames of images/videos
    status: { type: String, enum: ["Pending", "Reviewed", "Resolved"], default: "Pending" }
});

const Report = mongoose.model("Report", reportSchema);
module.exports = Report;
