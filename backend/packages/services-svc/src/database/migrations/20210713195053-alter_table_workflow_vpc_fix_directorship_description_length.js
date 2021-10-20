'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('workflow_vpc ', 'directorship_description', {
      type: Sequelize.STRING(70),
      allowNull: true
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('workflow_vpc ', 'directorship_description', {
      type: Sequelize.STRING(10),
      allowNull: true
    })
  }
};


