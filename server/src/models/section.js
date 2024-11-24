const mongoose = require('mongoose');
const { Schema } = mongoose;

const sectionSchema = new Schema({
  sectionName: {
    type: String,
    required: true,
  },
  class: { 
     type: mongoose.Schema.Types.ObjectId,
     ref: "Class"
     },
  subjects: [{
    type:  mongoose.Schema.Types.ObjectId,
     ref: "Subject"
  }],
  classTeacher: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
    },
  students: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
    }],
  teachers: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
    }],
  roomNumber: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Section = mongoose.model('Section', sectionSchema);
module.exports = Section;
