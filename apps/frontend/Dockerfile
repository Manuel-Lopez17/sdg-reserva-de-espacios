# Use Node 18 Alpine as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /src

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install

# Copy the rest of the frontend project files
COPY . .

# Expose the port for the frontend app
EXPOSE 5173

# Run the frontend app
CMD ["pnpm", "run", "dev", "--host"]
