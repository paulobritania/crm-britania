'use strict';

const options = [
  {
    description: '% Crescimento',
    alias: 'GROWTH'
  },
  {
    description: '% Devolução',
    alias: 'DEVOLUTION'
  },
  {
    description: '% Introdução de Produto',
    alias: 'PRODUCT_INTRODUCTION'
  },
  {
    description: 'Condição de pagamento',
    alias: 'PAYMENT_TERMS'
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
    return queryInterface.bulkInsert('ranking_indicators', data, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ranking_indicators', data, {});
  }
};
