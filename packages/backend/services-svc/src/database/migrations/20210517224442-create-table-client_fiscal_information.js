'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('client_fiscal_information', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      special_tax_substitution_regime: {
        type: Sequelize.BOOLEAN,
        defaultValue: false, 
        allowNull: false 
      },
      client_from_mato_grosso: {
        type: Sequelize.BOOLEAN,
        defaultValue: false, 
        allowNull: false 
      },
      tax_regime: {
        type: Sequelize.STRING(30),
        defaultValue: false, 
        allowNull: false 
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('client_fiscal_information')
  }
};
