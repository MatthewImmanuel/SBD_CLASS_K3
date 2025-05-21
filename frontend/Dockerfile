# Use official Node image
FROM node:20

# Working directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest
COPY . .

# Expose port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]