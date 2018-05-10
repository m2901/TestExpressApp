const Project = require('../Model/project.js');
const ProjectUserMapping = require('../Model/projectUserMapping.js');
module.exports = {
    createProject
}

function createProject(userDetails, projectDetails) {
    return _insertIntoProject(projectDetails)
        .then(details => _insertIntoProjectUserMapping(userDetails, details));

    function _insertIntoProject(projectDetails) {
        const _projectDetails = new Project({
            project_name : projectDetails.projectName
        });
        return _projectDetails.save();
    }

    function _insertIntoProjectUserMapping(userDetails, projectDetails) {
        const _projectUserMapping = new ProjectUserMapping({
            user_id : userDetails.id,
            project_id : projectDetails.id,
            permission_id : [1,2]
        });
        return _projectUserMapping.save();
    }
}