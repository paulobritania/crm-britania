'use strict';

const options = [
  {
    ranking_id: 1,
    ranking_indicator_id: 1,
    symbol: '>',
    goal: 60,
    weight: 3,
  },
  {
    ranking_id: 1,
    ranking_indicator_id: 2,
    symbol: '<',
    goal: 2,
    weight: 3,
  },
  {
    ranking_id: 1,
    ranking_indicator_id: 3,
    symbol: '>',
    goal: 85,
    weight: 2,
  },
  {
    ranking_id: 1,
    ranking_indicator_id: 4,
    symbol: '<=',
    goal: 30,
    weight: 2,
  },
  {
    ranking_id: 2,
    ranking_indicator_id: 1,
    symbol: '>',
    goal: 40,
    weight: 2,
  },
  {
    ranking_id: 2,
    ranking_indicator_id: 2,
    symbol: '<',
    goal: 3,
    weight: 2,
  },
  {
    ranking_id: 2,
    ranking_indicator_id: 3,
    symbol: '>',
    goal: 60,
    weight: 1,
  },
  {
    ranking_id: 2,
    ranking_indicator_id: 4,
    symbol: '<=',
    goal: 60,
    weight: 1,
  },
  {
    ranking_id: 3,
    ranking_indicator_id: 1,
    symbol: '>',
    goal: 20,
    weight: 1,
  },
  {
    ranking_id: 3,
    ranking_indicator_id: 2,
    symbol: '<',
    goal: 4,
    weight: 1,
  },
  {
    ranking_id: 3,
    ranking_indicator_id: 3,
    symbol: '>',
    goal: 40,
    weight: 0.5,
  },
  {
    ranking_id: 3,
    ranking_indicator_id: 4,
    symbol: '<=',
    goal: 90,
    weight: 0.5,
  },
  ,
  {
    ranking_id: 4,
    ranking_indicator_id: 1,
    symbol: '<=',
    goal: 20,
    weight: 0,
  },
  {
    ranking_id: 4,
    ranking_indicator_id: 2,
    symbol: '>=',
    goal: 4,
    weight: 0,
  },
  {
    ranking_id: 4,
    ranking_indicator_id: 3,
    symbol: '<=',
    goal: 40,
    weight: 0,
  },
  {
    ranking_id: 4,
    ranking_indicator_id: 4,
    symbol: '>',
    goal: 90,
    weight: 0,
  }
]

const data = options.map(item => {
  return {
    ranking_id: item.ranking_id,
    ranking_indicator_id: item.ranking_indicator_id,
    symbol: item.symbol,
    goal: item.goal,
    weight: item.weight,
    updated_by: 1,
    updated_at: new Date().toISOString(),
  }
})

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ranking_indicator_values', data, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ranking_indicator_values', data, {});
  }
};
