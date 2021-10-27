type IMockEntity = {
  $add: jest.Mock
  $count: jest.Mock
  $create: jest.Mock
  $get: jest.Mock
  $has: jest.Mock
  $remove: jest.Mock
  $set: jest.Mock
  addHook: jest.Mock
  changed: jest.Mock
  decrement: jest.Mock
  destroy: jest.Mock
  equals: jest.Mock
  equalsOneOf: jest.Mock
  get: jest.Mock
  getDataValue: jest.Mock
  hasHook: jest.Mock
  hasHooks: jest.Mock
  increment: jest.Mock
  isNewRecord: boolean
  previous: jest.Mock
  reload: jest.Mock
  removeHook: jest.Mock
  restore: jest.Mock
  save: jest.Mock
  sequelize: null
  set: jest.Mock
  setAttributes: jest.Mock
  setDataValue: jest.Mock
  toJSON: () => any
  update: jest.Mock
  validate: jest.Mock
  where: jest.Mock
}

export const MockEntity = <T>(entity: T): T & IMockEntity => ({
  $add: jest.fn(),
  $count: jest.fn(),
  $create: jest.fn(),
  $get: jest.fn(),
  $has: jest.fn(),
  $remove: jest.fn(),
  $set: jest.fn(),
  addHook: jest.fn(),
  changed: jest.fn(),
  decrement: jest.fn(),
  destroy: jest.fn(),
  equals: jest.fn(),
  equalsOneOf: jest.fn(),
  get: jest.fn(),
  getDataValue: jest.fn(),
  hasHook: jest.fn(),
  hasHooks: jest.fn(),
  increment: jest.fn(),
  isNewRecord: false,
  previous: jest.fn(),
  reload: jest.fn(),
  removeHook: jest.fn(),
  restore: jest.fn(),
  save: jest.fn(),
  sequelize: null,
  set: jest.fn(),
  setAttributes: jest.fn(),
  setDataValue: jest.fn(),
  update: jest.fn(),
  validate: jest.fn(),
  where: jest.fn(),
  toJSON: () => entity,
  ...entity
})
