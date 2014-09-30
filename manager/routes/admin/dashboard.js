// ==== Common
var common = require(process.env.COMMON);

// Logger
var log = common.Logger('router_admin_dashboard');

// Requirements
log('Load Requirements');

log('Init Router');
var router = common.Modules.express.Router();
router.route('/')
.get(function (req, res) {
  res.render('modules/admin/dashboard/index');
});

module.exports = router;