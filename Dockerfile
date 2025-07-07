# Dockerfile
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy all source code
COPY . .

# Expose port
EXPOSE 3000

# Start app
CMD ["node", "src/index.js"]
