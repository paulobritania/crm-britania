const fs = require('fs')
const path = require('path')

const originalFile = path.resolve(__dirname, '../src/html.js')

const doczPath = path.resolve(__dirname, '../.docz')
const srcPath = `${ doczPath }/src`
const newFile = `${ srcPath }/html.js`

if (!fs.existsSync(doczPath)) {
  fs.mkdirSync(doczPath)
}

if (!fs.existsSync(srcPath)) {
  fs.mkdirSync(srcPath)
}

fs.copyFileSync(originalFile, newFile)
