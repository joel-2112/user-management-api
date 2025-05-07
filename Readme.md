# User Management System

A microservices-based User Management API built with Node.js, Express.js, and PostgreSQL.

## Structure
- `user-service`: Handles user-related operations (registration, login, CRUD).

## Setup
1. Install Node.js, PostgreSQL, and Docker.
2. Clone the repository: `git clone https://github.com/your-username/user-management.git`.
3. Navigate to `user-service`: `cd user-service`.
4. Install dependencies: `npm install`.
5. Set up `.env` with `DATABASE_URL` and `JWT_SECRET`.
6. Run migrations: `npx prisma migrate dev --name init`.
7. Start the server: `npm start`.

## Endpoints
- `GET /health`: Check server and database status.