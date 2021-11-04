'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('buyers', 'client_totvs_description', {
        type: Sequelize.STRING(80)
      })
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('buyers', 'client_totvs_description'),
    ])
  }
}
