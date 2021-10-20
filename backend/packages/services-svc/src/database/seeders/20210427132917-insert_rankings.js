'use strict';

const options = [
  {
    description: 'Diamante',
    alias: 'DIAMOND'
  },
  {
    description: 'Ouro',
    alias: 'GOLD'
  },
  {
    description: 'Prata',
    alias: 'SILVER'
  },
  {
    description: 'Bronze',
    alias: 'BRONZE'
  }
]

const data = options.map(item => {
  return {
    description: item.description,
    alias: item.alias
  }
})

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('rankings', data, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('rankings', data, {});
  }
};
