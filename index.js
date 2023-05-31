//import all libraries
const crypto = require('crypto');
//make unique id
const uuid = require('uuid');
//API
const express = require('express');
//connect database
const mysql = require('mysql');
//to parse parse parameter from API
const bodyParser = require('body-parser');

//Connect database user-sawit-hub
const con = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'',
  database:'sawit-hub'
});

//Cek database connect
con.connect((err)=>{
  if(err) throw err;
  console.log('Database connect')
})

//Hash password with sha512
const genRandomString = function(length){
  return crypto.randomBytes(Math.ceil(length/2)).
    toString('hex').
    slice(0, length);
}

const sha512 = function(password, salt){
  const hash = crypto.createHmac('sha512', salt);
  hash.update(password);
  const value = hash.digest('hex');
  return {
    salt: salt,
    passwordHash: value
  }
}

function saltHashPassword(userPassword){
  let salt = genRandomString(16);
  let passwordData = sha512(userPassword, salt);
  return passwordData;
}

function checkHashPassword(userPassword, salt){
  const passwordData = sha512(userPassword, salt);
  return passwordData;
}

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


//Register
app.post('/register/', (req, res, next)=>{
  let post_data = req.body;

  let uid = uuid.v4();
  let plaint_password = post_data.password;
  let hash_data = saltHashPassword(plaint_password);
  let password = hash_data.passwordHash;
  let salt = hash_data.salt;

  let name = post_data.name;
  let email = post_data.email;

  con.query('SELECT * FROM `user` where email=?',[email], function(err, result, fields){
    con.on('error', function(err){
      console.log(`[MySQL ERROR]`, err);
    });

    if(result && result.length){
      res.json('User already exist!');
    } else 
    {
      con.query('INSERT INTO `user`(`id`, `unique_id`, `email`, `password`, `salt`, `name`) VALUES (?,?,?,?,?)'
      ,[uid, email, password, salt, name]
      ,function(err, result, value){
        con.on('error', function(err){
          console.log('MySQL ERROR', err);
          res.json('Register error :', err);
        });
        res.send('POSTED');
        res.json('Register succesfully');
      });
    }
  });  
});

app.post('/login/', (req, res)=>{
  const user_password = req.body.password;
  const email = req.body.email;

  con.query('SELECT * FROM `user` where email=?',[email], function(err, result, fields){
    con.on('error', function(err){
      console.log(`[MySQL ERROR]`, err);
    });

    if(result && result.length){
      const password = result[0].password;
      if(user_password == password){
        res.end(JSON.stringify(result[0]));
      }
      else
      {
        res.end(JSON.stringify('Wrong password'));
      }
    } else 
    {
      res.json('User not exist!');
    }
  });  
});

app.get('/', (req, res)=>{
  res.send('Hello, server has been running');
})

const port = 3000;
app.listen(port, ()=>{
  console.log(`Running on port ${port}`)
})