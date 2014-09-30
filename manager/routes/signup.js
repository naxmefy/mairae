// ==== Common
var common = require(process.env.COMMON);

// Logger
var log = common.Logger('router_signup');

// Requirements
log('Load Requirements');
var passport = common.Modules.passport;

log('Init Router');
var router = common.Modules.express.Router();
router.route('/signup')
.get(function (req, res) {
  res.render('modules/sign/up', {message: req.flash('danger')});
})
.post(function(req,res){ // , next
  if(!req.body.name || !req.body.email || !req.body.password) {
    req.flash('danger', 'Missing credentials');
    res.redirect('/signup')
  } else {
    var User = common.Models.user;
    var user = new User(req.body);
    user.save(function (err) {
      if(err) {
        req.flash('danger', 'Email already in use.');
        res.redirect('/signup')
      } else {
        req.logIn(user, function(err) {
          if(err) { 
            return next(err); 
          }
          req.flash('info', 'Welcome ' + req.body.name);
          return res.redirect('/');

        });
      }
    });
  }
});

module.exports = router;