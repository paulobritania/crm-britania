'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('companies_bank_account', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      bank_code: {
        type: Sequelize.INTEGER,
        allowNull: false,
        default: 0
      },
      company_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        default: 0
      },
      agency: {
        type: Sequelize.STRING(10),
      },
      account: {
        type: Sequelize.STRING(10),
      },
      note: {
        type: Sequelize.STRING(10),
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        default: Sequelize.NOW
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
        default: Sequelize.NOW
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('companies_bank_account')
  }
};
