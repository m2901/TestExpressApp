const jwt = require('jsonwebtoken');
module.exports = {
    getAccountDetailsByAuthorization
}

function getAccountDetailsByAuthorization(req) {
    const secret = '4ukI0uIVnB3iI1yxj646fVXSE3ZVk4doZgz6fTbNg7jO41EAtl20J5F7Trtwe7OM';
    let token = req.headers.authorization;
    return (token ? Promise.resolve() : _tokenUnauthorized())
        .then(_=> _verifyToken(token , secret));
    
}

function _verifyToken(token, secret) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, function (err, decoded) {
            if (err) {
                reject(_tokenUnauthorized());
            } else {
                resolve(decoded);
            }
        });
    });
}

function _tokenUnauthorized() {
    throw {
        notAuthorizedRequest : true
    }
}