'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    role_id: DataTypes.UUID,
    username: {
        type:DataTypes.STRING,
        unique: true
    },
    password: DataTypes.STRING,
    first_name: DataTypes.STRING,
    second_name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  User.associate = (models) => {
    User.belongsTo(models.Role, {foreignKey: 'role_id'});
    User.belongsToMany(models.Offer, {through: models.Deal, as: 'offers', foreignKey: 'customer_id'});
    User.hasMany(models.Score, {foreignKey: 'user_id', as: 'scores'});
    User.hasMany(models.Deal, {foreignKey: 'customer_id', as: 'deals'});
  };
  return User;
};
