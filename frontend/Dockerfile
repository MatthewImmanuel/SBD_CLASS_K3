# frontend/Dockerfile
# Use Node.js as the base image for building the frontend
FROM node:22 AS builder

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the frontend
RUN npm run build

# Use Nginx as the base image for serving the built frontend
FROM nginx:alpine

# Remove the default Nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy the built frontend files to Nginx's default root directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy the custom Nginx configuration from project root
COPY ../nginx.conf /etc/nginx/conf.d/

# Expose the port that Nginx listens on
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]