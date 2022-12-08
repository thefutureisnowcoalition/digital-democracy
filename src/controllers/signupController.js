const User = require('../models/User');

const signup = (req,res)=>{
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
}

module.exports = {signup}