'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      name: 'John Doe',
      username: 'testuser',
      integrated_ad: false,
      email: 'johndoe@test-only.com',
      customer_hierarchy_enabled: false,
      is_active: true,
      created_at: new Date().toISOString(),
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
