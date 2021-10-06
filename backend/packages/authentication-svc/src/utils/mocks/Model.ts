export type IMockModel = {
  create: jest.Mock
  destroy: jest.Mock
  findAll: jest.Mock
  findByPk: jest.Mock
  findOne: jest.Mock
  save: jest.Mock
  update: jest.Mock
  upsert: jest.Mock

}

export const MockModel = (): IMockModel => {
  return {
    create: jest.fn(),
    destroy: jest.fn(),
    findAll: jest.fn(),
    findByPk: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    upsert: jest.fn()
  }
}

export default MockModel
