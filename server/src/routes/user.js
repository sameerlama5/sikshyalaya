const express = require('express');
const router = express.Router();

const { registerUser, loginUser, getAllUser, approveUser } = require('../controllers/user');

  router.post('/register', registerUser)
  router.post('/login', loginUser)
  router.get('/users', getAllUser)
  router.patch('/approve-user/:userId', approveUser)
  
module.exports = router
