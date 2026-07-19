# Backend AI - PostgreSQL & Docker Assignment

## Overview

This project is a simple Express.js REST API for managing places. The original version used an in-memory array to store data. For this assignment, the application was updated to use PostgreSQL running inside Docker while keeping the existing API routes and application structure unchanged.

## Technologies Used

- Node.js
- Express.js
- PostgreSQL
- Docker
- Docker Compose

## Project Structure

```
backend-ai/
├── controllers/
├── routes/
├── models/
├── db-init/
│   └── init.sql
├── app.js
├── db.js
├── Dockerfile
├── docker-compose.yml
├── package.json
├── .env.example
└── README.md
```

## Setup

1. Clone the repository.

```bash
git clone <your-repository-url>
cd backend-ai
```

2. Create a `.env` file using the provided template.

```bash
cp .env.example .env
```

3. Start the application and PostgreSQL database.

```bash
docker-compose up --build
```

The API will be available at:

```
http://localhost:3000
```

## API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/places/:pid` | Get a place by ID |
| GET | `/api/places/user/:uid` | Get places by user |
| POST | `/api/places` | Create a new place |
| PATCH | `/api/places/:pid` | Update a place |
| DELETE | `/api/places/:pid` | Delete a place |

## Persistence Test

To verify persistence:

1. Started the application using `docker-compose up --build`.
2. Created a new place through the API.
3. Stopped the containers using `docker-compose down`.
4. Started the application again.
5. Confirmed that the previously created data was still available in PostgreSQL.

## Notes

The in-memory data store was replaced with PostgreSQL while keeping the API routes unchanged. Docker Compose is used to start both the Express application and PostgreSQL database together, and a Docker volume ensures that data persists across container restarts.
