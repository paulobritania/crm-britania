'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('workflow_vpc_nds', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      issuer_company_code: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      issuer_company_name: {
        type: Sequelize.STRING(70),
        allowNull: false
      },
      number: {
        type: Sequelize.STRING(15),
        allowNull: false
      },
      issue_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      due_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      value: {
        type: Sequelize.NUMERIC(19, 4),
        allowNull: false
      },
      company: {
        type: Sequelize.STRING(12),
        allowNull: false
      },
      observation: {
        type: Sequelize.STRING(500),
        allowNull: false
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      reason_deactivation: {
        type: Sequelize.STRING(500),
        allowNull: true
      },
      workflow_vpc_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('workflow_vpc_nds')
  }
};
