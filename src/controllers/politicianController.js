const Politician = require('../models/Politician');

const getAllPoliticians = (req, res) => {
  
    Politician.find({ })
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        console.log(error)
      });  
}

// Get one politician
const getPolitician = (req, res) => {
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
}

module.exports = {getAllPoliticians, getPolitician};