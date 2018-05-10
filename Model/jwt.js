const mongoose = require('mongoose');
const jwtSchema = mongoose.Schema({
 jwt : String,
 user_id : {type : mongoose.Schema.Types.ObjectId, ref: 'User'},
 is_active : {type: Boolean, default : false }
 });

const Jwt = mongoose.model('Jwt', jwtSchema, 'jwt');

module.exports = Jwt;
