const mongoose = require('mongoose');
const { Schema } = mongoose;

const subjectSchema = new Schema({
    subjectName: { type: String, required: true },
    subjectCode: { type: String, unique: true, required: true },
    subjectTeacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    studentsEnrolled: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: true
    },
    subjectSchedule: { type: String, required: true },
});

const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;
