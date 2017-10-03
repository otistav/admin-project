const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const db = require('./models/index');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const validator = require('express-validator');
const roles = require('./routes/roles');
const HTTPError = require('./errors/HTTPError');
const passport = require('passport');
const VKontakteStrategy = require('passport-vkontakte').Strategy;
const log = require('./logger');
const jwt = require('jsonwebtoken');
const fs = require('fs');
console.log(path);


//TODO Навести порядок в этом файле. Вынести в отдельные файлы весь мусор
const purchase = require('./routes/purchase');
const offers = require('./routes/offers');
const users = require('./routes/users');
const login = require('./routes/login');
const logout = require('./routes/logout');
const refreshTokens = require('./routes/refresh-tokens');

const app = express();

const session = require('express-session');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
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
passport.use('vk', new VKontakteStrategy(
  {
    clientID:     5962155,
    clientSecret: 'odrOpREdhdb5bE8tSfhE',
    scope:  'email',
    callbackURL: 'http://localhost:3000/auth/vkontakte/callback'

  },
   (accessToken, refreshToken, params, profile, done) => {
    console.log(profile);
     db.User.findOne({where: {username: 'Sam'}}).then(user => {
       console.log("THIS IS USER", user);
       done(null, user.uuid);
     })
  }
));

app.get('/auth/vkontakte',passport.authenticate('vk', {
  successRedirect: 'http://localhost:3000/success',
  failureRedirect: '/'
}));

app.get('/auth/vkontakte/callback', passport.authenticate('vk', {
  successRedirect: 'http://localhost:3000/success',
  failureRedirect: '/'
  })
);

app.get('/success', (req, res, next) => {

  res.cookie('accessss',jwt.sign({}, 'adsfasd'));
  console.log(res.cookie, 'this is access');
  res.render(__dirname + 'index.html');
});


app.get('/img', (req, res, next) => {
  db.Offer.findOne({where: {uuid: '25dd4bec-716f-47a1-9c9a-588f5524ce97'}}).then(offer => {
    res.redirect(offer.image)
  })
});

app.get('/', function(req, res) {
  //Here you have an access to req.user
  res.json(req.session);
});
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