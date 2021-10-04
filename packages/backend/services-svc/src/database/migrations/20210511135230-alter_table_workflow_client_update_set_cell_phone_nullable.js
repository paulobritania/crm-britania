'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('workflow_client_update', 'cell_phone', {
      allowNull: true,
      type: Sequelize.STRING(11)
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('workflow_client_update', 'cell_phone', {
      allowNull: false,
      type: Sequelize.STRING(11)
    })
  }
};
