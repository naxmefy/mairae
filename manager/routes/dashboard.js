// ==== Common
var common = require(process.env.COMMON);

// Logger
var log = common.Logger('router_dashboard');

// Requirements
log('Load Requirements');

log('Init Router');
var router = common.Modules.express.Router();
router.route('/')
.all(common.Middlewares.auth.loggedIn)
.get(function (req, res) {
  res.render('modules/dashboard/index');
});

module.exports = router;