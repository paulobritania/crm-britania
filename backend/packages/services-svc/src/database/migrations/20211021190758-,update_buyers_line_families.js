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
      )
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
      )
    ])
  }
}
