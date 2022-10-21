//Schema 
const mongoose = require('mongoose');
const PoliticianSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  state: String,
  office: String,
  phone: String,
  date_of_birth: String,
  total_votes: String,
  votes_against_party: String,
  votes_with_party: String,
  missed_votes: Number,
  missed_votes_pct: Number,
  image: String,
  youtube: String,
  twitter: String,
  facebook: String,
  title: String,
  party: String
})


module.exports = mongoose.model('Politicians', PoliticianSchema);