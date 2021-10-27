'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('workflows_performed', 'responsible_code', {
      type: Sequelize.INTEGER,
      allowNull: true
    })
  },

  down: async (queryInterface) => {
    return queryInterface.removeColumn('workflows_performed', 'responsible_code')
  }
};
