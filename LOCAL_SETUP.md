# Local Development Setup

This guide provides two methods to run all Nouns protocol components locally: using Docker or npm scripts.

## Components

The local setup includes:
- **nouns-contracts**: Smart contracts (Hardhat node)
- **nouns-webapp**: React frontend application
- **nouns-subgraph**: Graph Protocol indexer
- Supporting services: PostgreSQL, IPFS, Graph Node

## Prerequisites

### Common Requirements
- Node.js 18+ and Yarn
- Git

### For Docker Setup
- Docker and Docker Compose
- At least 8GB of available RAM

### For NPM Setup
- Docker (for PostgreSQL and IPFS only)
- Additional 4GB of available RAM

## Environment Setup

Each package has its own environment configuration:

### 1. Nouns Contracts
```bash
cd packages/nouns-contracts
cp .env.example .env
```
Update with your credentials:
- `INFURA_PROJECT_ID`: Get from [Infura](https://infura.io)
- `ETHERSCAN_API_KEY`: Get from [Etherscan](https://etherscan.io/apis)
- Keep the default `MNEMONIC` for local development

### 2. Nouns WebApp
The webapp already has a `.env` file with default values. If needed, update:
- `REACT_APP_INFURA_PROJECT_ID`: Your Infura project ID

### 3. Nouns Bots (Optional)
```bash
cd packages/nouns-bots
cp .env.example .env
```
Configure social media credentials if needed.

## Method 1: Docker Setup

**Note**: The full Docker setup is complex and may take a long time to build. We recommend using Method 2 (NPM Scripts) for development.

### Simple Docker Setup (Infrastructure Only)

```bash
# Start only the infrastructure services with Docker
docker run --name nouns-postgres -e POSTGRES_USER=graph-node -e POSTGRES_PASSWORD=let-me-in -e POSTGRES_DB=graph-node -e POSTGRES_INITDB_ARGS="-E UTF8 --locale=C" -p 5432:5432 -d postgres:14
docker run --name nouns-ipfs -p 5001:5001 -p 8080:8080 -d ipfs/go-ipfs:v0.10.0
docker run --name nouns-graph-node -p 8000:8000 -p 8001:8001 -p 8020:8020 -p 8030:8030 -p 8040:8040 --add-host=host.docker.internal:host-gateway -e postgres_host=host.docker.internal -e postgres_user=graph-node -e postgres_pass=let-me-in -e postgres_db=graph-node -e ipfs=host.docker.internal:5001 -e ethereum=mainnet:http://host.docker.internal:8545 -e GRAPH_LOG=info -d graphprotocol/graph-node

# Then use npm scripts for the application services (see Method 2)
```

### Full Docker Setup (Advanced)

**🚀 One-Command Docker Start:**
```bash
# Build and start all services in one command (takes 10+ minutes)
yarn docker:start

# View logs
yarn docker:logs

# Stop all services
yarn docker:down
```

**Manual Docker Setup:**
```bash
# Build first, then start
yarn docker:build
yarn docker:up

# View logs
yarn docker:logs

# Stop all services
yarn docker:down
```

### Docker Commands

- `yarn docker:start` - 🚀 Build and start all services in one command
- `yarn docker:up` - Start all services in detached mode (must build first)
- `yarn docker:down` - Stop all services
- `yarn docker:build` - Build all Docker images (takes 10+ minutes)
- `yarn docker:logs` - View logs from all services
- `yarn clean:docker` - Remove all containers and volumes

## Method 2: NPM Scripts Setup (Recommended for Development)

### 🚀 One-Command Start (Easiest)

```bash
# Install root dependencies first
yarn install

# Start everything with one command!
yarn start
```

This single command will:
1. Start PostgreSQL, IPFS, and Graph Node (Docker containers)
2. Start Hardhat node
3. Deploy and setup the subgraph
4. Start the webapp

To stop everything:
```bash
yarn stop
```

### Manual Setup (Step by Step)

**Step 1: Install Dependencies**
```bash
# Install root dependencies
yarn install

# Install package dependencies
cd packages/nouns-contracts && yarn install
cd ../nouns-subgraph && yarn install  
cd ../nouns-webapp && yarn install
cd ../..
```

**Step 2: Start Infrastructure Services**
```bash
# Start PostgreSQL for Graph Node (with correct locale)
docker run --name nouns-postgres -e POSTGRES_USER=graph-node -e POSTGRES_PASSWORD=let-me-in -e POSTGRES_DB=graph-node -e POSTGRES_INITDB_ARGS="-E UTF8 --locale=C" -p 5432:5432 -d postgres:14

# Start IPFS
docker run --name nouns-ipfs -p 5001:5001 -p 8080:8080 -d ipfs/go-ipfs:v0.10.0

# Start Graph Node
docker run --name nouns-graph-node -p 8000:8000 -p 8001:8001 -p 8020:8020 -p 8030:8030 -p 8040:8040 --add-host=host.docker.internal:host-gateway -e postgres_host=host.docker.internal -e postgres_user=graph-node -e postgres_pass=let-me-in -e postgres_db=graph-node -e ipfs=host.docker.internal:5001 -e ethereum=mainnet:http://host.docker.internal:8545 -e GRAPH_LOG=info -d graphprotocol/graph-node
```

**Step 3: Start Hardhat Node**
```bash
# In Terminal 1
cd packages/nouns-contracts
npx hardhat node
```

**Step 4: Deploy Subgraph**
```bash
# In Terminal 2 (after Hardhat node is running)
cd packages/nouns-subgraph
yarn prepare:hardhat
yarn codegen
yarn build
yarn create:localnode nounsdao/nouns-subgraph
yarn deploy:localnode nounsdao/nouns-subgraph
```

**Step 5: Start WebApp**
```bash
# In Terminal 3
cd packages/nouns-webapp
yarn start
```

### Service URLs
- **Hardhat Node**: http://localhost:8545
- **Graph Node GraphQL**: http://localhost:8000/subgraphs/name/nounsdao/nouns-subgraph
- **Graph Node Playground**: http://localhost:8000/subgraphs/name/nounsdao/nouns-subgraph/graphql
- **Nouns WebApp**: http://localhost:3001 (Docker) / http://localhost:3000 (NPM)
- **IPFS Gateway**: http://localhost:8080
- **PostgreSQL**: localhost:5432

### Quick Start (Basic - contracts and webapp only)

```bash
# Terminal 1: Start Hardhat node
cd packages/nouns-contracts && npx hardhat node

# Terminal 2: Start webapp
cd packages/nouns-webapp && yarn start
```

This starts only:
- Hardhat node on port 8545
- WebApp on port 3000 (without subgraph data) - Note: When using Docker, webapp runs on port 3001

### Full Setup (All components)

For a complete setup with all services:

```bash
# Install dependencies
yarn install

# Prepare contracts
yarn prepare

# Start all services including databases
yarn dev:all
```

This starts all components including PostgreSQL, IPFS, and Graph Node using Docker containers.

### Manual Step-by-Step Setup

If you prefer to start services individually:

```bash
# Terminal 1: Start Hardhat node
yarn dev:contracts

# Terminal 2: Start PostgreSQL (required for Graph Node)
yarn dev:postgres

# Terminal 3: Start IPFS (required for Graph Node)
yarn dev:ipfs

# Terminal 4: Start Graph Node
yarn dev:graph-node

# Terminal 5: Deploy contracts and subgraph
yarn setup:local

# Terminal 6: Start webapp
yarn dev:webapp

```

### NPM Script Commands

#### Development Commands
- `yarn dev` - Start core services (contracts, subgraph, webapp)
- `yarn dev:all` - Start all services including databases
- `yarn dev:contracts` - Start Hardhat node
- `yarn dev:subgraph` - Start subgraph development
- `yarn dev:webapp` - Start webapp
#### Database/Service Commands
- `yarn dev:postgres` - Start PostgreSQL container
- `yarn dev:ipfs` - Start IPFS container
- `yarn dev:graph-node` - Start Graph Node

#### Setup Commands
- `yarn setup:local` - Install, prepare, and deploy everything
- `yarn contracts:deploy:local` - Deploy contracts to local node
- `yarn subgraph:deploy:local` - Deploy subgraph to local Graph Node

## Troubleshooting

### Port Conflicts
If you encounter port conflicts, check for running services:
```bash
# Check what's using a port (e.g., 8545)
lsof -i :8545

# Kill process using a port
kill -9 <PID>
```

### Docker Issues
- Ensure Docker daemon is running
- Check Docker memory allocation (Settings > Resources)
- Clean up Docker resources: `docker system prune -a`

### Graph Node Issues
- Ensure PostgreSQL and IPFS are running before starting Graph Node
- Check Graph Node logs for connection errors
- Verify ethereum connection in Graph Node environment

### Contract Deployment Issues
- Ensure Hardhat node is fully started before deploying
- Check for compilation errors: `cd packages/nouns-contracts && yarn compile`
- Verify your `.env` file has correct values

### WebApp Connection Issues
- Ensure `REACT_APP_CHAIN_ID=31337` for local development
- Verify Hardhat node is accessible at http://localhost:8545
- Check browser console for specific errors

## Development Workflow

1. **Make contract changes**:
   - Edit contracts in `packages/nouns-contracts`
   - Redeploy: `yarn contracts:deploy:local`

2. **Update subgraph**:
   - Edit subgraph in `packages/nouns-subgraph`
   - Regenerate and redeploy: `yarn subgraph:deploy:local`

3. **Frontend development**:
   - WebApp hot-reloads automatically
   - Changes in `packages/nouns-webapp/src` are reflected immediately

## Cleanup

### Docker Cleanup
```bash
# Stop and remove all containers/volumes
yarn clean:docker
```

### NPM Setup Cleanup
```bash
# Stop running processes (Ctrl+C in each terminal)

# Remove Docker containers
docker stop nouns-postgres nouns-ipfs nouns-graph-node
docker rm nouns-postgres nouns-ipfs nouns-graph-node

# Clean build artifacts
yarn clean
```

## Additional Resources

- [Hardhat Documentation](https://hardhat.org/docs)
- [Graph Protocol Docs](https://thegraph.com/docs)
- [Docker Compose Reference](https://docs.docker.com/compose/)

## Need Help?

If you encounter issues:
1. Check the logs of the failing service
2. Ensure all prerequisites are installed
3. Verify environment variables are set correctly
4. Open an issue with detailed error messages