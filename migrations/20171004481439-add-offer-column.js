'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Offers', 'cost', {type: Sequelize.INTEGER})
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Offers', 'sum')
  }
};

