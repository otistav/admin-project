'use strict';
module.exports = (sequelize, DataTypes) => {
  var Role = sequelize.define('Role', {
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    role_name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }

  });
  Role.associate = (models) => {
    console.log("ASSOCIATION");
    Role.belongsToMany(models.Permission, {through: models.RolePermission, as: 'permissions', foreignKey: 'role_id'});

  };
  return Role;
};