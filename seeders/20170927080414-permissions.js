'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Permissions', [
      {
        uuid: 'A0EEBC99-9C0B-4EF8-BB6D-6BB9BD380C41',
        permission_name: 'Users',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        uuid: 'A0EABC99-9C0B-4EF8-BB6D-6BB9BD380C41',
        permission_name: 'Home Page',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
