var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');


var config = require('../configuration/config');

var conn2 = mongoose.createConnection(config.dbUrl);
var Schema = mongoose.Schema; // <-- EDIT: missing in the original post
//var ttl= require('mongoose-ttl');
//var schema = new mongoose.Schema({
var schema = new Schema({
	username:{type:String},
	password:{type:String},
	firstName:{type:String},
	lastName:{type:String}
	
});
//schema.plugin(ttl, { ttl: 5000 });


//generate hash
schema.methods.generateHash = (password) => {
	return bcrypt.hashSync(password,bcrypt.genSaltSync(8),null);

}

schema.methods.isPasswordValid = function(password) {
//	return bcrypt.compareSync(password,this.password);
let isPswdValid;
try {
	isPswdValid = bcrypt.compareSync(password,this.password);
	
} catch (error) { //bcrypt throws error on pswd mismatch
	isPswdValid = false;
}
return isPswdValid;
}

module.exports = conn2.model("users", schema,'users');