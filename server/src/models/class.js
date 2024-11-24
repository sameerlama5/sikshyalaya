const mongoose = require('mongoose')
const { Schema } = mongoose;

const classSchema = new Schema({
  class: {type:String,    required: true, unique:true}, 
});
const Class = mongoose.model('Class', classSchema);
module.exports = Class