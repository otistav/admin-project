'use strict';
module.exports = (sequelize, DataTypes) => {
  var Settings = sequelize.define('Settings', {
    key: DataTypes.STRING,
    value: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Settings;
};