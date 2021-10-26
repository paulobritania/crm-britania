'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'buyers_lines_families',
        'regional_manager_code',
        {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0
        }
      ),
      queryInterface.addColumn(
        'buyers_lines_families',
        'regional_manager_description',
        {
          type: Sequelize.STRING(70),
          allowNull: false,
          defaultValue: 0
        }
      ),
      queryInterface.addColumn('buyers_lines_families', 'responsible_code', {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      }),
      queryInterface.addColumn(
        'buyers_lines_families',
        'responsible_description',
        {
          type: Sequelize.STRING(70),
          allowNull: false,
          defaultValue: 0
        }
      ),
      queryInterface.addColumn('buyers_lines_families', 'created_at', {
        type: Sequelize.DATE,
        allowNull: true
      }),
      queryInterface.addColumn('buyers_lines_families', 'updated_at', {
        type: Sequelize.DATE,
        allowNull: true
      })
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn(
        'buyers_lines_families',
        'regional_manager_code'
      ),
      queryInterface.removeColumn(
        'buyers_lines_families',
        'regional_manager_description'
      ),
      queryInterface.removeColumn('buyers_lines_families', 'responsible_code'),
      queryInterface.removeColumn(
        'buyers_lines_families',
        'responsible_description'
      ),
      queryInterface.removeColumn('buyers_lines_families', 'updated_at'),
      queryInterface.removeColumn('buyers_lines_families', 'created_at')
    ])
  }
}
