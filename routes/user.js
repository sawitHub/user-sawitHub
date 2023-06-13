const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const Multer = require('multer');
const uuid = require('uuid');

//Connect database user-sawit-hub
const connnection = mysql.createConnection({
  //host cloud SQL
  // host: '34.101.47.232',
  //host lokal
  host: 'localhost',

  user:'root',

  // password cloud sql: 'password_sql_Anda'
  // password:'sawithubdatabase',
  // password lokal
  password:'',

  database:'sawithub',
});

const multer = Multer({
  storage: Multer.MemoryStorage,
  fileSize: 5 * 1024 * 1024
})

router.post('/register', multer.single('attachment') ,(req, res)=>{
  const uid = uuid.v4();

  const password = req.body.password;
  const email = req.body.email;
  const name = req.body.name;

  const query = 'SELECT * FROM `user` where email = ?';
  
  connnection.query(query, [email], (err, result, fields) => {
    if(result && result.length){
      res.json('User sudah tersedia');
    }
    else{
      const query = 'INSERT INTO `user`(`user_id`, `name`, `email`, `password`) VALUES (?,?,?,?)';
      connnection.query(query, [uid, name, email, password], (err, result, fields)=>{
        if (err) {
          res.status(500).send({message: err.sqlMessage})
      } else {
          res.send({message: "Register success"})
      }
      })
    }
  })
});

router.post('/login', multer.single('attachment'), (req, res)=>{
  const email = req.body.email;
  const user_password = req.body.password;

  const query = 'SELECT * FROM `user` WHERE email = ?';
  connnection.query(query, [email], (err, result, fields)=>{
    if(result && result.length){
      const password = result[0].password;
      if(password == user_password){
        res.send({message: "Login berhasil"});
      } else{
        res.send({message: `Password salah`});
      }
    } else{
      res.send({message: "User tidak ditemukan, silahkan register terlebih dahulu"})
    }

  })
})

router.post('/scanning', (req, res)=>{
  const image = req.body.image;
})

module.exports = router 