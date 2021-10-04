"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('workflow_vpc', 'value', {
      type: Sequelize.NUMERIC(19, 4),
      allowNull: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('workflow_vpc', 'value', {
      type: Sequelize.NUMERIC(14, 9),
      allowNull: true
    });
  },
};
