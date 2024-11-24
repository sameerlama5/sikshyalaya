const mongoose = require("mongoose");
const { Schema } = mongoose;

const subjectSchema = new Schema({
  subjectName: { type: String, required: true },
  section: { type: mongoose.Schema.Types.ObjectId, ref: "Section", required: true },  // Link the subject to the section
  teacher:{ type: String, required: true },
  subjectCode: { type: Number, unique: true, required: true },
  units: [{ type: String, required: true }]  // Multiple units stored in an array
}, { timestamps: true });

const Subject = mongoose.model("Subject", subjectSchema);
module.exports = Subject;
