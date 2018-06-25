'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const date = new Date();
    return queryInterface.bulkInsert('Users', [
      {name: 'John', email: 'test1@email.com', password: '1234', createdAt: date, updatedAt: date},
      {name: 'Doe', email: 'test2@email.com', password: 'zaqwsx', createdAt: date, updatedAt: date},
      {name: 'Jane', email: 'test3@email.com', password: 'zaq123', createdAt: date, updatedAt: date}
    ], {});
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
