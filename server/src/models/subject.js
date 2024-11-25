const mongoose = require("mongoose");
const { Schema } = mongoose;

const subjectSchema = new Schema({
  subjectName: { type: String, required: true },
  section: { type: mongoose.Schema.Types.ObjectId, ref: "Section", required: true },  // Link the subject to the section
  teacher:{ type: mongoose.Schema.Types.ObjectId,ref: "User", required: true },
  units: [{ type: String, required: true }]  // Multiple units stored in an array
}, { timestamps: true });

const Subject = mongoose.model("Subject", subjectSchema);
module.exports = Subject;
