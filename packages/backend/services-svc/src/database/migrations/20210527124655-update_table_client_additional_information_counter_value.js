'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('client_additional_information_counter_values', 'localization', {
      type: Sequelize.STRING(15),
      allowNull: true,
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('client_additional_information_counter_values', 'localization')
  }
};
