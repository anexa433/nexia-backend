# Use a lightweight Node.js image
FROM node:18-slim

# Create app directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install --production

# Copy the rest of the project
COPY . .

# Expose the port your app will run on
EXPOSE 3000

# Start the server
CMD ["node", "index.js"]
