const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    language: { type: String, required: true },
    active: { type: Boolean, default: false }, // Add active status
  },
  { timestamps: true }
);

module.exports = mongoose.model("File", fileSchema);
