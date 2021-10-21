'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('workflow_client_update', 'commercial_phone', {
      type: Sequelize.STRING(11),
      allowNull: false
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('workflow_client_update', 'commercial_phone', {
      type: Sequelize.STRING(10),
      allowNull: false
    })
  }
};
