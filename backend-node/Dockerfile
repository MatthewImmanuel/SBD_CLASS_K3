# backend-node/Dockerfile
# Use the official Node.js runtime as the base image
FROM node:22

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files first
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Expose the port that the app runs on
EXPOSE 4000

# Start the server
CMD ["node", "index.js"]