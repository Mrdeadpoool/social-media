# Use an official Node.js runtime as a parent image
FROM node:20

# Set the working directory in the container
WORKDIR /

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose a port (if your NestJS app listens on a specific port)
EXPOSE 3000

# Define the command to run your application
CMD ["npm", "start"]
