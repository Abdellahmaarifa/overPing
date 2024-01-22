FROM node:20-alpine as development

CMD mkdir -p /app

WORKDIR /app

COPY . /app

# CMD "cat"
RUN npm install -g vite

RUN npm install 

EXPOSE 5173

CMD ["npm","run", "dev"]

FROM node:20-alpine as build

CMD mkdir -p /app

WORKDIR /app
#copy files client to container
COPY . /app/

# prepare for build
RUN npm install 
RUN npm run build

# prepare nginx
FROM nginx as production
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/
COPY --from=build app/dist /usr/share/nginx/html 

# start nginx
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]