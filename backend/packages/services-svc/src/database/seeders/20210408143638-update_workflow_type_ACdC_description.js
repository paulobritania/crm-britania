'use strict';

const code = 'ACdC'
const oldACdC = { description : 'Alteração de Cadastro de Cliente' }
const updatedACdC =  { description : 'Atualização de Cadastro de Cliente' }

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkUpdate('workflow_types', updatedACdC, { code });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkUpdate('workflow_types', oldACdC, { code });
  }
};
