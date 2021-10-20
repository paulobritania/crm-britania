'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('workflow_fan', 'directorship_description', {
      type: Sequelize.STRING(70),
      allowNull: true
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('workflow_fan', 'directorship_description')
  }
};
