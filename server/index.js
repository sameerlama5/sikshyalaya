const express = require('express')
const app = express()
const port = 8000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/users', (req, res) => {
    res.send(['ram','shyam','hari'])
  })

app.get('/products', (req, res) => {
res.send(['hawkins','baltra'])
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})