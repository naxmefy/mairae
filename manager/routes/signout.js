// ==== Common
var common = require(process.env.COMMON);

// Logger
var log = common.Logger('router_signout');

// Requirements
log('Load Requirements');



log('Init Router');
var router = common.Modules.express.Router();
router.route('/signout')
.get(function (req, res) {
  req.logout();
  res.redirect('/signin');
});

module.exports = router;