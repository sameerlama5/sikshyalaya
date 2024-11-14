const express = require('express')
const app = express()
const port = 8000
const cors = require('cors');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const mongoose = require('mongoose');

const dbConnect = async()=>{
  try{
    const isConnected =  await mongoose.connect('mongodb://127.0.0.1:27017/sikshyalayaDb');
    if(isConnected) console.log("connected to mongodb")
  }catch(err){
  console.log(err)
  }
}
dbConnect()


const { Schema } = mongoose;
// email, phoneNumber, password, role, fullName, fatherName, motherName)
const userSchema = new Schema({
  email: {type:String, unique:true}, 
  phoneNumber: Number,
  password: String,
  role: {
    type: String,
    enum : ['student','teacher', 'admin'],
    default: 'student'
  },
  fullName:String,
  fatherName: String,
  motherName: String
});
const User = mongoose.model('User', userSchema);
app.use(express.json())
app.use(cors())



app.post('/register',async (req, res) => {
  //1. email exists or not?
        const emailExist = await User.exists({email: req.body.email})
        if(emailExist) return res.status(409).send({msg: "Email already exist!"})
        // yes exists: 
            //-------> return msg email taken
        // no exists:
            //2. password hash
            req.body.password = await bcrypt.hash(req.body.password, saltRounds);
            //3. save to db
            User.create(req.body)
            res.send({msg: req.body.role + " created successfully"})

})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})




// MONGODB

// -> database: space to store/manage data
//         -> SQL                         vs                 noSQL
//           table                                      collection
//           database                                   database
//           rows and columns                           document (key:value)
//           tabular form                               object based
//           User.findAll()--->ORM(sequalize)           User.find()  ---> ODM(Object Data Modeling) (mongoose)
//           relational DB                              schemaless/non-relationaldb














