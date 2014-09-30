// app = manager
module.exports = function (app) {
  var common = app.get('common');
  app.use('/admin', common.Middlewares.auth.isAdmin);

  app.use('/admin', function(req, res, next) {
    res.locals.message = req.flash('info');
    res.locals.error = req.flash('error');
    next();
  });

  app.use('/admin', require('./dashboard'));
  app.use('/admin', require('./users'));


  // catch 404 and forward to error handler
  app.use('/admin*', function(req, res, next) {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
  });

  // error handlers

  // development error handler
  // will print stacktrace
  if (app.get('env') === 'development') {
      app.use('/admin*', function(err, req, res, next) {
          res.status(err.status || 500);
          res.render('modules/admin/error', {
              message: err.message,
              error: err
          });
      });
  }

  // production error handler
  // no stacktraces leaked to user
  app.use('/admin*', function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('modules/admin/error', {
          message: err.message,
          error: {}
      });
  });
};