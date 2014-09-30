// app = manager
module.exports = function (app) {
  var common = app.get('common');
  app.use(common.Middlewares.auth.userData);
  app.use(require('./signin'));
  app.use(require('./signup'));
  app.use(require('./signout'));
  app.use(require('./dashboard'));
};