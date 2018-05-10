const ValidationMessageService = require('../Service/validationMessage.service.js');
const ResponseService = require('../Service/response.service.js');
const ProjectService = require('../Service/project.service.js');
const CipherService = require('../Service/cipher.service.js');

module.exports = {
    createProject
};

function createProject(req, res) {
    const projectDetails = {
        projectName : req.body.project_name
    };
    _validate(req,res)
        .then(_=> CipherService.getAccountDetailsByAuthorization(req))
        .then(userDetails => ProjectService.createProject(userDetails, projectDetails))
        .then(details => _sendSuccess(res, details))
        .catch(err => _sendError(res,err));
    
    function _validate(req, res) {
        const _validations = {
            'project_name': {
                notEmpty: true,
                errorMessage : ValidationMessageService.isEmpty('projectName')
            }
        };
        req.checkBody(_validations);
        return _sendValidationErrors(req,res);
    }
}

function _sendValidationErrors(req, res) {
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