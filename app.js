const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const boolParser = require('express-query-boolean');
const validator = require('express-validator');
const passport = require('passport');
const session = require('express-session');

const HTTPError = require('./errors/HTTPError');
const passportConfig = require('./utils/passportConfig');
const db = require('./models/index');

// routes
const purchase = require('./routes/purchase');
const offers = require('./routes/offers');
const users = require('./routes/users');
const login = require('./routes/login');
const logout = require('./routes/logout');
const refreshTokens = require('./routes/refresh-tokens');
const roles = require('./routes/roles');
const scores = require('./routes/scores');
const deals = require('./routes/deals');

const app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(boolParser());
app.use(validator());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use('vk', passportConfig.vk);


passport.serializeUser((user, done) => {
  done(null, user);
});
app.use('/refresh-tokens', refreshTokens);
app.use('/users', users);
app.use('/login', login);
app.use('/logout', logout);
app.use('/roles', roles);
app.use('/offers', offers);
app.use('/purchase', purchase);
app.use('/scores', scores);
app.use('/deals', deals);
// app.use('/auth/vkontakte/callback', vkcallback);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  if (err instanceof HTTPError) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    console.log(err.message);
    res.status(err.status);
    res.json(err);
  } else {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  }

});

module.exports = app;