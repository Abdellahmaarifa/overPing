# Use Node.js 20 on Alpine as the base
FROM node:20-alpine

WORKDIR /app

# Copy package.json and package-lock.json to workdir
COPY user-microservice/package*.json ./

# Install Prisma Client
RUN npx prisma generate

# Install nodemon globally and other dependencies
RUN npm install -g nodemon --silent
# RUN npm cache clean --force
RUN npm install

# Add bash
RUN apk add --no-cache bash

# Copy the entire project to the workdir.
COPY ./user-microservice .

# Expose the port that the app will run on
EXPOSE 3000

# Define the command to run the app
CMD ["npm", "run", "start:dev"]
