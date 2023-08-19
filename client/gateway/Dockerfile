FROM node:20-alpine as build
WORKDIR /app
COPY . /app/

RUN npm install --silent
RUN npm run build


FROM node:20-alpine
WORKDIR /app

COPY --from=build /app/build /app/
COPY package.json /app/package.json


RUN npm install --silent
RUN apk add --no-cache bash


EXPOSE 5500 