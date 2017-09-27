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
    //TODO изменить ассоциацию здесь
    Role.belongsToMany(models.Permission, {as: 'Permissions', foreignKey: 'role_id', through: {model: models.RolePermission}});
  };
  return Role;
};