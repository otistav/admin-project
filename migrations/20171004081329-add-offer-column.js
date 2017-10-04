'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Offers', 'сost', {type: Sequelize.STRING})
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Offers', 'sum')
  }
};

