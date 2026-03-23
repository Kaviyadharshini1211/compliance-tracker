# Use Node
FROM node:18

# Create app directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Expose port (Render uses dynamic PORT)
EXPOSE 5000

# Start server
CMD ["node", "server.js"]