FROM node:15-alpine

WORKDIR /usr/local/app/migrations-manager

COPY ./ /usr/local/app/

COPY ./migrations-manager .

RUN chmod 777 ./migrations -R

RUN cd /usr/local/app/migrations-manager \
  && yarn
