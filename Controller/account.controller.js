const ValidationMessageService = require('../Service/validationMessage.service.js');
const ResponseService = require('../Service/response.service.js');
const AccountService = require('../Service/account.service.js');

module.exports = {
    signUp,
    signIn
}

function signUp (req,res) {
    const accountDetails = {
        username : req.body.username,
        email : req.body.email,
        password : req.body.password
    };
    _validate(req,res)
        .then(_=> AccountService.addAccountDetails(accountDetails))
        .then(details => _sendSuccess(res, details)) 
        .catch(err => _sendError(res,err));
}

function signIn (req, res) {
    console.log(req.body);
    const accountDetails = {
        email : req.body.email, 
        password : req.body.password
    };
    _validateLoginDetails(req,res)
        .then(_=> AccountService.login(accountDetails))
        .then(details => _sendSuccess(res,details))
        .catch(err => _sendError(req,err));

    function _validateLoginDetails(req,res) {
        const _validations = {
            'email' : {
                notEmpty : true,
                isEmail : {
                    errorMessage : ValidationMessageService.isEmail('email')
                },
                errorMessage : ValidationMessageService.isEmpty('email')
            },
            'password' : {
                notEmpty : true,
                errorMessage : ValidationMessageService.isEmpty('password')
            }
        }
    req.checkBody(_validations);
    return _sendValidationsErrors(req,res);
    }
}

function _validate(req,res) {
    const _validations = {
        'username': {
            notEmpty : true,
            errorMessage : ValidationMessageService.isEmpty('username')
        },
        'email' : {
            notEmpty : true,
            isEmail : {
                errorMessage : ValidationMessageService.isEmail('email')
            },
            errorMessage : ValidationMessageService.isEmpty('email')
        },
        'password' : {
            notEmpty : true,
            errorMessage : ValidationMessageService.isEmpty('password')
        }
    }
    req.checkBody(_validations);
    return _sendValidationsErrors(req,res);
}

function _sendValidationsErrors(req, res) {
    return new Promise((resolve, reject) => {
        ResponseService.sendValidationErrorsIfAny(req, res).then(status => {
            if (status === 0) {
                resolve();
            }
        });
    });
}

function _sendSuccess(res, details) {
    return ResponseService.sendSuccess(res, details);
}

function _sendError(res, err) {
    return ResponseService.sendError(res, err);
}