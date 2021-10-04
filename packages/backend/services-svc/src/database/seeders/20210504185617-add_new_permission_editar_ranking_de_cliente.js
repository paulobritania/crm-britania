'use strict';

const options = [
  {
    name: 'Editar Ranking de Cliente',
    alias: 'EDITAR_RANKING_DE_CLIENTE'
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
    return queryInterface.bulkInsert('permissions', data, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('permissions', data, {});
  }
};
