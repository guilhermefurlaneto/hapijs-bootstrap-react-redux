# APP

### Development Requirements

- Docker
- Docker Compose

- NodeJS v6.11.3
- NPM
- Yarn `npm install -g yarn`

### Environment Variables

1. Create a copy of the `.env` file with the name `local.env`: `cp .env local.env`
2. Update the content of the `local.env`;

### Install dependencies

1. Run: `yarn install`

### To run the application

1. Server and Database:
- Linux/Mac OS: `$ make compose-server`
- Windows: `docker-compose up crm-db web`

It will load the server application on port 3000

2. Front-End development:
- Linux/Mac OS: `$ make start-dev`
- Windows: `yarn start`

It will run webpack development server on port 4000 and will proxy all requests to the port 3000;

### Migrations

- To create a migration use the command: `node_modules/.bin/mariner create <migration name>`

- To migrate up use on the container : `make container-migrate-up`

- To migrate down use on the container : `make container-migrate-down`
