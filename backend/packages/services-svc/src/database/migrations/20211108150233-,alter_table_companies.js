'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('companies', 'bank_code'),
      queryInterface.removeColumn('companies', 'agency'),
      queryInterface.removeColumn('companies', 'account'),
      queryInterface.removeColumn('companies', 'message')
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('companies', 'bank_code', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.addColumn('companies', 'agency', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.addColumn('companies', 'account', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.addColumn('companies', 'message', {
        type: Sequelize.STRING,
        allowNull: true
      })
    ])
  }
}
