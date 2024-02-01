# Use the desired Node.js base image
FROM node:21.1.0-alpine as production

# Install @nestjs/cli globally
RUN yarn global add @nestjs/cli prisma@5.6.0 @prisma/client@5.6.0


# Install prisma globally
RUN yarn global add 
WORKDIR /usr/src/app



# Copy the rest of the application codemigrate deploy
COPY . .


RUN yarn install --verbose

RUN yarn run generate:auth:prisma
# Build the application
RUN yarn build auth

# Set the NODE_ENV environment variable to production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}


# Start the application

CMD [  "yarn", "start:auth:migrate:prod" ]
