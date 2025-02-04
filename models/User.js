const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    full_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], required: true, default: "user" }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
