export const administration = {
  uploadLoginImage: '/services/settings/upload-login-image',
  loginImage: '/services/settings/login-image'
}

export const representatives = { baseRoute: '/services/representatives' }
export const reminders = { stickyNotes: '/services/sticky-notes' }

export const profiles = {
  list: '/services/profiles',
  status: '/services/profiles/status'
}

export const permissions = { base: '/services/permissions' }

export const fields = { base: '/services/fields', get: '/services/fields' }

export const users = {
  baseRoute: '/services/users',
  listSubstitutes: '/services/substitutes',
  list: '/services/users',
  autoComplete: '/services/users/autocomplete',
  post: '/services/users',
  put: '/services/users',
  get: '/services/users',
  delete: '/services/users',
  doAttachProfiles: '/services/users/',
  regionalManager: '/services/users/personal/regional-managers',
  getRegional: '/services/users/regional-client'
}

export const messages = {
  getAll: '/services/message-boards',
  getOne: '/services/message-boards',
  getFilter: '/services/message-boards/filter',
  post: '/services/message-boards',
  put: '/services/message-boards',
  delete: '/services/message-boards',
  deleteAttachment: '/services/message-boards'
}

export const workflows = {
  getAll: '/services/workflows',
  getOne: '/services/workflows',
  getTypes: '/services/workflows/types',
  create: '/services/workflows',
  update: '/services/workflows',
  deactivate: '/services/workflows',
  getVersionUrl: (typeId) => `/services/workflows/types/${ typeId }/version`,
  getTasksUrl: (id) => `/services/workflows/${ id }/tasks`,
  getVersionVpc: '/services/vpcs/workflow/versions'
}

export const file = {
  delete: '/services/files',
  getById: '/services/files',
  download: '/services/files',
  uploadSingleFile: '/services/files/upload'
}

export const auth = { login: '/auth' }

export const access = { getAll: '/services/accesses' }

export const ranking = {
  get: '/services/client-rankings',
  put: '/services/client-rankings',
  getRankingOptions: '​/client-rankings​/rankings',
  getRankingsRankings: '/services/client-rankings/rankings'
}

export const clients = {
  get: '/services/clients/parent-companies',
  getGroups: '/services/clients/groups',
  getParentCompaniesBranchesUrl: (clientCode) => `/services/clients/parent-companies/${ clientCode }/branches`,
  getRankingSuggestionUrl: '/services/clients/:clientTotvsCode/ranking/suggestion',
  getPutUrlRankingChangeRanking: '/services/clients/:clientTotvsCode/ranking',
  getOperationNature: '/services/clients/operation-nature'
}

export const customer = {
  getOne: '/services/clients',
  put: '/services/clients',
  getAll: '/services/clients/parent-companies',
  get: '/services/clients/parent-companies',
  getOnePreRegister: '/services/clients/pre-register/:id',
  postPreRegister: '/services/clients/pre-register',
  putPreRegister: '/services/clients/pre-register/:id',
  putFinishPreRegister: '/services/clients/pre-register/start-workflow/:id',
  getRegional: '/services/clients/:clientCode/regional-managers',
  getResponsible: '/services/clients/:clientCode/responsible',
  getPriceList: 'services/clients/price-list',
  getInfoCustomer: 'services/clients/parent-companies/description'
}

export const buyers = {
  getAll: '/services/buyers',
  getLines: '/services/buyers/lines',
  getOne: '/services/buyers',
  getFamilies: '/services/buyers/families',
  getMatrix: '/services/buyers/matrix',
  post: '/services/buyers',
  haveBuyer: '/services/buyers/existence-buyer',
  download: '/services/buyers/report'
}

export const establishments = { getAll: '/services/establishments' }

export const lines = {
  getAll: '/services/lines',
  getFamilies: '/services/lines/families',
  getLinesMaster: '/services/lines/families'
}

export const linesMaster = { getAll: '/services/lines/masters' }

export const representative = {
  postSave: '/services/representatives/pre-registration/save',
  postConclude: '/services/representatives/pre-registration/conclude',
  put: '/services/representatives/pre-registration',
  getAll: '/services/representatives/pre-registration',
  getOne: '/services/representatives/pre-registration/:id',
  getRepresentativeList: '/services/representatives'
}

export const vpc = {
  getAll: '/services/vpcs',
  download: '/services/vpcs/report',
  create: '/services/vpcs',
  getOne: '/services/vpcs/:vpcId',
  update: '/services/vpcs/:vpcId',
  getProductByCode: '/services/vpcs/product/:productCode',
  getRequestByNumber: '/services/vpcs/request/:requestNumber',
  startWorkflowVpc: '/services/vpcs/:vpcId/start-workflow'
}

export const documents = {
  getAll: '/services/configurations/documents',
  getOne: '/services/configurations/documents',
  delete: '/services/configurations/documents',
  post: '/services/configurations/documents',
  put: '/services/configurations/documents'
}

export const fan = {
  getAll: '/services/fans',
  getOne: '/services/fans/:fanId',
  save: '/services/fans',
  put: '/services/fans/:workflowFanId',
  conclude: 'services/fans/start-workflow/:workflowFanId',
  saveDocuments: 'services/fans/:workflowFanId/documents',
  getNumbersFan: 'services/fans/numbers',
  deleteDocument: 'services/fans/document/:documentId'
}

export const reportVpc = { getAll: '/services/ainda-não-sei-rota-certa' }

export const sla = {
  getAll: '/services/workflows/sla',
  getPreview: '/services/workflows/sla/preview'
}

export const companies = {
  getAll: '/services/companies',
  getOne: '/services/companies/:id',
  post: '/services/companies',
  put: '/services/companies/:id'
}

export const products = {
  getAll: '/services/products',
  getAllDescriptions: '/services/products/descriptions',
  getOne: '/services/products/:productCode'
}

export const reports = { getContractualPercentage: '/services/reports/vpc/contractual-percentage' }

export const bank = { getAll: '/services/banks' }
