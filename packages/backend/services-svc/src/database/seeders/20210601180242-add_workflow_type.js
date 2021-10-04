'use strict';

const options = [
  {
    code: 'ANV',
    description: 'Autorização de Negociação de Verba'
  },
]

const created_at = new Date().toISOString()
const data = options.map(item => {
  return {
    code: item.code,
    description: item.description,
    created_at
  }
})


module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('workflow_types', data)
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('workflow_types', data, {});
  }
};
