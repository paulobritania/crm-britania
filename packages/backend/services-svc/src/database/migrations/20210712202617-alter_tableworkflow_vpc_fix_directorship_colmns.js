'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await  queryInterface.renameColumn('workflow_vpc', 'directorship', 'directorship_description')

    await queryInterface.addColumn('workflow_vpc ', 'directorship_code', {
      type: Sequelize.INTEGER,
      allowNull: true
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('workflow_vpc', 'directorship_description', 'directorship')

    await queryInterface.removeColumn('workflow_vpc ', 'directorship_code')
  }
};


