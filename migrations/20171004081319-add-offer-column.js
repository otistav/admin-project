'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Offers', 'sum', {type: Sequelize.STRING})
  },

  down: (queryInterface, Sequelize) => {
    
  }
};
