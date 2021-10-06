'use strict';

const options = [
  {
    name: 'Controle de Usuário',
    alias: 'CONTROLE_DE_USUARIO'
  },
  {
    name: 'Controle de Perfil',
    alias: 'CONTROLE_DE_PERFIL'
  },
  {
    name: 'Mural de Recados',
    alias: 'MURAL_DE_RECADOS'
  },
  {
    name: 'Imagem do Login',
    alias: 'IMAGEM_DO_LOGIN'
  },
  {
    name: 'Painel de Workflow',
    alias: 'PAINEL_DE_WORKFLOW'
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
    return queryInterface.bulkInsert('accesses', data, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('accesses', data, {});
  }
};
