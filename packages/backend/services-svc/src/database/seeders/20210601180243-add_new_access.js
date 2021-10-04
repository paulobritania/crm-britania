'use strict';

const options = [
  {
    name: 'FAN',
    alias: 'FAN'
  }
]
const created_at = new Date().toISOString()
const data = options.map(item => {
  return {
    name: item.name,
    alias: item.alias,
    created_at
  }
})

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('accesses', data)
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('accesses', data, {});
  }
};
