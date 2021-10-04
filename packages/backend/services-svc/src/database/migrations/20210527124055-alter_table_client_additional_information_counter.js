'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('client_additional_information_counter', 'localization')
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('client_additional_information_counter', 'localization', {
      type: Sequelize.STRING,
      allowNull: true
    })
  }
};
