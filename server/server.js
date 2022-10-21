const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan');
const cors = require('cors');

//Initializing our app and setting our port - 8000 is for local development.
const app = express()
const PORT = process.env.PORT || 8000;

//Our MongoDB connection URI - Will need to be hidden in production! Contains our Login Name, Password, and directs us to the "Politicians" database.
const MONGODB_URI = 'mongodb+srv://FincAdmin:DemocracyBackend135@digitaldemocracy.5lhi6nx.mongodb.net/Politicians?retryWrites=true&w=majority'

const routes = require('../src/routes/api')
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Connected to DD database with MongoDB');
})

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(cors());

// HTTP request logger
app.use(morgan('tiny'));
app.use('/', routes);

app.listen(PORT, console.log(`Server is starting at ${PORT}`));