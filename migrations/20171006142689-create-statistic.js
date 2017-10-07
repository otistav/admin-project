'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Statistics', {
      uuid: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      user_id: {
        type: Sequelize.UUID,
        references: {
          model: 'Users',
          key: 'uuid'
        },
        unique: 'actions_unique'
      },
      date: {
        type: Sequelize.STRING,
        unique: 'actions_unique'
      },
      token_refresh_count: {
        type: Sequelize.INTEGER
      },
      social_network_auth_count: {
        type: Sequelize.INTEGER
      },
      basic_auth_counter: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    },
      {
        uniqueKeys: {
          actions_unique: {
            fields: ['user_id', 'date']
          }
        }
      }
      );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Statistics');
  }
};