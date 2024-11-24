const mongoose = require('mongoose')
const { Schema } = mongoose;

const classSchema = new Schema({
    gradeLevel: { type: Number, required: true },
    academicYear: { type: String, required: true },
});
const Class = mongoose.model('Class', classSchema);
module.exports = Class
