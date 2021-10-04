'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('workflow_vpc_requests', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      request_number: {
        type: Sequelize.STRING(15),
        allowNull: false
      },
      establishment_code: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      establishment_name: {
        type: Sequelize.STRING(70),
        allowNull: false
      },
      value: {
        type: Sequelize.NUMERIC(19, 4),
        allowNull: false
      },
      workflow_vpc_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('workflow_vpc_requests')
  }
};
