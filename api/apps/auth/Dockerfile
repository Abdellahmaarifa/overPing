# Use the desired Node.js base image
FROM node:21.1.0-alpine as development

RUN npm install -g @nestjs/cli
RUN npm install -g @prisma/client prisma 

WORKDIR /usr/src/app


# Copy package.json and package-lock.json (if exists) to leverage Docker cache
COPY package*.json ./

RUN npm install --verbose

# Copy the rest of the application code
COPY . .

RUN npm run build --silent
RUN prisma generate

FROM  node:21.1.0-alpine as production

RUN npm install -g @nestjs/cli --silent
RUN npm install -g prisma @prisma/client

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production --silent

# Copy the rest of the application code
COPY . .

# Copy the application code from the development stage
COPY --from=development /usr/src/app/dist  ./dist

RUN prisma generate

USER node

CMD ["node", "dist/apps/auth/main"]

