//class Schema
const classSchema = new mongoose.Schema({
  className: { type: String, required: true },
  gradeLevel: { type: Number, required: true },
  academicYear: { type: String, required: true },
  subjects: [{ type: String, required: true }],
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
const Class = mongoose.model("Class", classSchema);
module.exports = Class;
