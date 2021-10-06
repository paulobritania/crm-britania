'use strict';

const options = [
  {
    name: 'Incluir',
    alias: 'INCLUIR'
  },
  {
    name: 'Excluir',
    alias: 'EXCLUIR'
  },
  {
    name: 'Inativar',
    alias: 'INATIVAR'
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
