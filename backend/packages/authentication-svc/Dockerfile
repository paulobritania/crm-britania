FROM node:14-alpine

WORKDIR /usr/src/app

COPY package*.json tsconfig*.json ./

RUN npm install --production

RUN npm i -g @nestjs/cli

COPY src/ src/

RUN npm run build

RUN rm -r src

CMD npm run start:prod
