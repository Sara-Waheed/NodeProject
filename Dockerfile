# Use official Node.js LTS image
FROM node:14

# Set working directory
WORKDIR /app

# Copy only package files first to leverage Docker cache
COPY package*.json ./

# Install dependencies for production
RUN npm install --production

# Copy the rest of the app source
COPY . .

# Expose the app port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
