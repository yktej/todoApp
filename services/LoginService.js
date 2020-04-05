
let userModel = require('../models/UserModel');

//const passport = require('../configuration/passport');
const passport = require('passport');

exports.authenticateUser = (user,callback) => {

   /* userModel.findOne({uname:user.uname}).lean().exec((err,data) => {
        if(err || !data){	
            callback({status:'failure',msg:'username/password is incorrect'});
        }else{					    	
            if(data.uname==user.uname && data.pwd==user.pwd){
                callback({status:'success',user:data});
            }else {
                callback({status:'failure',msg:'password is not correct'});
            }
        }
    }) */

    
    passport.authenticate('local-signin', (err,user,info) => {

        if(user){
            callback({status:'success',user:user});
        }else{
            callback({status:'failure',msg:'password is not correct'});
        }

    });
}








module.exports = exports;