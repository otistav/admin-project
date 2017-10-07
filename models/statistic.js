'use strict';
module.exports = (sequelize, DataTypes) => {
  var Statistic = sequelize.define('Statistic', {
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    user_id: {
      type: DataTypes.UUID,
      unique: 'hello'
    },
    date: {
      type: DataTypes.STRING,
      unique: 'hello'
    },
    token_refresh_count: DataTypes.INTEGER,
    social_network_auth_count: DataTypes.INTEGER,
    basic_auth_counter: DataTypes.INTEGER
  },
    {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Statistic;
};