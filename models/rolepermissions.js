'use strict';
module.exports = (sequelize, DataTypes) => {
  var RolePermission = sequelize.define('RolePermission', {
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    role_id: DataTypes.UUID,
    permission_id: DataTypes.UUID
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  RolePermission.associate = (models) => {
    console.log("ASSOCIATION");
    // RolePermission.hasMany(models.Role, {foreignKey: 'uuid'} );
    // RolePermission.hasMany(models.Permission, {foreignKey: 'uuid'});

  };
  return RolePermission;
};