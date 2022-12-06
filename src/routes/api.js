const express = require('express');
const router = express.Router();
const Politician = require('../models/Politician');
const User = require('../models/User');
const axios = require('axios');

//Routes
//Get ALL politicians from database
router.get('/api', (req, res) => {
  
    Politician.find({ })
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        console.log(error)
      });
  
  })

//Get ONE politician from database based on full_name 
router.get('/api/:name', (req, res) => {
  //grab our name from the request parameters
  const name = req.params['name'];
  //We need to split our name into two variables so we can use them for the mongodb search...
  array = name.split(" ");
  ourfirst = array[0]
  ourlast = array[1]

    Politician.findOne(
      {last_name: ourlast, first_name: ourfirst},
      {_id:0}
      )
    .then(data => {
      res.json(data)
    })
    .catch((error) => {
      console.log(error)
    })
})

router.get('/user', (req, res) => {
  
  User.find({ })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.log(error)
    });

})

router.put("/user", (req, res) => {
  const {name,email,password, address, zipcode, interests} =req.body;
  User.updateOne({email: email}, { $set: {name: name, email: email, password: password, address: address, zipcode: zipcode, interests: interests}}).then(
    () => {
      res.status(201).json({
        message: 'User updated successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
})

router.post("/login",(req,res)=>{
    const {email,password} =req.body;
    User.findOne({email:email},(err,user)=>{
        if(user){
           if(password === user.password){
               res.send({message:"login success",user:user})
           }else{
               res.send({message:"wrong credentials"})
           }
        }else{
            res.send({message:"user does not exist for this email address"})
        }
    })
});
router.post("/signup",(req,res)=>{
  console.log("signup api call");
    console.log(req.body);
    const {name,email,password, address, zipcode, interests} =req.body;
    User.findOne({email:email},(err,user)=>{
        if(user){
            res.send({message:"a user already exists with this email address"});
        }else {
            const user = new User({name,email,password, address, zipcode, interests});
            user.save(err=>{
                if(err){
                    res.send(err);
                }else{
                    res.send({message:"sign up sucessfull"});
                }
            })
        }
    })


})

router.post("/recaptcha", async (req, res) => {
      console.log("recaptcha api call");
      const {token} = req.body;

      // secret key is exposed
      await axios.post(
        `https://www.google.com/recaptcha/api/siteverify?secret=6Lf02yQjAAAAAN4sUzP_o3PnlLLppjAfhA56IvnL&response=${token}`
        );
        
        if (res.status(200)) {
          res.send("Human 👨 👩");
      }else{
        res.send("Robot 🤖");
      }
  });
  

  module.exports = router;
