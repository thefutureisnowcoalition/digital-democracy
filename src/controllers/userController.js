const User = require('../models/User');

const getAllUsers = (req, res) => {
  
    User.find({ })
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        console.log(error)
      });
  
}

const updateUser = (req, res) => {
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
}

module.exports = {getAllUsers, updateUser}