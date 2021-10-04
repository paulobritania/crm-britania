'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('workflow_fan', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      number: {
        type: Sequelize.STRING(70),
        allowNull: true
      },
      rev: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false
      },
      company: {
        type: Sequelize.STRING(70),
        allowNull: false
      },
      parent_company_code: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      parent_company_name: {
        type: Sequelize.STRING(70),
        allowNull: true
      },
      responsible: {
        type: Sequelize.STRING(70),
        allowNull: true
      },
      regional_manager: {
        type: Sequelize.STRING(70),
        allowNull: true
      },
      regional_manager_code: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      start_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      end_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      directorship: {
        type: Sequelize.STRING(15),
        allowNull: false
      },
      observation: {
        type: Sequelize.STRING(70),
        allowNull: true
      },
      workflow_performed_id: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      created_by: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      updated_by: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('workflow_fan')
  }
};
