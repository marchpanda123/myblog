var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');

//use passport
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
//config file
var config = require('./config');
//conecting mongodb
var mongoose = require('mongoose');
mongoose.connect(config.mongoUrl);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");
});
/*app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');*/

//app starts
var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));
app.use(cookieParser());
//module require
var User = require('./app/models/user.js');
var Article = require('./app/models/article.js');
var TimeCheck = require('./app/models/timecheck.js');
var Carousel = require('./app/models/carousel.js');
//passport config
app.use(passport.initialize());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// static files
app.use(express.static(__dirname +'/public'));
//router require
var users = require('./app/routers/users.js');
var routes = require('./app/routers/index.js');
//router use
app.use('/', routes);
app.use('/users', users);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});
//listen in the port 8080
var port = process.env.PORT || 8080;
app.listen(port);
console.log('We will see on port ' + port);