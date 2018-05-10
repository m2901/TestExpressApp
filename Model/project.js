const mongoose = require('mongoose');
const projectSchema = mongoose.Schema({
 project_name : String,
 is_active : {type: Boolean, default : true }
 });

const Project = mongoose.model('Project', projectSchema, 'project');

module.exports = Project;
