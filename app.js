var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var config = require('./config/config.js');
var routes = require('./routes/index');

var session = require('express-session');
var connectMongo  = require('connect-mongo')(session);
var passport = require('passport');
var port = process.env.PORT || 8080;
var flash = require('connect-flash');
var env = process.env.NODE_ENV || 'development';

var app = express();

var cors = require('cors');
 
app.use(cors({
    allowedOrigins: [
        'http://localhost:3600/', 'google.com','http://localhost:3001/'
    ]
}))

// error handlers

// development error handler
// will print stacktrace
if (env === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });

  app.use(session({
    secret:config.sessionSecret,
    resave: true,
    saveUninitialized: true
  }));
} else {
  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });

  //production specifc settings
  app.use(session({
    secret:   config.sessionSecret,
    store:    new connectMongo({
      url: config.dbURL,
      mongoose_connection: mongoose.connections[0],
      stringify: true
    }),
    resave: true,
    saveUninitialized: true
  }));
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//
app.set('superSecret', config.sessionSecret);//configure secret from database

app.use(logger('dev'));//user morgan to log requests to the console

app.use(bodyParser.json({parameterLimit: 1000000, limit: '50mb'}));
app.use(bodyParser.urlencoded({parameterLimit: 1000000, limit: '50mb', extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//required for passport
app.use(session({secret: config.sessionSecret})); //session secret
app.use(passport.initialize());
app.use(passport.session()); //persistent login sessions
app.use(flash()); //use connect-flash for flash messages stored in the session
app.use('/', routes);

app.listen(port);
console.log('Magic happens at port ' + port);
