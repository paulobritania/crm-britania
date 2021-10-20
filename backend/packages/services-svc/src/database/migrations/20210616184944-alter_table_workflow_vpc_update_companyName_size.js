'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('workflow_vpc', 'company_name', {
      type: Sequelize.STRING(70),
      allowNull: true
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('workflow_vpc', 'company_name', {
      type: Sequelize.STRING(14),
      allowNull: true
    })
  }
};
