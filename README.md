# Hotel Full Stack Platform

Monorepo for a hotel and hospitality system with:

- Public website (`frontend/`) built with Next.js
- Admin dashboard (`Admin/`) built with React + Vite
- Backend API (`backend/`) built with Node.js, Express, Prisma, and PostgreSQL

## Project Structure

```text
.
├── frontend/   # Public guest-facing website (Next.js)
├── Admin/      # Admin panel for hotel operations (React + Vite)
├── backend/    # REST API, auth, CMS, analytics, uploads
└── PROJECT_DOCUMENTATION.md
```

## Tech Stack

- Frontend: Next.js 16, React 19, Tailwind CSS
- Admin: Vite, React 19, TypeScript, Tailwind CSS
- Backend: Node.js, Express, Prisma ORM, PostgreSQL
- Auth: JWT + role-based access control
- Media: Cloudinary
- Email: SMTP (Nodemailer)

## Features

### Public Website (`frontend/`)

- Home, about, rooms, booking, gallery, restaurant, and contact pages
- Server-rendered data fetching from backend API
- Settings-aware content (currency, contact info, etc.)

### Admin Dashboard (`Admin/`)

- Admin authentication flow
- CRUD management for rooms, services, gallery, pages, settings
- Message moderation and replies
- Analytics and audit-log views

### Backend API (`backend/`)

- Auth: login + profile endpoints
- Rooms, services, gallery, pages, settings management
- Contact message intake + admin reply workflow
- Analytics summaries and audit logging
- Prisma schema for users, rooms, bookings, messages, settings, pages, and more

## Prerequisites

- Node.js 18+
- npm 9+
- PostgreSQL 14+
- Cloudinary account (for image uploads)
- SMTP credentials (for message reply emails)

## Quick Start

### 1. Clone and install dependencies

From the repository root:

```bash
cd backend && npm install
cd ../frontend && npm install
cd ../Admin && npm install
```

### 2. Configure backend environment

Create `backend/.env` from the example:

```bash
cd backend
cp .env.example .env
```

Recommended `backend/.env` template:

```env
NODE_ENV=development
PORT=5000
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/hotel_db?schema=public"
JWT_SECRET="replace-with-a-long-random-secret"

# Cloudinary
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_cloudinary_key"
CLOUDINARY_API_SECRET="your_cloudinary_secret"

# Admin seed account
ADMIN_NAME="Hotel Admin"
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="change-me-before-using"

# SMTP (for admin replies to contact messages)
SMTP_HOST="smtp.example.com"
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER="smtp-user@example.com"
SMTP_PASS="smtp-password"
SMTP_FROM="Hotel <no-reply@example.com>"
```

### 3. Configure frontend/admin API URLs

Public website (`frontend/.env.local`):

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

Admin panel (`Admin/.env`):

```env
VITE_API_URL=http://localhost:5000/api/v1
```

### 4. Prepare database

```bash
cd backend
npx prisma generate
npx prisma db push
npm run seed:admin
```

Optional sample data seed:

```bash
cd backend
node prisma/seed.js
```

## Running the Apps

Run each app in its own terminal.

### Backend API

```bash
cd backend
npm start
```

Backend runs on `http://localhost:5000`.

### Public Frontend

```bash
cd frontend
npm run dev
```

Frontend runs on `http://localhost:3000`.

### Admin Dashboard

```bash
cd Admin
npm run dev
```

Admin usually runs on `http://localhost:5173`.

## API Base Routes

Base URL: `http://localhost:5000/api/v1`

- `/auth`
- `/rooms`
- `/services`
- `/gallery`
- `/messages`
- `/settings`
- `/pages`
- `/analytics`
- `/audit-logs`

## Useful Scripts

### Backend (`backend/package.json`)

- `npm start` - Start API server
- `npm run prisma:generate` - Generate Prisma client
- `npm run seed:admin` - Create/update admin user
- `npm run test:email` - Validate SMTP credentials

### Frontend (`frontend/package.json`)

- `npm run dev` - Start Next.js dev server
- `npm run build` - Build production bundle
- `npm run start` - Start production server

### Admin (`Admin/package.json`)

- `npm run dev` - Start Vite dev server
- `npm run build` - Type-check and build
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Current Notes

- Root `PROJECT_DOCUMENTATION.md` contains detailed module status and requirements notes.
- Some backend modules exist in schema/service structure but may still be under active development.

## Deployment Notes (High-Level)

- Deploy `backend/` as a Node.js service with PostgreSQL connection.
- Deploy `frontend/` as a Next.js app.
- Deploy `Admin/` as a static Vite build served via CDN or web server.
- Set production environment variables for each app.

## Troubleshooting

- CORS/API errors: confirm `NEXT_PUBLIC_API_URL` and `VITE_API_URL` both point to the backend.
- 401 from admin endpoints: ensure JWT token is present and valid.
- Image upload failures: verify Cloudinary env keys.
- Message reply failures: run `npm run test:email` in `backend/` and fix SMTP vars.
- Prisma errors: confirm `DATABASE_URL` and run `npx prisma generate` again.
