'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
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
      )
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('buyers_lines_families', 'responsible_code'),
      queryInterface.removeColumn(
        'buyers_lines_families',
        'responsible_description'
      )
  }
}
