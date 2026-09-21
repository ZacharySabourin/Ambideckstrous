# Ambideckstrous — Server

Express + MongoDB REST API, written in TypeScript.

## Setup

```bash
cp .env.example .env   # then fill in your Mongo URI, DB name, and collection name
npm install            # or run `npm install` from the repo root
```

## Scripts

| Script             | Description                                      |
| ------------------- | ------------------------------------------------- |
| `npm run dev`       | Runs the server with `tsx watch` (live reload)     |
| `npm run build`     | Compiles TypeScript to `dist/` via `tsc`           |
| `npm start`         | Runs the compiled server from `dist/app.js`        |
| `npm run typecheck` | Type-checks without emitting                       |
| `npm test`          | Runs the Mocha/Supertest suite against a live DB   |

## Environment variables

| Variable          | Description                                  |
| ------------------ | --------------------------------------------- |
| `PORT`             | Port the server listens on                    |
| `MONGO_URI`        | MongoDB connection string                     |
| `DB_NAME`          | Database name                                 |
| `CARD_COLLECTION`  | Name of the collection holding card documents |

## API

| Method | Route                          | Description                          |
| ------ | ------------------------------- | ------------------------------------- |
| GET    | `/api/v1/cards/:id`             | Fetch a single card by id             |
| GET    | `/api/v1/cards/named/:name`     | Fetch a single card by exact name     |
| GET    | `/api/v1/cards/search`          | Full-text search (`text`, `pageSize`, `page` query params) |

## Docker

```bash
docker build -t ambideckstrous-server .
docker run --env-file .env -p 8080:8080 ambideckstrous-server
```

The image is a multi-stage build: the `build` stage compiles TypeScript, and the `runtime`
stage only ships production dependencies plus the compiled `dist/` output.
