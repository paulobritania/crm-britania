'use strict'

const viewName = 'vw_buyers_report'
const query = `
SELECT [name] as 'NOME COMPLETO', [CPF] as'CPF',
concat(a.street, ', ', a.number, ', ', a.district, ', ', a.cep, ', ', a.city, ', ', a.[state]) as 'ENDERECO',
telephone as 'TELEFONE', [role] as 'CARGO', category as 'CATEGORIA', email as 'E-MAIL', birthday as 'ANIVERSARIO',
client_totvs_code as 'CODIGO DA MATRIZ', bl.line_description as 'LINHA', bl.family_description as 'FAMILIA',
bl.family_description as 'RESPONSAVEL', bl.regional_manager_description as 'GERENTE REGIONAL',
voltage as 'VOLTAGEM',
case when b.active = 1 then 'Ativo' else 'Inativo' end as 'STATUS'
FROM buyers b
inner join buyers_address ba on b.id = ba.id_buyers
inner join [address] a on a.id = ba.id_address
inner join buyers_lines_families bl on b.id = bl.buyer_id
where ba.address_type = 1
`

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`CREATE VIEW ${viewName} AS ${query}`)
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`DROP VIEW ${viewName}`)
  }
}
