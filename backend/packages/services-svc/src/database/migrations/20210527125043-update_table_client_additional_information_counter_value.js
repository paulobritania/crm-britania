'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('client_additional_information_counter_values', 'description', {
      type: Sequelize.STRING(30),
      allowNull: true,
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('client_additional_information_counter_values', 'description')
  }
};
