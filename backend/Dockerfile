# Use an official Node.js runtime as the base image
FROM node:20-alpine

# Copy package.json and package-lock.json first to leverage Docker layer caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files, excluding node_modules (handled by .dockerignore)
COPY . .

# Copy the .env file if needed inside the container
COPY .env .env

# Expose port (default to 3000)
EXPOSE 3000

# Define the command to start the server (use index.js as the entry point)
CMD ["node", "index.js"]
