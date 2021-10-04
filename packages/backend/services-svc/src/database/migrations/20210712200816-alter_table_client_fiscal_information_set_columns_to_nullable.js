'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('client_fiscal_information', 'client_from_mato_grosso', {
      type: Sequelize.BOOLEAN,
      allowNull: true
    })

    await queryInterface.changeColumn('client_fiscal_information', 'tax_regime', {
      type: Sequelize.STRING(30),
      allowNull: true
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('client_fiscal_information', 'client_from_mato_grosso', {
      type: Sequelize.BOOLEAN,
      allowNull: false
    })

    await queryInterface.changeColumn('client_fiscal_information', 'tax_regime', {
      type: Sequelize.STRING(30),
      allowNull: false
    })
  }
};
