const mongoose = require('mongoose');
const projectUserSchema = mongoose.Schema({
 user_id : {type : mongoose.Schema.Types.ObjectId, ref: 'User'},
 project_id : {type : mongoose.Schema.Types.ObjectId, ref: 'Project'},
 permission_id : Array
 });

const ProjectUserMapping = mongoose.model('ProjectUserMapping', projectUserSchema, 'projectUserMapping');

module.exports = ProjectUserMapping;
