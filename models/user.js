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
    password: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  User.associate = (models) => {
    User.belongsTo(models.Role, {foreignKey: 'role_id'});
    User.belongsToMany(models.Offer, {through: models.CustomerOffer, as: 'offers', foreignKey: 'customer_id'})
  };
  return User;
};