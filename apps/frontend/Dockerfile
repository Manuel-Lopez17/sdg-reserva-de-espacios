# apps/frontend/Dockerfile

# Use Node 18 Alpine as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy only the necessary files
COPY package.json pnpm-lock.yaml ./

# Enable and install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install

# Copy the rest of the app
COPY . .

# Expose the port for Vite
EXPOSE 5173

# Start the app
CMD ["pnpm", "run", "dev", "--host"]
