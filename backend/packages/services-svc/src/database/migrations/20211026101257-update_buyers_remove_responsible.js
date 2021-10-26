'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('buyers', 'responsible_code'),
      queryInterface.removeColumn('buyers', 'responsible_description')
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('buyers', 'responsible_code', {
      type: Sequelize.INTEGER
    }),
      queryInterface.addColumn('buyers', 'responsible_description', {
        type: Sequelize.STRING(80)
      })
  }
}
