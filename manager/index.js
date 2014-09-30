// ==== Manager
module.exports = function(common) {
  // Logger
  var log = common.Logger('manager');
  // Requirements
  log('Load Requirements');

  // Database Service
  var db = common.Services.Database;
  db(common.Config, function (err) {
    if(err) {
      log(err);
    }
    log("Successfully connected to mongo");
  });
  
  // App
  log('Init Manager');
  var manager = common.Modules.express();
  manager.disable('x-powered-by');
  manager.set('common', common);

  // Config
  manager.set('views', common.Modules.path.join(__dirname, 'views'));
  manager.set('view engine', 'jade');
  manager.use(common.Modules.bodyParser.json());
  manager.use(common.Modules.bodyParser.urlencoded({
    'extended': true
  }));

  manager.use(common.Modules.cookieParser());
  manager.use(common.Modules.methodOverride());

  // Passport Config
  require('./config/passport');

  var connectMongo = common.Modules.mongoStore(common.Modules.session);
  manager.use(common.Modules.session({
    secret: common.Config.security.secret,
    store: new connectMongo({
      db: db().connection.db
    })
  }));

  manager.use(common.Modules.passport.initialize());
  manager.use(common.Modules.passport.session());
  manager.use(common.Modules.flash());

  manager.use(common.Modules.favicon(common.Modules.path.join(__dirname, 'public/img/favicon.ico')));

  manager.use(common.Modules.express.static(common.Modules.path.join(__dirname, 'public')));

  log('Use Request Logger');
  manager.use(common.Modules.morgan('dev'));

  if (process.env.NODE_ENV == 'development') {
    log('Setup LiveReload');
    var livereload = common.Modules.livereload;
    var livereloadconfig = {};
    livereloadconfig.watchDir = common.Modules.path.join(__dirname, 'views');
    livereload(manager, livereloadconfig);
  }

  // Routes
  require('./routes')(manager);

  // catch 404 and forward to error handler
  manager.use(function(req, res, next) {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
  });

  // error handlers

  // development error handler
  // will print stacktrace
  if (manager.get('env') === 'development') {
      manager.use(function(err, req, res, next) {
          res.status(err.status || 500);
          res.render('error', {
              message: err.message,
              error: err
          });
      });
  }

  // production error handler
  // no stacktraces leaked to user
  manager.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
          message: err.message
      });
  });
  
  return manager;
};