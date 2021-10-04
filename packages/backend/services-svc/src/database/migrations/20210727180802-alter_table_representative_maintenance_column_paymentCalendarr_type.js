"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('representative_maintenance', 'payment_calendar', {
      type: Sequelize.STRING(6),
      allowNull: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('representative_maintenance', 'payment_calendar', {
      type: Sequelize.DATE,
      allowNull: true
    });
  },
};
