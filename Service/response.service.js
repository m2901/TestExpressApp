const _ = require('lodash');    
module.exports = {
    sendValidationErrorsIfAny,
    sendBadRequest,
    sendSuccess,
    sendError
}

function sendBadRequest(res, details = {}) {
    res.status(400).send({
        message: details.message || 'Bad Request'
    });
}

function sendSuccess(res, data = {}) {
    res.status(200).send({
        message : data.message || 'success',
        details : data 
    });
}

function sendError(res, err = {}) {
    res.status(500).send({
        message : err.message || 'something went wrong',
        details : err
    })
}
function sendValidationErrorsIfAny(req,res) {
    let messages = [];
    return req.getValidationResult()
        .then(result => {
        if (!result.isEmpty()) {
            const errorObject = result.mapped();
            messages = _.map(errorObject, (value) => value.msg);
        }
        if (_.size(messages) > 0) {
            sendBadRequest(res, {
                message: messages
            });
            return 1;
        } else {
            return 0;
        }
    });
}