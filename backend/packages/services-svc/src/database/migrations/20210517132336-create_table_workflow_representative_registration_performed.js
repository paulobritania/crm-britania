'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('workflow_representative_registration_performed', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      representative_registration_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      performed_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    return await queryInterface.dropTable('workflow_representative_registration_performed');
  }
};
