const axios = require('axios');

const recaptcha = async (req, res) => {
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
}

module.exports = {recaptcha}