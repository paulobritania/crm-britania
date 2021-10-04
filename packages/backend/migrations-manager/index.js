const fs = require('fs-extra')
const FileSet = require('file-set');
const Umzug = require('umzug');

const db = require('./database')

const migrationsFileset = new FileSet('../**/src/database/migrations/*.js');
const seedersFileset = new FileSet('../**/src/database/seeders/*.js');

const umzug = new Umzug({
  storage: 'sequelize',
  logging: function() {
    console.log.apply(null, arguments);
  },
  storageOptions: {
    sequelize: db.sequelize
  },
  migrations: {
    params: [
      db.sequelize.getQueryInterface(),
      db.Sequelize
    ],
    path: './files',
    pattern: /\.js$/
  }
});

const args = process.argv.slice(2);

const downMigrationsAndSeeders = async (step) => {
  await copySeeders();
  await copyMigrations();
  await umzugDown(step);
}

const upMigrationsAndSeeders = async () => {
  await copyMigrations();
  await copySeeders();
  await umzugUp();
}

const copyMigrations = async () => {
  console.log("\n===== Copying migrations =====\n")
  return Promise.all(
    migrationsFileset.files.map(async migration => {
      const filename = migration.split('migrations/')[1]
      return fs.copySync(migration, `./files/${filename}`)
    })
  )
}

const copySeeders = async () => {
  console.log("\n===== Copying seeders =====\n")
  return Promise.all(
    seedersFileset.files.map(async (seed) => {
      const filename = seed.split('seeders/')[1]
      return fs.copySync(seed, `./files/${filename}`)
    })
  )
}

const umzugUp = async () => {
  console.log("===== Running migrations and seeders =====\n")
  await umzug.up().then(() => {
    console.log('===== Migrations and seeders executed with success =====')
  }).catch(e =>  {
    console.log(e)
  });
}

const umzugDown = async () => {
  console.log("===== Rolling back migrations and seeders =====")
  await umzug.down().then(() => {
    console.log('===== Migrations and Seeders rolled back with success =====')
  });
}

const removeFiles = async () => {
  console.log("\n===== Removing migrations and seeders =====")

  fs.readdir('./files', (err) => {
    if (err) throw err;
    migrationsFileset.files.map(async path => {
      const filename = path.split('migrations/')[1]
      fs.remove(`./files/${filename}`, err => {
        if (err) throw err;
      });
    })

    seedersFileset.files.map(async path => {
      const filename = path.split('seeders/')[1]
      fs.remove(`./files/${filename}`, err => {
        if (err) throw err;
      });
    })

    console.log('===== Migration and Seeders removed with success =====')
  });
}

const main = async () => {
  const stepsArg = args[1] && args[1].split('=').pop()
  const stepsValue = stepsArg ? parseInt(stepsArg) : 1
  const step = Number.isInteger(stepsValue) ? stepsValue : 1

  if(args[0] == 'up') {
    await upMigrationsAndSeeders();
  } else if (args[0] == 'down') {
    await downMigrationsAndSeeders(step);
  } else {
    console.error("\nInvalid command!")
    return console.log('Valid commands are: yarn migrate up | yarn migrate down\n')
  }

  removeFiles();
}

main();
