'use strict';
module.exports = (sequelize, DataTypes) => {
  var Score = sequelize.define('Score', {
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    value: DataTypes.INTEGER,
    game_id: {
      type: DataTypes.UUID
    },
    user_id: {
      type: DataTypes.UUID
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  Score.associate = (models) => {
    Score.belongsTo(models.Game, {foreignKey: 'game_id'});
    Score.belongsTo(models.User, {foreignKey: 'user_id'});
  };
  return Score;
};