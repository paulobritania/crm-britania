'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('companies_bank_account', 'created_by', {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      }),
      queryInterface.addColumn('companies_bank_account', 'updated_by', {
        type: Sequelize.INTEGER,
        allowNull: true,
      })
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('companies_bank_account', 'created_by'),
      queryInterface.removeColumn('companies_bank_account', 'updated_by')
    ])
  }
};
