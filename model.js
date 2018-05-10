const mongo = require('mongodb');
const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost:27017/Db';
mongoose.connect(mongoDB);