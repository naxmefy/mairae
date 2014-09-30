// ==== Common
var common = require(process.env.COMMON);

// Logger
var log = common.Logger('router_account');

// Requirements
log('Load Requirements');


log('Init Router');
var router = common.Modules.express.Router();

router.use(common.Middlewares.auth.loggedIn);

router.route('/account')
.get(function (req, res) {
  res.render('modules/account/index', {message:req.flash('info'), error: req.flash('error')});
})
.post(function (req, res) {
  common.Models.user.findOne({_id:req.user._id}, function(err, user) {
    log(user);
    log(req.body);
    user.name = req.body.name;
    user.email = req.body.email;
    if(req.body.password.length >= 8) {
      if(req.body.password === req.body.passwordrepeat) {
        user.password = req.body.password;
      } else {
        req.flash('error', 'password are not identical');
        return res.redirect('/account');
      }
    } else if(req.body.password.length > 0 && req.body.password.length < 8) {
      req.flash('error', 'password to short (min. 8 characters)');
        return res.redirect('/account');
    }

    log(user);
    user.save(function (err) {
      if(err) {
        return res.render('error', {message: err});
      }
      req.flash('info', 'User updated');
      res.redirect('/account');
    });
  });
});

module.exports = router;