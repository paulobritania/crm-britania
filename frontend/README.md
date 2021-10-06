# Britania CRM Front Monorepo
> This monorepo contains web and mobile applications about Britania CRM solutions, developed with React and React Native, respectively.


Here are the packages that are applications into this monorepo: 

###### [`@britania-crm/doc`](http://gitlab.meta.com.br/britania/crm-comercial/source/front/-/tree/develop/doc)

###### [`@britania-crm/desktop-app`](http://gitlab.meta.com.br/britania/crm-comercial/source/front/-/tree/develop/packages/web/apps/DesktopApp)
###### [`@britania-crm/web-app`](http://gitlab.meta.com.br/britania/crm-comercial/source/front/-/tree/develop/packages/web/apps/WebApp)

## Getting start

#### Clone and Install
After the repository was cloned, run:

```sh
$ yarn && yarn lerna bootstrap
```

## Documentation
All web and mobile components that was developed for this project have an example captured by `@britania-crm/doc` package. You can access the online documentation [here](http://localhost:9009).


## Running
----

#### @britania-crm/desktop-app
```sh
# watch
$ yarn lerna run start --stream --scope @britania-crm/desktop-app
# or
$ cd packages/web/apps/DesktopApp && yarn start

# build 
# artifacts path: packages/web/apps/DesktopApp/dist
$ yarn lerna run build --stream --scope @britania-crm/desktop-app

$ yarn lerna run pack:mac --stream --scope @britania-crm/desktop-app
$ yarn lerna run pack:win --stream --scope @britania-crm/desktop-app
$ yarn lerna run pack:linux --stream --scope @britania-crm/desktop-app
# or
$ cd packages/web/apps/DesktopApp
$ yarn build
$ yarn pack:mac
$ yarn pack:win
$ yarn pack:linux
```

----

#### @britania-crm/web-app
```sh
# watch -> localhost:3333 
$ yarn lerna run start --stream --scope @britania-crm/web-app
# or
$ cd packages/web/apps/WebApp && yarn start
# 

# build -> localhost:8000
# artifacts path: packages/web/apps/WebApp/build
$ yarn lerna run build --stream --scope @britania-crm/web-app
$ yarn lerna run serve --stream --scope @britania-crm/web-app
# or
$ cd packages/web/apps/WebApp
$ yarn build
$ yarn serve
# 

```


### Environment
All applications use the [dots-env](https://www.npmjs.com/package/dots-env) to use multiple .env files.
