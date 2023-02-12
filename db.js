const mongoose = require("mongoose");
const MONGOURI = require('./config/keys');

const mongoURI = MONGOURI;

// const mongoURI = 'mongodb://localhost:27017/?directConnection=true&readPreference=primary'

// mongoose.set('strictQuery', false);

const connectToMongo = ()=>{
     mongoose.connect(mongoURI, ()=>{
          console.log("Connected to mongodb successfully! well done!");
     })
}

module.exports = connectToMongo; 