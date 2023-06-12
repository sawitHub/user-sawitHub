const express = require('express');
const app = express()
const bodyParser = require('body-parser');

const userRouter = require('./routes/user');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(userRouter);

// app.post('/login/', (req, res)=>{
//   const user_password = req.body.password;
//   const email = req.body.email;

//   con.query('SELECT * FROM `user` where email=?',[email], function(err, result, fields){
//     con.on('error', function(err){
//       console.log(`[MySQL ERROR]`, err);
//     });

//     if(result && result.length){
//       const password = result[0].password;
//       if(user_password == password){
//         res.end(JSON.stringify(result[0]));
//       }
//       else
//       {
//         res.end(JSON.stringify('Wrong password'));
//       }
//     } else 
//     {
//       res.json('User not exist!');
//     }
//   });  
// });

app.get('/', (req, res)=>{
  res.send('Hello, response berhasil');
})

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
  console.log(`Running on port ${PORT}`)
})