FROM node:14-alpine

WORKDIR /usr/src/app

# Adding lerna dependencies
COPY /package.json .
COPY /lerna.json .
COPY /yarn.lock .

# Adding auth-utils package to container
COPY /packages/backend/shared/auth-utils/package.json ./packages/shared/auth-utils/
COPY /packages/backend/shared/auth-utils/tsconfig.json ./packages/shared/auth-utils/
COPY /packages/backend/shared/auth-utils/build/ ./packages/shared/auth-utils/build

# Adding notifications-utils package to container
COPY /packages/backend/shared/notifications-utils/package.json ./packages/shared/notifications-utils/
COPY /packages/backend/shared/notifications-utils/tsconfig.json ./packages/shared/notifications-utils/
COPY /packages/backend/shared/notifications-utils/build/ ./packages/shared/notifications-utils/build

# Adding service files to container
COPY /packages/backend/services-svc/package.json ./packages/services-svc/
COPY /packages/backend/services-svc/tsconfig*.json ./packages/services-svc/
COPY /packages/backend/services-svc/src ./packages/services-svc/src
COPY /packages/backend/services-svc/files ./packages/services-svc/files

# Installing lerna globally
RUN yarn --silent global add lerna

# Installing nestjs globally
RUN yarn --silent global add @nestjs/cli

# Running bootstrap command to instal dependencies in all packages
RUN lerna bootstrap

# Setting workdir to service directory
WORKDIR /usr/src/app/packages/services-svc

# Building production files
RUN yarn build

# Removing unnecessary files
RUN rm -r src

# Starting service in production mode
CMD yarn start:prod
