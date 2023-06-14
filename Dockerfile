# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json files for each package to their respective directories
COPY package*.json ./
COPY apps/replicator/package*.json ./apps/replicator/
COPY apps/client/package*.json ./apps/client/
COPY apps/server/package*.json ./apps/server/
# Add more COPY commands for each package in your monorepo

# Install dependencies for each package
RUN npm install
RUN cd apps/replicator && npm install
RUN cd apps/client && npm install
RUN cd apps/server && npm install
# Add more RUN commands for each package in your monorepo

# Copy the rest of the application code to the working directory
COPY . .

# Specify the command to run your application
CMD ["npm", "run", "start:replicator"]
