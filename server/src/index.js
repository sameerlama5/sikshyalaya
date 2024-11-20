const express = require('express')
const app = express()
const port = 8080
const cors = require('cors');
require('dotenv').config()
const UserRoute = require('./routes/user')
const dbConnect = require('./db/connection');
dbConnect()

app.use(express.json())
app.use(cors())
app.use(UserRoute)

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














