const express = require('express')
const mongoose = require('mongoose');
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT } = require('./config/config.js');
const app = express()
const port = process.env.PORT || 3000
const dest = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/mydb?authSource=admin`;

const connectWithRetry = () => {
  mongoose
    .connect(dest)
    .then(() => console.log(`Successfully connected to ${dest}`))
    .catch((e) => { console.log(e); setTimeout(connectWithRetry, 5000) })
}

connectWithRetry();

app.use(express.json());

const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");

app.get('/', (req, res) => {
  res.send('Hello')
})

app.use('/api/v1/posts', postRouter);
app.use('/api/v1/users', userRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
