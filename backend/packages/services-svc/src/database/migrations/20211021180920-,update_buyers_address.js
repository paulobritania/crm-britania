'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      // queryInterface.dropTable('buyers_address'),

      queryInterface.createTable('buyers_address', {
        id_buyers: {
          type: Sequelize.INTEGER,
          autoIncrement: false,
          primaryKey: true,
          allowNull: false
        },
        id_address: {
          type: Sequelize.INTEGER,
          autoIncrement: false,
          primaryKey: true,
          allowNull: false
        },
        address_type: {
          type: Sequelize.INTEGER,
          allowNull: true
        },
        delivery_address: {
          type: Sequelize.BOOLEAN,
          allowNull: true
        }
      })
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('buyers_address')
  }
}
