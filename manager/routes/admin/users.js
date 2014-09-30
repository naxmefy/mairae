// ==== Common
var common = require(process.env.COMMON);

// Logger
var log = common.Logger('router_admin_users');

// Requirements
log('Load Requirements');

log('Init Router');
var router = common.Modules.express.Router();
router.route('/users')
.get(function (req, res, next) {
  common.Models.user.find({}, function (err, users) {
    if(err) {
      return next(err);
    }

    res.render('modules/admin/users/index', {users: users});
  });
})
.post(function (req, res) {
  
  if(req.body.password.length < 8) {
    req.flash('error', 'password to short (min. 8 characters)');
    return res.redirect('/admin/users/new');
  }
  log(req.body);
  if(req.body.password !== req.body.passwordrepeat) {
    req.flash('error', 'password are not identical');
    return res.redirect('/admin/users/new');
  }

  var user = common.Models.user({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    admin: req.body.admin?true:false
  });

  user.save(function (err) {
    if(err) {
      req.flash('error', err);
      return res.redirect('/admin/users/new');
    }
    req.flash('info', 'User '+user.name+' created');
    res.redirect('/admin/users');
  });
});

router.route('/users/new')
.get(function (req, res) {
  res.render('modules/admin/users/new');
});

router.param('id', function (req, res, next, id) {
  common.Models.user.loadById(id, function(err, user){
    if (err) {
      return next(err);
    }
    else if (!user) {
      return next(new Error('failed to load user'));
    }

    req.editableUser = user;
    next();
  });
});

router.route('/users/:id')
.get(function (req, res) {
  res.render('modules/admin/users/edit', {editableUser: req.editableUser});
})
.post(function (req, res) {
  var user = req.editableUser;
  user.name = req.body.name;
  user.email = req.body.email;
  user.admin = req.body.admin?true:false;
  if(req.body.password.length >= 8) {
    if(req.body.password === req.body.passwordrepeat) {
      user.password = req.body.password;
    } else {
      req.flash('error', 'password are not identical');
      return res.redirect('/admin/users/'+user._id);
    }
  } else if(req.body.password.length > 0 && req.body.password.length < 8) {
    req.flash('error', 'password to short (min. 8 characters)');
      return res.redirect('/admin/users/'+user._id);
  }

  log(user);
  user.save(function (err) {
    if(err) {
      return res.render('modules/admin/error', {message: err});
    }
    req.flash('info', 'User updated');
    res.redirect('/admin/users/'+user._id);
  });
});

router.route('/users/:id/delete')
.get(function (req, res) {
  common.Models.user.remove({_id:req.editableUser._id}, function(err) {
    if(err) {
      return res.render('modules/admin/error', {message: err});
    }

    req.flash('info', 'User deleted');
    res.redirect('/admin/users');
  })
});

module.exports = router;