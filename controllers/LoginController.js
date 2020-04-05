const passport = require('passport');


exports.authenticateUser = (req,res,next) => {
  let user ={
      uname:req.body.uname,
      pwd:req.body.pwd
  }

  /*  loginService.authenticateUser(user,loginResponse => {

        if(loginResponse.status=='success'){
           req.session.user = loginResponse.user;
          return res.json(loginResponse);
        }else{
            res.json({status:'failure'})

        }
    });*/

 

    passport.authenticate('local-signin', (err,user,info) => {

      console.log('inside passport auth');

      if(user){
        return res.json({status:'success',token:user.token});
      }
      else 

      return res.json({status:'failure',msg:'Invalid User Credentials'});
      /*if(user){
          callback({status:'success',user:user});
      }else{
          callback({status:'failure',msg:'password is not correct'});
      }*/

  })(req,res,next);
  
}


exports.logout = (req,res,next) => {
  console.log('logout');
  req.session.user = undefined;
  return res.json('user logged out');
  
}




exports.registerUser = (req,res,next) => {

  passport.authenticate('local-signup',(err,user,info) => {

    console.log('inside passport auth');

      if(user){
        return res.json({status:'success'});
      }
      else 

      return res.json({status:'failure',msg:err.msg});


  })(req,res,next);


}

module.exports = exports;