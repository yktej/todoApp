const passport = require('passport');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const userModel = require('../models/UserModel');



const LocalStrategy = require('passport-local').Strategy;
passport.use('local-signin', new LocalStrategy({
  usernameField: 'username',
  passportField: 'password'/*,
  passReqToCallback:true*/
}, function (username, password, done) {

  userModel.findOne({ username: username }, (err, user) => {

    if (err)
      return done(err);
    if (!user)
      return done({ msg: 'User doesn\'t exist' }, false);


    if (!user.isPasswordValid(password)) {
      return done({ msg: 'Invalid user credentials' }, false);
    }

    console.log(user instanceof mongoose.Document);
 
    user = user.toObject();
    console.log(user instanceof mongoose.Document);

    //delete user.password;

    const token = jwt.sign({ id: user.username }, 'jwtSecret');
    user.token = token;
    return done(null, user);
  })/*.lean();*/

}));


passport.use('local-signup', new LocalStrategy({
  usernameField: 'username',
  passportField: 'password',
  passReqToCallback: true

},
  function (req, username, password, done) {


    userModel.findOne({ username: username }, (err, user) => {

      if (err)
        return done(err);

      if (user)
        return done({ status: 'error', msg: 'oops!user already exists' }, false);

      let newUser = new userModel();
      newUser.username = username;
      newUser.password = newUser.generateHash(password);
      newUser.firstName = username;
      newUser.lastName = username;

      //initialise todos
      newUser.todos =[];


      newUser.save((err) => {

        if (err)
          throw err;
        else
          return done(null, newUser);

      });



    }).lean();


  }));


const JWTstrategy = require('passport-jwt').Strategy,
  ExtractJWT = require('passport-jwt').ExtractJwt;
const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
  secretOrKey: 'jwtSecret',
  passReqToCallback: true
}
passport.use('jwt', new JWTstrategy(opts, (req, jwt_payload, done) => {

  // userModel.findOne({username:jwt_payload.id},(err,user) => {

  console.log('inside jwt authentication ');
  done(null,jwt_payload.id);
  


  //});
  


  }));

module.exports = passport;

/*
exports.authenticateUser = (req,res,next) => {
  passport.authenticate('jwt',{session:false},(err,user,info) => {

  if(err){
      console.log(err);
      res.send(err);
  }else{
      res.status(200).send(user);
  }


})(req,res,next)
}
*/

