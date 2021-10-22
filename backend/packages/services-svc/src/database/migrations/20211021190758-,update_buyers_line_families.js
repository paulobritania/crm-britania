'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('buyers_lines_families', 'regional_manager_code', {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      }),
      queryInterface.addColumn('buyers_lines_families', 'regional_manager_description', {
        type: Sequelize.STRING(70),
        allowNull: false,
        defaultValue: 0
      }),
      queryInterface.addColumn('buyers_lines_families', 'created_at', {
        type: Sequelize.DATE(6),
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)')
      }),
      queryInterface.addColumn('buyers_lines_families', 'updated_at', {
        type: Sequelize.DATE(6),
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)')
      }),
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('buyers_lines_families', 'regional_manager_code'),
      queryInterface.removeColumn('buyers_lines_families', 'regional_manager_description'),
      queryInterface.removeColumn('buyers_lines_families', 'created_at'),
      queryInterface.removeColumn('buyers_lines_families', 'updated_at'),
    ])
  }
};
