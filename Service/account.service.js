const User = require('../Model/user.js');
const Jwt =  require('../Model/jwt.js');
const Project = require('../Model/project.js');
const _ = require('lodash');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

module.exports = {
    addAccountDetails,
    login
};

function addAccountDetails(accountDetails) {
    return _getAccountDetails(accountDetails.email)
        .then(userDetails => _.size(userDetails) > 0 ? _sendEmailExists(accountDetails.email) : true) 
        .then(_ => _addAccountDetails(accountDetails));

    function _addAccountDetails(accountDetails) {
        let _password = bcrypt.hashSync(accountDetails.password);
        let userDetails = new User({
            username : accountDetails.username,
            email : accountDetails.email,
            password : _password 
        });
        return userDetails.save();
    }
}

function login(accountDetails) {    
    let _accountDetails = {}
    let _userDetails = {};
    return _getAccountDetails(accountDetails.email)
        .then(userDetails => {
            _userDetails = [...userDetails];
            _accountDetails.account_details = _userDetails; 
            return _.size(_userDetails) > 0 ? _checkPassword(accountDetails.password, _.head(_userDetails).password) : _sendInvalidEmail(accountDetails.email)
        })
        .then(_=>  _createJwt(_userDetails))
        .then(tokenDetails => {
            _accountDetails.token = tokenDetails.jwt; 
        })
        .then(_=> _getProjectDetailsAndPermissions(accountDetails))
        .then(projectDetails => {
            _accountDetails.project_details = projectDetails;
            return _accountDetails;
        });

    function _checkPassword(paramPassword, userPassword) {          
        return bcrypt.compareSync(paramPassword, userPassword) ? Promise.resolve(true) : _sendInvalidPassword();
    }

    function _createJwt(accountDetails) {
        const secret = '4ukI0uIVnB3iI1yxj646fVXSE3ZVk4doZgz6fTbNg7jO41EAtl20J5F7Trtwe7OM';
        const token = _createToken(accountDetails.email, secret)
            return _insertJwt(token, accountDetails);

        function _createToken(email, secret) {
            return jwt.sign({
                user : email
            },secret,{
                algorithm : 'HS256',
                expiresIn : 60 * 60 * 24 * 365,
                issuer : 'test',
                audience : 'test'
            });
        }

        function _insertJwt(token, accountDetails) {
            const jwtDetails = new Jwt({
                user_id : accountDetails.id,
                jwt : token
            });
            return jwtDetails.save();
        }
    }

    function _getProjectDetailsAndPermissions(accountDetails) {
        return Project.find({
            user_id : accountDetails.id
        });
    }
}

function _getAccountDetails(email) {
    return User.find({email : email})
}

function _sendEmailExists(email) {
    throw {
        emailAlreadyExists : email
    }
}

function _sendInvalidEmail(email) {
    throw {
        invalidEmail : email
    }
}

function _sendInvalidPassword() {
    throw {
        invalidPassword : true
    }
}