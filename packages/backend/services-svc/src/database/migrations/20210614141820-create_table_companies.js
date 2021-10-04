'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('companies', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(150),
        allowNull: false
      },
      cnpj: {
        type: Sequelize.STRING(14),
        allowNull: false
      },
      bank_code: {
        type: Sequelize.STRING(10),
        allowNull: false
      },
      agency: {
        type: Sequelize.STRING(10),
        allowNull: false
      },
      account: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      identifier: {
        type: Sequelize.STRING(8),
        allowNull: true
      },
      message: {
        type: Sequelize.STRING(500),
        allowNull: true
      },
      created_by: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      updated_by: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('companies')
  }
};
