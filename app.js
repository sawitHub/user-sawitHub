const express = require('express');
const app = express()
const bodyParser = require('body-parser');

const userRouter = require('./routes/user');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(userRouter);

app.get('/', (req, res)=>{
  res.send('Hello, response berhasil');
})

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
  console.log(`Running on port ${PORT}`)
})