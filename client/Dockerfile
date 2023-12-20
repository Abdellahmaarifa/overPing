FROM node:20-alpine as development

WORKDIR /app

COPY . /app

RUN npm install --silent

EXPOSE 5173

CMD ["npm","run", "dev"]

FROM node:20-alpine as production

WORKDIR /app
#copy files client to container
COPY . /app/

# prepare for build
RUN npm install --silent
RUN npm run build

# prepare nginx
FROM nginx
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/
COPY --from=build app/build /usr/share/nginx/html 


# start nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]