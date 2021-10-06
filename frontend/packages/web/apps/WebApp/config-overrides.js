const {
  override, addBabelPlugins, getBabelLoader
} = require('customize-cra')
const path = require('path')

const get = require('lodash/get')
const set = require('lodash/set')

const jestConfig = require('@britania-crm/jest-config')

const webpack = (config) => {
  set(config, 'module.rules[2].oneOf[1]', {
    ...get(config, 'module.rules[2].oneOf[1]', {}),
    include: [
      get(config, 'module.rules[2].oneOf[1].include'),
      path.resolve(__dirname, '../../../../node_modules/@meta-awesome'),
      path.resolve(__dirname, '../../../../node_modules/@meta-react'),
      path.resolve(__dirname, '../../../core'),
      path.resolve(__dirname, '../../components'),
      path.resolve(__dirname, '../../src')
    ]
  })
  set(config, 'module.rules[2].oneOf[5].use[3].options', {
    ...get(config, 'module.rules[2].oneOf[5].use[3].options', {}),
    removeCR: true
  })
  set(config, 'module.rules[2].oneOf[6].use[3].options', {
    ...get(config, 'module.rules[2].oneOf[6].use[3].options', {}),
    removeCR: true
  })

  return override(
    (conf) => {
      getBabelLoader(conf).options.sourceType = 'unambiguous'
      return conf
    },
    addBabelPlugins([
      'babel-plugin-root-import',
      {
        rootPathPrefix: '~',
        rootPathSuffix: 'src'
      }
    ]),
    addBabelPlugins([
      '@babel/plugin-proposal-class-properties',
      { loose: true }
    ])
  )(config)
}

const jest = (config) => ({
  ...jestConfig,
  ...config,
  setupFiles: ['./jest.setup.js'],
  moduleNameMapper: {
    ...config.moduleNameMapper,
    '^~/(.*)$': '<rootDir>/src/$1'
  }
})

module.exports = {
  webpack,
  jest
}
