
var db = require('../models/index');
var hashThePassword = require('../utils/passwordHash');

exports.editUserFields = (id, password, login) => {
  return db.sequelize.transaction(t => {
    return db.User.findById(id, {transaction: t})
      .then(user => {
        if (!user) throw new Error();
        user.username = login;
        user.password = hashThePassword.cryptoThePassword(password);
        return user.save({transaction: t});
      })
      .then((user) => {
        return db.RefreshToken.destroy({where: {user_id: user.uuid}, transaction: t})
      })
  })
};


exports.createUser = (username, hashPass, role_id) => {
  return db.User.create({
    username: username,
    password: hashPass,
    role_id: role_id
  })
};