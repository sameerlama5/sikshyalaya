const mongoose = require('mongoose')
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {type:String, unique:true}, 
  phoneNumber: Number,
  password: String,
  role: {
    type: String,
    enum : ['student','teacher', 'admin'],
    default: 'student'
  },
  isVerified: Boolean,
  fullName:String,
  fatherName: String,
  motherName: String
});
const User = mongoose.model('User', userSchema);
module.exports = User