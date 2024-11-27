const mongoose = require("mongoose");
const { Schema } = mongoose;

const subjectSchema = new Schema({
  subjectName: { type: String },
  section: { type: mongoose.Schema.Types.ObjectId, ref: "Section"}, 
  teacher:{ type: mongoose.Schema.Types.ObjectId,ref: "User" },
  units: [{ type: String }]  
}, { timestamps: true });

const Subject = mongoose.model("Subject", subjectSchema);
module.exports = Subject;
