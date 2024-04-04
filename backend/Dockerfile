# Use an official Node.js LTS image as base
FROM node:lts

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 5001
EXPOSE 5001

# Command to run the backend server
CMD ["node", "app.js"]
