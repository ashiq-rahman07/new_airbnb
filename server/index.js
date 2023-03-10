const express = require ('express');
const cors = require('cors');
require('dotenv').config();
const bcrypt = require('bcryptjs')
const  mongoose  = require('mongoose');
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');
const app = express();


const User = require('./models/User.js')

const bcryptSalt = bcrypt.genSaltSync(10)
const jwtSecret = 'fasefraw4r5r3wq45wdfgw34twdfg';

app.use(express.json());

app.use(cors({
    credentials: true,
    origin : 'http://localhost:5173'
}));

// mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL)

app.get('/test',(req,res)=>{
    res.json('test ok')
})

app.post('/register', async(req,res)=>{
    const {name, email, password} = req.body;

  try{
      const userDoc = await User.create({
        name,
        email,
        password:bcrypt.hashSync(password, bcryptSalt)
    })
    res.json(userDoc);
  }catch (err){
    res.status(422).json(err)
  }
});

app.post('/login', async(req,res) => {
  const {email, password } = req.body;
  const userDoc = await User.findOne({email});

  if(userDoc){
    
    const passOk = bcrypt.compareSync(password,userDoc.password);
    if(passOk){

      jwt.sign({
        email:userDoc.email,
        id:userDoc._id
      }, jwtSecret, {}, (err,token) => {
        if (err) throw err;
        res.cookie('token', token).json(userDoc);
      });
      
    }else{
      res.status(422).json('password not ok')
    }


  }else{
    res.status(422).json('user not found')
  }
})

app.listen(4000)