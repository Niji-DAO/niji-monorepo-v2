FROM node:20-alpine

WORKDIR /app

# Install git, python3, and build dependencies (including canvas dependencies)
RUN apk add --no-cache \
    git \
    python3 \
    make \
    g++ \
    pkgconfig \
    cairo-dev \
    pango-dev \
    jpeg-dev \
    giflib-dev \
    librsvg-dev \
    pixman-dev && \
    ln -sf python3 /usr/bin/python

# Copy root config files first
COPY tsconfig*.json lerna.json /
COPY packages/nouns-webapp/package.json /app/
COPY packages/nouns-webapp/yarn.lock* /app/

# Copy all webapp files
COPY packages/nouns-webapp/ /app/

# Install dependencies (skip postinstall scripts initially)
RUN yarn install --ignore-scripts

# Install ts-node for lingui
RUN yarn add -D ts-node

# Run postinstall scripts after ts-node is available
RUN yarn postinstall || true

# Skip build step in Dockerfile - it will be built at runtime or use dev server

EXPOSE 3000

CMD ["yarn", "start"]