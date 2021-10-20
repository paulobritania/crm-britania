"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('documents', 'observation', {
      type: Sequelize.STRING(4000),
      allowNull: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('documents', 'observation', {
      type: Sequelize.STRING(4000),
      allowNull: true
    });
  },
};
