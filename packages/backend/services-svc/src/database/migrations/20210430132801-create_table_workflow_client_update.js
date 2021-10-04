'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('workflow_client_update', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      client_totvs_code: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      commercial_phone: {
        allowNull: false,
        type: Sequelize.STRING(10)
      },
      cell_phone: {
        allowNull: false,
        type: Sequelize.STRING(11)
      },
      logistics_information: {
        allowNull: false,
        type: Sequelize.STRING(40)
      },
      credit_situation: {
        allowNull: false,
        type: Sequelize.STRING(40)
      },
      regime_letter: {
        allowNull: false,
        type: Sequelize.STRING(40)
      },
      days_without_billing: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      delivery_address_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      billing_address_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      workflow_performed_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      created_by: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_by: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      updated_at: {
        allowNull: true,
        type: Sequelize.DATE
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('workflow_client_update');
  }
};
