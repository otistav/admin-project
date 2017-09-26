'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('RolePermissions', {
      uuid: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      role_id: {
        type: Sequelize.UUID,
        references: {
          model: 'Roles',
          key: 'uuid'
        }
      },
      permission_id: {
        type: Sequelize.UUID,
        references: {
          model: 'Permissions',
          key: 'uuid'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('RolePermissions');
  }
};