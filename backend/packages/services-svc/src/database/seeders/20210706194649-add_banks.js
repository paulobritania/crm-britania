"use strict"

const options = [
  {
    code: "001",
    description: "Banco do Brasil S.A.",
  },
  {
    code: "003",
    description: "Banco da Amazônia S.A.",
  },
  {
    code: "004",
    description: "Banco do Nordeste do Brasil S.A.",
  },
  {
    code: "007",
    description: "Banco Nacional de Desenvolvimento Econômico e Social BNDES",
  },
  {
    code: "010",
    description: "Credicoamo Crédito Rural Cooperativa",
  },
  {
    code: "011",
    description: "Credit Suisse Hedging-Griffo Corretora de Valores S.A.",
  },
  {
    code: "012",
    description: "Banco Inbursa S.A.",
  },
  {
    code: "014",
    description: "Natixis Brasil S.A. Banco Múltiplo",
  },
  {
    code: "015",
    description: "UBS Brasil Corretora de Câmbio, Títulos e Valores Mobiliários S.A.",
  },
  {
    code: "016",
    description:
      "Coop de Créd. Mútuo dos Despachantes de Trânsito de SC e Rio Grande do Sul",
  },
  {
    code: "017",
    description: "BNY Mellon Banco S.A.",
  },
  {
    code: "018",
    description: "Banco Tricury S.A.",
  },
  {
    code: "021",
    description: "Banestes S.A. Banco do Estado do Espírito Santo",
  },
  {
    code: "024",
    description: "Banco Bandepe S.A.",
  },
  {
    code: "025",
    description: "Banco Alfa S.A.",
  },
  {
    code: "029",
    description: "Banco Itaú Consignado S.A.",
  },
  {
    code: "033",
    description: "Banco Santander (Brasil) S. A.",
  },
  {
    code: "036",
    description: "Banco Bradesco BBI S.A.",
  },
  {
    code: "037",
    description: "Banco do Estado do Pará S.A.",
  },
  {
    code: "040",
    description: "Banco Cargill S.A.",
  },
  {
    code: "041",
    description: "Banco do Estado do Rio Grande do Sul S.A.",
  },
  {
    code: "047",
    description: "Banco do Estado de Sergipe S.A.",
  },
  {
    code: "060",
    description: "Confidence Corretora de Câmbio S.A.",
  },
  {
    code: "062",
    description: "Hipercard Banco Múltiplo S.A.",
  },
  {
    code: "063",
    description: "Banco Bradescard S.A.",
  },
  {
    code: "064",
    description: "Goldman Sachs do Brasil  Banco Múltiplo S. A.",
  },
  {
    code: "065",
    description: "Banco AndBank (Brasil) S.A.",
  },
  {
    code: "066",
    description: "Banco Morgan Stanley S. A.",
  },
  {
    code: "069",
    description: "Banco Crefisa S.A.",
  },
  {
    code: "070",
    description: "Banco de Brasília S.A.",
  },
  {
    code: "074",
    description: "Banco J. Safra S.A.",
  },
  {
    code: "075",
    description: "Banco ABN Amro S.A.",
  },
  {
    code: "076",
    description: "Banco KDB do Brasil S.A.",
  },
  {
    code: "077",
    description: "Banco Inter S.A.",
  },
  {
    code: "078",
    description: "Haitong Banco de Investimento do Brasil S.A.",
  },
  {
    code: "079",
    description: "Banco Original do Agronegócio S.A.",
  },
  {
    code: "080",
    description: "BT Corretora de Câmbio Ltda.",
  },
  {
    code: "081",
    description: "BBN Banco Brasileiro de Negocios S.A.",
  },
  {
    code: "082",
    description: "Banco Topazio S.A.",
  },
  {
    code: "083",
    description: "Banco da China Brasil S.A.",
  },
  {
    code: "084",
    description: "Uniprime Norte do Paraná - Cooperativa de Crédito Ltda.",
  },
  {
    code: "085",
    description: "Cooperativa Central de Crédito Urbano - Cecred",
  },
  {
    code: "089",
    description: "Cooperativa de Crédito Rural da Região da Mogiana",
  },
  {
    code: "091",
    description:
      "Central de Cooperativas de Economia e Crédito Mútuo do Est RS - Unicred",
  },
  {
    code: "092",
    description: "BRK S.A. Crédito, Financiamento e Investimento",
  },
  {
    code: "093",
    description:
      "Pólocred Sociedade de Crédito ao Microempreendedor e à Empresa de Pequeno Porte",
  },
  {
    code: "094",
    description: "Banco Finaxis S.A.",
  },
  {
    code: "095",
    description: "Banco Confidence de Câmbio S.A.",
  },
  {
    code: "096",
    description: "Banco BMFBovespa de Serviços de Liquidação e Custódia S/A",
  },
  {
    code: "097",
    description:
      "Cooperativa Central de Crédito Noroeste Brasileiro Ltda - CentralCredi",
  },
  {
    code: "098",
    description: "Credialiança Cooperativa de Crédito Rural",
  },
  {
    code: "099",
    description:
      "Uniprime Central – Central Interestadual de Cooperativas de Crédito Ltda.",
  },
  {
    code: "100",
    description: "Planner Corretora de Valores S.A.",
  },
  {
    code: "101",
    description: "Renascença Distribuidora de Títulos e Valores Mobiliários Ltda.",
  },
  {
    code: "102",
    description:
      "XP Investimentos Corretora de Câmbio Títulos e Valores Mobiliários S.A.",
  },
  {
    code: "104",
    description: "Caixa Econômica Federal",
  },
  {
    code: "105",
    description: "Lecca Crédito, Financiamento e Investimento S/A",
  },
  {
    code: "107",
    description: "Banco Bocom BBM S.A.",
  },
  {
    code: "108",
    description: "PortoCred S.A. Crédito, Financiamento e Investimento",
  },
  {
    code: "111",
    description: "Oliveira Trust Distribuidora de Títulos e Valores Mobiliários S.A.",
  },
  {
    code: "113",
    description: "Magliano S.A. Corretora de Cambio e Valores Mobiliarios",
  },
  {
    code: "114",
    description:
      "Central Cooperativa de Crédito no Estado do Espírito Santo - CECOOP",
  },
  {
    code: "117",
    description: "Advanced Corretora de Câmbio Ltda.",
  },
  {
    code: "118",
    description: "Standard Chartered Bank (Brasil) S.A. Banco de Investimento",
  },
  {
    code: "119",
    description: "Banco Western Union do Brasil S.A.",
  },
  {
    code: "120",
    description: "Banco Rodobens SA",
  },
  {
    code: "121",
    description: "Banco Agibank S.A.",
  },
  {
    code: "122",
    description: "Banco Bradesco BERJ S.A.",
  },
  {
    code: "124",
    description: "Banco Woori Bank do Brasil S.A.",
  },
  {
    code: "125",
    description: "Brasil Plural S.A. Banco Múltiplo",
  },
  {
    code: "126",
    description: "BR Partners Banco de Investimento S.A.",
  },
  {
    code: "127",
    description: "Codepe Corretora de Valores e Câmbio S.A.",
  },
  {
    code: "128",
    description: "MS Bank S.A. Banco de Câmbio",
  },
  {
    code: "129",
    description: "UBS Brasil Banco de Investimento S.A.",
  },
  {
    code: "130",
    description: "Caruana S.A. Sociedade de Crédito, Financiamento e Investimento",
  },
  {
    code: "131",
    description: "Tullett Prebon Brasil Corretora de Valores e Câmbio Ltda.",
  },
  {
    code: "132",
    description: "ICBC do Brasil Banco Múltiplo S.A.",
  },
  {
    code: "133",
    description:
      "Confederação Nacional das Cooperativas Centrais de Crédito e Economia Familiar e",
  },
  {
    code: "134",
    description: "BGC Liquidez Distribuidora de Títulos e Valores Mobiliários Ltda.",
  },
  {
    code: "135",
    description: "Gradual Corretora de Câmbio, Títulos e Valores Mobiliários S.A.",
  },
  {
    code: "136",
    description:
      "Confederação Nacional das Cooperativas Centrais Unicred Ltda – Unicred do Brasil",
  },
  {
    code: "137",
    description: "Multimoney Corretora de Câmbio Ltda",
  },
  {
    code: "138",
    description: "Get Money Corretora de Câmbio S.A.",
  },
  {
    code: "139",
    description: "Intesa Sanpaolo Brasil S.A. - Banco Múltiplo",
  },
  {
    code: "140",
    description: "Easynvest - Título Corretora de Valores SA",
  },
  {
    code: "142",
    description: "Broker Brasil Corretora de Câmbio Ltda.",
  },
  {
    code: "143",
    description: "Treviso Corretora de Câmbio S.A.",
  },
  {
    code: "144",
    description: "Bexs Banco de Câmbio S.A.",
  },
  {
    code: "145",
    description: "Levycam - Corretora de Câmbio e Valores Ltda.",
  },
  {
    code: "146",
    description: "Guitta Corretora de Câmbio Ltda.",
  },
  {
    code: "149",
    description: "Facta Financeira S.A. - Crédito Financiamento e Investimento",
  },
  {
    code: "157",
    description: "ICAP do Brasil Corretora de Títulos e Valores Mobiliários Ltda.",
  },
  {
    code: "159",
    description: "Casa do Crédito S.A. Sociedade de Crédito ao Microempreendedor",
  },
  {
    code: "163",
    description: "Commerzbank Brasil S.A. - Banco Múltiplo",
  },
  {
    code: "169",
    description: "Banco Olé Bonsucesso Consignado S.A.",
  },
  {
    code: "172",
    description: "Albatross Corretora de Câmbio e Valores S.A",
  },
  {
    code: "173",
    description: "BRL Trust Distribuidora de Títulos e Valores Mobiliários S.A.",
  },
  {
    code: "174",
    description:
      "Pernambucanas Financiadora S.A. Crédito, Financiamento e Investimento",
  },
  {
    code: "177",
    description: "Guide Investimentos S.A. Corretora de Valores",
  },
  {
    code: "180",
    description:
      "CM Capital Markets Corretora de Câmbio, Títulos e Valores Mobiliários Ltda.",
  },
  {
    code: "182",
    description:
      "Dacasa Financeira S/A - Sociedade de Crédito, Financiamento e Investimento",
  },
  {
    code: "183",
    description: "Socred S.A. - Sociedade de Crédito ao Microempreendedor",
  },
  {
    code: "184",
    description: "Banco Itaú BBA S.A.",
  },
  {
    code: "188",
    description: "Ativa Investimentos S.A. Corretora de Títulos Câmbio e Valores",
  },
  {
    code: "189",
    description: "HS Financeira S/A Crédito, Financiamento e Investimentos",
  },
  {
    code: "190",
    description:
      "Cooperativa de Economia e Crédito Mútuo dos Servidores Públicos Estaduais do Rio",
  },
  {
    code: "191",
    description: "Nova Futura Corretora de Títulos e Valores Mobiliários Ltda.",
  },
  {
    code: "194",
    description: "Parmetal Distribuidora de Títulos e Valores Mobiliários Ltda.",
  },
  {
    code: "196",
    description: "Fair Corretora de Câmbio S.A.",
  },
  {
    code: "197",
    description: "Stone Pagamentos S.A.",
  },
  {
    code: "204",
    description: "Banco Bradesco Cartões S.A.",
  },
  {
    code: "208",
    description: "Banco BTG Pactual S.A.",
  },
  {
    code: "212",
    description: "Banco Original S.A.",
  },
  {
    code: "213",
    description: "Banco Arbi S.A.",
  },
  {
    code: "217",
    description: "Banco John Deere S.A.",
  },
  {
    code: "218",
    description: "Banco BS2 S.A.",
  },
  {
    code: "222",
    description: "Banco Credit Agrícole Brasil S.A.",
  },
  {
    code: "224",
    description: "Banco Fibra S.A.",
  },
  {
    code: "233",
    description: "Banco Cifra S.A.",
  },
  {
    code: "237",
    description: "Banco Bradesco S.A.",
  },
  {
    code: "241",
    description: "Banco Clássico S.A.",
  },
  {
    code: "243",
    description: "Banco Máxima S.A.",
  },
  {
    code: "246",
    description: "Banco ABC Brasil S.A.",
  },
  {
    code: "249",
    description: "Banco Investcred Unibanco S.A.",
  },
  {
    code: "250",
    description: "BCV - Banco de Crédito e Varejo S/A",
  },
  {
    code: "253",
    description: "Bexs Corretora de Câmbio S/A",
  },
  {
    code: "254",
    description: "Parana Banco S. A.",
  },
  {
    code: "260",
    description: "Nu Pagamentos S.A.",
  },
  {
    code: "265",
    description: "Banco Fator S.A.",
  },
  {
    code: "266",
    description: "Banco Cédula S.A.",
  },
  {
    code: "268",
    description: "Barigui Companhia Hipotecária",
  },
  {
    code: "269",
    description: "HSBC Brasil S.A. Banco de Investimento",
  },
  {
    code: "271",
    description: "IB Corretora de Câmbio, Títulos e Valores Mobiliários Ltda.",
  },
  {
    code: "300",
    description: "Banco de la Nacion Argentina",
  },
  {
    code: "318",
    description: "Banco BMG S.A.",
  },
  {
    code: "320",
    description: "China Construction Bank (Brasil) Banco Múltiplo S/A",
  },
  {
    code: "341",
    description: "Itaú Unibanco  S.A.",
  },
  {
    code: "366",
    description: "Banco Société Générale Brasil S.A.",
  },
  {
    code: "370",
    description: "Banco Mizuho do Brasil S.A.",
  },
  {
    code: "376",
    description: "Banco J. P. Morgan S. A.",
  },
  {
    code: "389",
    description: "Banco Mercantil do Brasil S.A.",
  },
  {
    code: "394",
    description: "Banco Bradesco Financiamentos S.A.",
  },
  {
    code: "399",
    description: "Kirton Bank S.A. - Banco Múltiplo",
  },
  {
    code: "412",
    description: "Banco Capital S. A.",
  },
  {
    code: "422",
    description: "Banco Safra S.A.",
  },
  {
    code: "456",
    description: "Banco MUFG Brasil S.A.",
  },
  {
    code: "464",
    description: "Banco Sumitomo Mitsui Brasileiro S.A.",
  },
  {
    code: "473",
    description: "Banco Caixa Geral - Brasil S.A.",
  },
  {
    code: "477",
    description: "Citibank N.A.",
  },
  {
    code: "479",
    description: "Banco ItauBank S.A.",
  },
  {
    code: "487",
    description: "Deutsche Bank S.A. - Banco Alemão",
  },
  {
    code: "488",
    description: "JPMorgan Chase Bank, National Association",
  },
  {
    code: "492",
    description: "ING Bank N.V.",
  },
  {
    code: "494",
    description: "Banco de La Republica Oriental del Uruguay",
  },
  {
    code: "495",
    description: "Banco de La Provincia de Buenos Aires",
  },
  {
    code: "505",
    description: "Banco Credit Suisse (Brasil) S.A.",
  },
  {
    code: "545",
    description: "Senso Corretora de Câmbio e Valores Mobiliários S.A.",
  },
  {
    code: "600",
    description: "Banco Luso Brasileiro S.A.",
  },
  {
    code: "604",
    description: "Banco Industrial do Brasil S.A.",
  },
  {
    code: "610",
    description: "Banco VR S.A.",
  },
  {
    code: "611",
    description: "Banco Paulista S.A.",
  },
  {
    code: "612",
    description: "Banco Guanabara S.A.",
  },
  {
    code: "613",
    description: "Omni Banco S.A.",
  },
  {
    code: "623",
    description: "Banco Pan S.A.",
  },
  {
    code: "626",
    description: "Banco Ficsa S. A.",
  },
  {
    code: "630",
    description: "Banco Intercap S.A.",
  },
  {
    code: "633",
    description: "Banco Rendimento S.A.",
  },
  {
    code: "634",
    description: "Banco Triângulo S.A.",
  },
  {
    code: "637",
    description: "Banco Sofisa S. A.",
  },
  {
    code: "641",
    description: "Banco Alvorada S.A.",
  },
  {
    code: "643",
    description: "Banco Pine S.A.",
  },
  {
    code: "652",
    description: "Itaú Unibanco Holding S.A.",
  },
  {
    code: "653",
    description: "Banco Indusval S. A.",
  },
  {
    code: "654",
    description: "Banco A. J. Renner S.A.",
  },
  {
    code: "655",
    description: "Banco Votorantim S.A.",
  },
  {
    code: "707",
    description: "Banco Daycoval S.A.",
  },
  {
    code: "712",
    description: "Banco Ourinvest S.A.",
  },
  {
    code: "719",
    description: "Banif - Bco Internacional do Funchal (Brasil) S.A.",
  },
  {
    code: "735",
    description: "Banco Neon S.A.",
  },
  {
    code: "739",
    description: "Banco Cetelem S.A.",
  },
  {
    code: "741",
    description: "Banco Ribeirão Preto S.A.",
  },
  {
    code: "743",
    description: "Banco Semear S.A.",
  },
  {
    code: "745",
    description: "Banco Citibank S.A.",
  },
  {
    code: "746",
    description: "Banco Modal S.A.",
  },
  {
    code: "747",
    description: "Banco Rabobank International Brasil S.A.",
  },
  {
    code: "748",
    description: "Banco Cooperativo Sicredi S. A.",
  },
  {
    code: "751",
    description: "Scotiabank Brasil S.A. Banco Múltiplo",
  },
  {
    code: "752",
    description: "Banco BNP Paribas Brasil S.A.",
  },
  {
    code: "753",
    description: "Novo Banco Continental S.A. - Banco Múltiplo",
  },
  {
    code: "754",
    description: "Banco Sistema S.A.",
  },
  {
    code: "755",
    description: "Bank of America Merrill Lynch Banco Múltiplo S.A.",
  },
  {
    code: "756",
    description: "Banco Cooperativo do Brasil S/A - Bancoob",
  },
  {
    code: "757",
    description: "Banco Keb Hana do Brasil S. A.",
  },
]
const created_at = new Date().toISOString()

const data = options.map((item) => {
  return {
    code: item.code,
    description: item.description,
    created_at,
  }
})

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("banks", data)
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("banks", data, {})
  },
};
