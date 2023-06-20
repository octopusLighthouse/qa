# Use the official Node.js 16.16.0 LTS image as the base image
FROM node:18.16.0 as DEV

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Copy the source code to the container
COPY . .

# Install the dependencies
RUN npm install

# Build the NestJS application
RUN npm run build

# Expose the port that the application listens on
EXPOSE 3000

# Set the command to run the application
CMD [ "node", "dist/main" ]