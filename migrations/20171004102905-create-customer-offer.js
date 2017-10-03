'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('CustomerOffers', {
      uuid: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      customer_id: {
        type: Sequelize.UUID,
        references: {
          model: 'Users',
          key: 'uuid'
        }
      },
      offer_id: {
        type: Sequelize.UUID,
        references: {
          model: 'Offers',
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
    return queryInterface.dropTable('CustomerOffers');
  }
};