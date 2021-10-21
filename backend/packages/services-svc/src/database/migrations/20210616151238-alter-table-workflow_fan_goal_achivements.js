'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('workflow_fan_goal_achivements', 'slaughter_return', {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('workflow_fan_goal_achivements', 'slaughter_return', {
      type: Sequelize.STRING(5),
      allowNull: true
    })
  }
};
