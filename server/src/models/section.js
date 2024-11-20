const mongoose = require('mongoose');
const { Schema } = mongoose;

const sectionSchema = new Schema({
  sectionName: {
    type: String,
    required: true,
  },
  subjects: [{
    type: String,
    required: true
  }],
  classTeacher: {
    type: String,
    required: true
  },
  students: [{
    type: String,
    required: true
  }],
  teachers: [{
    type: String,
    required: true
  }],
  academicYear: {
    type: String,
    required: true
  },
  roomNumber: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Section = mongoose.model('Section', sectionSchema);
module.exports = Section;
