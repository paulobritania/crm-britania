/* eslint-disable no-console */

const { execCommand } = require('dots-env')
const yargs = require('yargs')

const { argv } = yargs
  .usage('Usage: $0 <command> [options]')
  .options({
    name: {
      alias: 'n',
      choices: [
        'britania-crm-com-frontend-dev',
        'britania-crm-com-frontend-hml'
      ],
      default: 'britania-crm-com-frontend-dev',
      demandOption: false,
      describe: 'Name of docker container',
      nargs: 1
    },
    map: {
      alias: 'm',
      default: '3333',
      demandOption: false,
      describe: 'Port that will be mapping to container:80',
      nargs: 1
    }
  })

const run = async () => {
  try {
    const argvException = [
      { param: '--name', hasValue: true },
      { param: '-n', hasValue: true },

      { param: '--map', hasValue: true },
      { param: '-m', hasValue: true }
    ]

    console.group()
    console.info(`docker => container ${ argv.name }`)

    try {
      await execCommand(`docker stop ${ argv.name }`, {}, argvException)
      await execCommand(`docker rm ${ argv.name }`, {}, argvException)
    } catch (e) {
      console.warn('docker => container not yet initialized. Creating...')
    }

    console.info(`docker build -t ${ argv.name } .`)
    await execCommand(`docker build -t ${ argv.name } .`, {}, argvException)

    console.info('docker => builded')

    await execCommand(`docker run -t -d -p ${ argv.map }:80 --name ${ argv.name } ${ argv.name }`, {}, argvException)
    console.info(`docker => running on http://localhost:${ argv.map }`)
  } catch (err) {
    console.error('docker => Error on create docker container', err)
  }

  console.groupEnd()
}

run()
