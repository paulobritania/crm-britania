'use strict';

const options = [
  {
    name: 'Aberta',
  },
  {
    name: 'Tarefa cadastrada no workflow',
  },
  {
    name: 'Aberta Total',
  },
  {
    name: 'Liquidada Parcial',
  },
  {
    name: 'Liquidado Total',
  }
]
const created_at = new Date().toISOString()
const data = options.map(item => {
  return {
    name: item.name,
    created_at
  }
})

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('workflow_vpc_status', data)
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('workflow_vpc_status', data, {});
  }
};
