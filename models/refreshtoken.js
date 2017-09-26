'use strict';
module.exports = (sequelize, DataTypes) => {
  var RefreshToken = sequelize.define('RefreshToken', {
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    refresh_token: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    user_id: DataTypes.UUID
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return RefreshToken;
};