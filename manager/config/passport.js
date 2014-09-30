var common = require(process.env.COMMON);
var log = common.Logger('manager_config_passport');

log('Init passport config');
var passport = common.Modules.passport;
var LocalStrategy = common.Modules.passportLocal.Strategy;
var User = common.Models.user;
  
passport.serializeUser(function(user, done){
  log("serializeUser");
  log(user);
  done(null, user.id);
});
passport.deserializeUser(function(id, done){
  log("deserializeUser");
  log(id);
  User.findById(id, function(err, user){
    log(user);
    done(err, user);
  });
});
// local strategies
passport.use('local-signup',
  new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, email, password, done) {
    process.nextTick(function(){
      User.findOne({ 'email' : email }, function(err, user) {
        if(err) {
          return done(err);
        }
        if(user) {
          return done(null, false, {message:'That email is already taken.'});
        } else {
          var newUser = new User();
          newUser.local.email=email;
          newUser.local.password=password;
          newUser.save(function(err){
            if(err) {
              throw err;
            }
            return done(null, newUser, {message:'Successfully registered. Please log in'});
          })
        }
      });
    });
}));
passport.use('local-login',
  new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  },
  function(req, email, password, done) {
    log('Local-Login');
    User.findOne({'email': email}, function(err,user) {
      if(err){
        return done(err);
      }
      if(user){
        user.validPassword(password, function(err, result){
          if(result){
            done(null, user);
          }else{ // bad password.
            done(null, false, {message:'login failed: wrong password'});
          }
        });
      }else{ // user does not exist
        done(null, false, {message:'login failed: wrong email'});
      }
    });
}));