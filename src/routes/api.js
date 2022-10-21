const express = require('express');
const router = express.Router();
const Politician = require('../models/Politician');

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

  module.exports = router;
