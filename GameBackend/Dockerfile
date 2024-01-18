FROM node:20-alpine

CMD mkdir -p /game

WORKDIR /game

COPY . /game

#RUN npm install 

RUN npm install @nestjs/cli

RUN npm install -g prisma

EXPOSE 4055

RUN chmod +x ./script.sh

ENTRYPOINT ["/bin/sh", "./script.sh"]