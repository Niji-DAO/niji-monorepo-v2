FROM node:20-alpine

WORKDIR /app

# Install git and other dependencies
RUN apk add --no-cache git python3 make g++

# Copy root config files first
COPY tsconfig*.json lerna.json /
COPY packages/nouns-contracts/package.json /app/
COPY packages/nouns-contracts/yarn.lock* /app/

# Copy all contracts files
COPY packages/nouns-contracts/ /app/

# Install dependencies without running postinstall scripts
RUN yarn install --ignore-scripts

# Install TypeScript, ts-node and required types without running postinstall
RUN yarn add -D typescript ts-node @types/node --ignore-scripts

# Verify installation
RUN ls -la node_modules/.bin/ | grep -E "ts-node|typescript" || echo "TypeScript binaries not found"
RUN ls -la node_modules/ | grep -E "typescript|ts-node" || echo "TypeScript modules not found"

EXPOSE 8545

# Set environment variables to help hardhat find ts-node
ENV NODE_PATH=/app/node_modules
ENV TS_NODE_PROJECT=/app/tsconfig.json

# Skip compilation during build, run hardhat node directly
CMD ["sh", "-c", "/app/node_modules/.bin/hardhat node --hostname 0.0.0.0"]