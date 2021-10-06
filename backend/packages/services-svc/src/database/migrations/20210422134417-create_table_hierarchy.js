'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('hierarchy', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      client_code: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      client_desc: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      line_code: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      parent_line_code: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      material_family_code: {
        type: Sequelize.STRING(12),
        allowNull: true
      },
      commercial_product_code: {
        type: Sequelize.STRING(16),
        allowNull: true
      },
      member_class_code: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      member_class_desc: {
        type: Sequelize.STRING(60),
        allowNull: false
      },
      member_code: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      member_desc: {
        type: Sequelize.STRING(40),
        allowNull: false
      },
      member_level: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      last_member: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      }
    })
  },

  down: async (queryInterface) => {
    return queryInterface.dropTable('hierarchy');
  }
};
