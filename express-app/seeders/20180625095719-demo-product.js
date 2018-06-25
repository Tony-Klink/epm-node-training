'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const date = new Date();
    return queryInterface.bulkInsert('Products', [
      {name: 'product 1', description: 'some product', reviews: 'good product', createdAt: date, updatedAt: date},
      {name: 'product 2', description: 'another product', reviews: 'bad product', createdAt: date, updatedAt: date}
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
    return queryInterface.bulkDelete('Products', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
