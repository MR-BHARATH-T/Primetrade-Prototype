# Primetrade (Monorepo)

Frontend-first full-stack app with:

- React + TailwindCSS (client)
- Node.js + Express + MongoDB (server)
- JWT authentication using **httpOnly cookies**
- Tasks CRUD with search + filter

## Folder Structure

- `client/` React application
- `server/` Express API

## Prerequisites

- Node.js 18+ recommended
- MongoDB (local or Atlas)

## Environment Variables

Create `server/.env`:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/primetrade
JWT_SECRET=change_me_in_production
JWT_EXPIRES_IN=15m
CLIENT_ORIGIN=http://localhost:5173
NODE_ENV=development
```

## Install

From repo root:

```bash
npm install
```

## Run (dev)

```bash
npm run dev
```

- Client: `http://localhost:5173`
- Server: `http://localhost:5000`

## API (base: `/api/v1`)

### Auth

- `POST /auth/register` `{ name, email, password }`
- `POST /auth/login` `{ email, password }`
- `POST /auth/logout`

### User (protected)

- `GET /users/me`
- `PATCH /users/me` `{ name }`

### Tasks (protected)

- `POST /tasks` `{ title, description?, status? }`
- `GET /tasks?search=&status=`
- `PATCH /tasks/:id`
- `DELETE /tasks/:id`

## Frontend-Backend Communication

- The server sets a JWT as an **httpOnly cookie** on login/register.
- The client uses `fetch` with `credentials: "include"` so cookies are sent automatically.
- Protected endpoints verify the cookie JWT in middleware.

## Production Scaling Notes

- Add refresh-token rotation (httpOnly cookie) + short-lived access tokens.
- Add rate limiting, audit logging, and request tracing.
- Split modules (`auth`, `users`, `tasks`) into separate services later; the current folder structure supports this.
- Put the API behind a reverse proxy (Nginx) and enable HTTPS so `secure` cookies can be used.

## Postman

Import `postman_collection.json` from repo root.
