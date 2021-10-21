'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('workflow_performed_responses ', 'justification', {
      type: Sequelize.STRING(100),
      allowNull: true
    })
  },

  down: async (queryInterface) => {
    return queryInterface.removeColumn('workflow_performed_responses ', 'justification')
  }
};
