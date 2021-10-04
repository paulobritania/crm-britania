const { version } = require('@britania-crm/doc/package.json')
const colors = require('@britania-crm/styles/colors')

const mainNodeModules = '../node_modules'
const corePath = '../packages/core'
const webComponentsPath = '../packages/web/components'

export default {
  files: [
    'src/pages/*.mdx',
    `${ corePath }/**/*.mdx`,
    `${ webComponentsPath }/**/*.mdx`
  ],
  title: `@britania-crm frontend - v${ version }`,
  port: 9009,
  host: '0.0.0.0',
  dest: 'dist',
  menu: [
    'Getting Started',
    'Core',
    'Components'
  ],
  ignore: [
    `${ corePath }/*/node_modules`,
    `${ webComponentsPath }/node_modules`
  ],
  docgenConfig: {
    searchPatterns: [
      `${ corePath }/**/*.js`,
      `${ webComponentsPath }/**/*.js`,
      `${ mainNodeModules }/@meta-*/**/*.js`
    ]
  },
  themeConfig: {
    fonts: { monospace: '\'Fira Code\'' },
    fontSizes: [15, 13, 14, 14, 20, 24, 32, 48, 64],
    styles: {
      code: { fontFamily: 'monospace' },
      inlineCode: { fontFamily: 'monospace' },
      playground: {}
    },
    colors: {
      modes: {
        dark: {
          primary: colors.secondary.main,
          link: colors.secondary.main,
          sidebar: { navLinkActive: colors.secondary.main },
          props: { highlight: colors.secondary.main },
          header: {
            bg: colors.primary.main,
            text: colors.secondary.main,
            button: {
              bg: colors.white,
              color: colors.secondary.main
            }
          },
          playground: {
            bg: colors.white,
            color: colors.text
          }
        },
        light: {
          primary: colors.primary.main,
          link: colors.secondary.main,
          sidebar: { navLinkActive: colors.primary.main },
          props: { highlight: colors.primary.main },
          header: {
            bg: colors.white,
            text: colors.primary.main,
            button: {
              bg: colors.primary.main,
              color: colors.secondary.main
            }
          }
        }
      }
    }
  }
}
