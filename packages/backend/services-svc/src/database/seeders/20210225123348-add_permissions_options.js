'use strict';

const options = [
  {
    name: 'Aprovar',
    alias: 'APROVAR'
  },
  {
    name: 'Reprovar',
    alias: 'REPROVAR'
  },
  {
    name: 'Editar',
    alias: 'EDITAR'
  },
  {
    name: 'Importação em Massa',
    alias: 'IMPORTACAO_EM_MASSA'
  },
  {
    name: 'Acesso a informação Confidencial',
    alias: 'ACESSO_A_INFORMACAO_CONFIDENCIAL'
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
