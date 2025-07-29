FROM node:20-alpine

WORKDIR /app

# Install git, python3, and build dependencies
RUN apk add --no-cache git python3 make g++ && \
    ln -sf python3 /usr/bin/python

# Copy root config files first
COPY tsconfig*.json lerna.json /
COPY packages/nouns-subgraph/package.json /app/
COPY packages/nouns-subgraph/yarn.lock* /app/

# Copy all subgraph files
COPY packages/nouns-subgraph/ /app/

# Install dependencies
RUN yarn install

CMD ["sh", "-c", "yarn codegen && yarn build"]