'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('client_additional_information_revenues', 'month', {
      type: Sequelize.INTEGER,
      allowNull: true
    })

    await queryInterface.changeColumn('client_additional_information_revenues', 'year', {
      type: Sequelize.INTEGER,
      allowNull: true
    })

    await queryInterface.changeColumn('client_additional_information_revenues', 'value', {
      type: Sequelize.NUMERIC(19, 4),
      allowNull: true
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('client_additional_information_revenues', 'month', {
      type: Sequelize.INTEGER,
      allowNull: false
    })

    await queryInterface.changeColumn('client_additional_information_revenues', 'year', {
      type: Sequelize.INTEGER,
      allowNull: false
    })

    await queryInterface.changeColumn('client_additional_information_revenues', 'value', {
      type: Sequelize.NUMERIC(19, 4),
      allowNull: false
    })
  }
};
