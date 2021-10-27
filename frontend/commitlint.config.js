module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-case': [
      0,
      'always',
      [
        'lower-case', // default
        'upper-case' // UPPERCASE
      ]
    ],
    'type-enum': [
      0,
      'always',
      ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'revert', 'WIP']
    ]
  }
}
