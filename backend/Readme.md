# Britania CRM COM
## How to Run

### System Requirements
- [Node.js](https://nodejs.org/en/) - v14.15.5 LTS (recommended)
- [Docker](https://www.docker.com/products/docker-desktop) - latest version is recommended

1. Clone the project
  ```bash
    http://gitlab.meta.com.br/britania/crm-comercial/source/backend.git
  ```

2. On the Terminal, go into the project's root folder (`cd /project/root/folder`) and execute:
```bash
  yarn lerna bootstrap
```

3. To run, execute `yarn start`. The start script will install all npm dependencies for all projects, lint the code, compile the code, build the artifacts (Docker images) and run them via `docker-compose`.

### Tips for development

1. Running containers for development purpose, edit `docker-compose.dev.yml`, find the api gateway service and update the HOST variable with your local IP address.

2. To run containers in your local enviroment:
```bash
  yarn docker:dev:start
```

### The database

About the database, this project is configured to use the same database container used on CRM AT project. So, just make sure you already have this container ON and use any preferred database client of your choice to access it and create the database `britania_crm_com`.

After logging into the database with your database management client, and creating the database as mentioned above, navigate into packages/migrations-manager and:

1. Copy/create the .env from .env.example file.
2. Run `yarn migrate:up` or `npm run migrate:up`
