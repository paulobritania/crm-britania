'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      image_id: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      username: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      integrated_ad: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(60),
        allowNull: true
      },
      phone: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      customer_hierarchy_enabled: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      substitute_user_id: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      substitute_user_period: {
        type: Sequelize.DATE,
        allowNull: true
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      created_by: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_by: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    return await queryInterface.dropTable('users');
  }
};
