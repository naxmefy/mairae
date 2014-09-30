var log = require('../Logger')('middleware_auth');
exports.loggedIn = function(req, res, next) {
  log(req.isAuthenticated());
  if (req.isAuthenticated()) { 
    return next(); 
  }
  res.redirect('/signin')
};

exports.userData = function(req, res, next) {
  if(req.user) {
    res.locals.user = {};
    res.locals.user.name = req.user.name;
    res.locals.user.email = req.user.email;
    res.locals.user.id = req.user._id;
    res.locals.user.admin = req.user.admin;
  }

  next();
}

exports.isAdmin = function(req, res, next) {
  if(req.user && req.user.admin) {
    return next();
  }
  res.status(401).render('error', {message: 'Unauthorized'});
};