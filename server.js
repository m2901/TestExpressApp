const express = require('express')
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 4000;
const AccountController = require('./Controller/account.controller.js');
const ProjectController = require('./Controller/project.controller.js');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// app.use('/',(req,res,next) => {
//     res.send('hello world');
// });

app.post('/signup',AccountController.signUp);
app.post('/signin',AccountController.signIn);
app.post('/create/project',ProjectController.createProject);

let db = require('./model.js');
db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log("Connected to DB"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

