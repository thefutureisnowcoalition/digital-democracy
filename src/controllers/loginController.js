const User = require('../models/User');

const login = (req,res)=>{
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
}

module.exports = {login}