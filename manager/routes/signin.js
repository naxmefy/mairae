// ==== Common
var common = require(process.env.COMMON);

// Logger
var log = common.Logger('router_signin');

// Requirements
log('Load Requirements');
var passport = common.Modules.passport;


log('Init Router');
var router = common.Modules.express.Router();
router.route('/signin')
.get(function (req, res) {
  res.render('modules/sign/in', { message: req.flash('danger') });
})
.post(function(req, res, next){
  passport.authenticate('local-login', 
    function(err, user, info){
      if(err) { 
        return next(err);
      }
      if(!user) { 
        req.flash('danger', info.message);
        return res.redirect('/signin');
      }
      req.logIn(user, function(err) {
        if(err) { 
          return next(err); 
        }
        return res.redirect('/');

      });
    })(req, res, next);
});

module.exports = router;