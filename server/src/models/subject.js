const mongoose = require("mongoose");
const { Schema } = mongoose;

const subjectSchema = new Schema(
  {
    subjectName: {
      type: String,
      required: true,
    },
    section: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
      required: true,
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    subjectCode: {
      type: Number,
      unique: true,
      required: true,
    },
    units: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Subject = mongoose.model("subject", subjectSchema);
module.exports = Subject;
