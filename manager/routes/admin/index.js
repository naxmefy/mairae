// app = manager
module.exports = function (app) {
  var common = app.get('common');
  app.use(common.Middlewares.auth.isAdmin);

  app.use('/admin', require('./dashboard'));
};