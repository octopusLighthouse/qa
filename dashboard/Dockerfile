# Stage 1: Build the app
FROM node:18.16.0 as DEV

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install -g npm@9.7.2
RUN npm ci

# Copy the source code
COPY . .

# Build the app
RUN npm run build

# Install serve for serving the static files
RUN npm install -g serve

# Expose the desired port (change it to your desired port number)
EXPOSE 80

# Serve the app using the serve command
CMD ["serve", "-s", ".", "-l", "80"]
