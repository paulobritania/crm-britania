'use strict';

const options = [
  {
    code: "VPC",
    description: "VPC"
  },
  {
    code: "PCC",
    description: "Pré Cadastro de Cliente"
  },
  {
    code: "PCR",
    description: "Pré Cadastro de Representante"
  },
  {
    code: "AP",
    description: "Aprovação de Pedido"
  },
  {
    code: "ACdC",
    description: "Alteração de Cadastro de Cliente"
  },
  {
    code: "ARC",
    description: "Alteração de Ranking de Cliente"
  },
  {
    code: "EP",
    description: "Equalização de Preço"
  },
  {
    code: "APE",
    description: "Aprovação de Pedido de Equalização"
  },
  {
    code: "ACtC",
    description: "Alteração de Categoria do Cliente"
  },
  {
    code: "AN",
    description: "Aprovação de Negociação"
  }
]

const created_at = new Date().toISOString()
const data = options.map(item => {
  return {
    code: item.code,
    description: item.description,
    created_at
  }
})

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('workflow_types', data, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('workflow_types', data, {});
  }
};
