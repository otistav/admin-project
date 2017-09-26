'use strict';
module.exports = (sequelize, DataTypes) => {
  var Permission = sequelize.define('Permission', {
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    permission_name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Permission;
};