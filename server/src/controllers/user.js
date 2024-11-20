
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const registerUser = async (req, res) => {
  //1. email exists or not?
  const emailExist = await User.exists({ email: req.body.email })
  if (emailExist) return res.status(409).send({ msg: "Email already exist!" })
  // yes exists: 
  //-------> return msg email taken
  // no exists:
  //2. password hash
  req.body.password = await bcrypt.hash(req.body.password, saltRounds);
  //3. save to db
  User.create(req.body)
  res.send({ msg: req.body.role + " created successfully" })

}

const loginUser = async (req, res) => {
  const { email, password } = req.body
  //STEP 1: check if email exists
  const user = await User.findOne({ email })

  if (!user) return res.status(401).send({ msg: "Invalid Email!!" })

  if ((user?.role == 'student' || user?.role == 'teacher') && !user.isVerified) return res.status(401).send({ msg: "Approval is still pending!! Please wait!" })
  //STEP 2: Compare the password
  const isPasswordMatched = await bcrypt.compare(password, user.password)

  if (!isPasswordMatched) return res.status(401).send({ msg: "Invalid Password!!" })

  //STEP 3: Generate unique token for the user to mark that he is logged in
  const token = jwt.sign({ email }, process.env.SECRET_KEY);

  res.send({
    token,
    user,
    isLoggednIn: true,
    msg: 'Authorized!!'
  })

}

const getAllUser = async (req, res) => {
  const data = await User.find()
  res.send(data)
}

const approveUser = async (req, res) => {
  const user = await User.findById(req.params.userId)
  user.isVerified = true
  user.save()
  res.send('user approved')
}

const rejectUser = async (req, res) => {
  const user = await User.findById(req.params.userId)
  user.isVerified = false
  user.save()
  res.send('user rejected')
}

module.exports = { getAllUser, approveUser, loginUser, registerUser, rejectUser }