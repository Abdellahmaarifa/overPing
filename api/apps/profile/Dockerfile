# Use the desired Node.js base image
FROM node:21.1.0-alpine as development

# Install @nestjs/cli globally
RUN yarn global add @nestjs/cli prisma@5.6.0 @prisma/client@5.6.0

WORKDIR /usr/src/app


# Install dependencies

# Copy the rest of the application code
COPY . .

RUN yarn install --verbose

RUN yarn run generate:profile:prisma
# Build the application
RUN yarn build

# Generate Prisma client
RUN prisma generate

# Create a new image for production
FROM node:21.1.0-alpine as production

# Install @nestjs/cli globally
RUN yarn global add @nestjs/cli

# Install prisma globally
RUN yarn global add prisma @prisma/client

# Set the NODE_ENV environment variable to production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

# Copy package.json and yarn.lock to leverage Docker cache
COPY package*.json yarn.lock ./

# Install only production dependencies
RUN yarn install --production 

# Copy the rest of the application code
COPY . .

# Copy the application code from the development stage
COPY --from=development /usr/src/app/dist ./dist

# Generate Prisma client
RUN prisma generate

# Switch to a non-root user for running the application
USER node

# Start the application
CMD ["node", "dist/apps/profile/main"]