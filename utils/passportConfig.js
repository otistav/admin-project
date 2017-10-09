const passport = require('passport');
const VKontakteStrategy = require('passport-vkontakte').Strategy;
var db = require('../models');

exports.vk = new VKontakteStrategy(
  {
    clientID:     5962155,
    clientSecret: 'odrOpREdhdb5bE8tSfhE',
    scope:  'email',
    callbackURL: 'http://localhost:3000/vk_auth/callback'

  },
  (accessToken, refreshToken, params, profile, done) => {
    console.log(profile, "PROFIIILE");
    db.User.findOne({where: {username: 'Sam'}}).then(user => {
      console.log("THIS IS USER", user);
      done(null, user.uuid);
    })
  }
);