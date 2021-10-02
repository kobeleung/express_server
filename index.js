const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = process.env.PORT || 3000

mongoose
  .connect("mongodb://root:root@mongo:27017/?authSource=admin")
  .then(() => console.log("Success"))
  .catch((e) => { console.log(e) })
app.get('/', (req, res) => {
  res.send('Hello')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
