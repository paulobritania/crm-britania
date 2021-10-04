'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('client_additional_information_revenues ', 'value', {
      type: Sequelize.DECIMAL(19,4),
      allowNull: true
    })
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.changeColumn('client_additional_information_revenues ', 'value', {
      type: Sequelize.NUMERIC(19, 4),
      allowNull: true
    })
  }
};


