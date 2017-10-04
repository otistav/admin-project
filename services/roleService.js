var db = require('../models/index');


//TODO добавить обработчики ошибок


createRolePermissionsArray = (permissionsArray, role_id) => {
  let result = [];
  for (let i = 0; i < permissionsArray.length; i++) {
    result[i] = {role_id: role_id, permission_id: permissionsArray[i]}
  }
  return result
};


exports.createRole = (role_name, permissions) => {
  return db.sequelize.transaction(t => {
    return db.Role.create({role_name: role_name}, {transaction: t})
      .then( role => {
        console.log("THIS IS ROLE", role);
        loggerr.debug(role);
        const rolePermissions = createRolePermissionsArray(permissions, role.uuid);
        return db.RolePermission.bulkCreate(rolePermissions, {transaction: t})
      })
  })
};


exports.updateRole = (role_name, new_permissions, role_id) => {

  return db.sequelize.transaction(t => {
    return db.Role.findById(role_id, {transaction: t})
      .then(role => {
        console.log("THIS IS ROLE +>>>>>>>>>>", role);
        role.role_name = role_name;
        return role.save();
      })
      .then(role => {
        console.log("THIS IS ROLE UUID", role.uuid);
        return db.RolePermission.destroy({where: {role_id: role.uuid}}, {transaction: t})
          .then(() => {
            const rolePermissions = createRolePermissionsArray(new_permissions, role.uuid);
            return db.RolePermission.bulkCreate(rolePermissions, {transaction: t})
          })

    })
  })
};


exports.deleteRole = (role_id) => {
  return db.sequelize.transaction(t => {
    return db.User.findOne({where: {role_id: role_id}, transaction: t})
      .then(user => {
        if (user) throw new Error();
        return db.RolePermission.destroy({where : {role_id: role_id}, transaction: t})
      })
      .then(() => {
        return db.Role.findById(role_id, {transaction: t})
      })
      .then((role) => {
        return role.destroy({transaction: t})
      })
  })
};