# Project Documentation

## Project Overview

This project is a hotel and hospitality platform with a separate frontend and backend.

- The `frontend/` directory contains the website UI.
- The `backend/` directory contains the API, admin logic, database access, and supporting services.

At the moment, the backend is partially complete. It already supports a solid set of hotel administration and content-management features, but some modules such as booking, event, and user management are still unfinished.

## Current Architecture

### Frontend

The frontend appears to be a Next.js application with reusable UI components and page-based routing. It includes pages for:

- home
- rooms
- room details
- gallery
- booking
- events
- restaurant
- contact

### Backend

The backend is built with:

- Node.js
- Express
- Prisma ORM
- PostgreSQL
- JWT authentication
- Cloudinary for image uploads
- Nodemailer for email replies

The backend entrypoint is:

- `backend/server.js`

The database schema is defined in:

- `backend/prisma/schema.prisma`

## What The Backend Does Now

The backend currently acts as an admin API and content-management system for the hotel platform.

### 1. Authentication

The backend supports admin login and authenticated profile lookup.

Implemented in:

- `backend/routes/authRoutes.js`
- `backend/controllers/authController.js`
- `backend/middleware/authMiddleware.js`

Current behavior:

- Admin can log in using email and password.
- Passwords are checked using `bcryptjs`.
- A JWT token is returned after successful login.
- Protected routes require a valid bearer token.
- Admin-only routes use role-based authorization.

### 2. Room Management

The backend supports room CRUD operations.

Implemented in:

- `backend/routes/roomRoutes.js`
- `backend/controllers/roomController.js`
- `backend/services/roomService.js`

Current behavior:

- Public users can view all rooms.
- Public users can view a single room.
- Admin can create a room.
- Admin can update a room.
- Admin can delete a room.
- Room images can be uploaded.
- Uploaded images are stored through Cloudinary.

### 3. Service Management

The backend supports hotel service and amenity management.

Implemented in:

- `backend/routes/serviceRoutes.js`
- `backend/controllers/serviceController.js`
- `backend/services/serviceService.js`

Current behavior:

- Public users can view available services.
- Admin can create services.
- Admin can update services.
- Admin can delete services.

### 4. Gallery Management

The backend supports gallery image listing and administration.

Implemented in:

- `backend/routes/galleryRoutes.js`
- `backend/controllers/galleryController.js`
- `backend/services/galleryService.js`

Current behavior:

- Public users can browse gallery items.
- Admin can upload gallery images.
- Admin can delete gallery items.
- Image upload uses file validation and Cloudinary storage.

### 5. Contact Message Management

The backend supports contact form submission and admin message handling.

Implemented in:

- `backend/routes/messageRoutes.js`
- `backend/controllers/messageController.js`
- `backend/services/messageService.js`
- `backend/services/emailService.js`

Current behavior:

- Public users can submit contact messages.
- Admin can list messages.
- Admin can mark messages as read or unread.
- Admin can reply to a message by email.
- Admin can delete a message.

### 6. Settings Management

The backend supports dynamic project settings stored in the database.

Implemented in:

- `backend/routes/settingsRoutes.js`
- `backend/controllers/settingsController.js`
- `backend/services/settingsService.js`

Current behavior:

- Public users can fetch settings.
- Admin can update settings.
- Settings are stored as key/value records.
- Update behavior uses upsert logic.

### 7. Page Management

The backend supports CMS-like content pages.

Implemented in:

- `backend/routes/pageRoutes.js`
- `backend/controllers/pageController.js`
- `backend/services/pageService.js`

Current behavior:

- Public users can list pages.
- Public users can fetch a page by slug.
- Admin can create pages.
- Admin can update pages.
- Admin can delete pages.

### 8. Analytics Dashboard

The backend supports summary analytics for admin use.

Implemented in:

- `backend/routes/analyticsRoutes.js`
- `backend/controllers/analyticsController.js`
- `backend/services/analyticsService.js`

Current behavior:

- Admin can retrieve dashboard totals.
- Admin can request analytics for a selected date range.
- Analytics include counts for rooms, services, and messages.
- Trend data is grouped by day.

### 9. Audit Logging

The backend tracks important admin actions.

Implemented in:

- `backend/routes/auditRoutes.js`
- `backend/controllers/auditController.js`
- `backend/services/auditService.js`

Current behavior:

- Admin actions are written to the audit log.
- Audit logs include action type, entity, entity id, and metadata.
- Admin users can retrieve audit log history.

## Functional Requirements

Functional requirements describe what the system must do.

### Authentication Requirements

- The system must allow admin login with email and password.
- The system must generate JWT tokens for successful login.
- The system must protect restricted routes.
- The system must support role-based access control for admin endpoints.

### Room Requirements

- The system must allow public room listing.
- The system must allow public room detail viewing.
- The system must allow admin room creation.
- The system must allow admin room updates.
- The system must allow admin room deletion.
- The system must support room image upload.

### Service Requirements

- The system must allow public service listing.
- The system must allow admin service creation.
- The system must allow admin service updates.
- The system must allow admin service deletion.

### Gallery Requirements

- The system must allow public gallery listing.
- The system must allow admin gallery uploads.
- The system must allow admin gallery item deletion.

### Message Requirements

- The system must allow public contact message submission.
- The system must allow admin message retrieval.
- The system must allow admin read/unread updates.
- The system must allow admin email replies.
- The system must allow admin message deletion.

### Settings Requirements

- The system must allow settings retrieval.
- The system must allow admin settings updates.
- The system must store flexible settings values in the database.

### Page Requirements

- The system must allow page listing.
- The system must allow slug-based page lookup.
- The system must allow admin page creation.
- The system must allow admin page updates.
- The system must allow admin page deletion.

### Analytics Requirements

- The system must allow admin analytics retrieval.
- The system must support optional date-range filtering.
- The system must provide totals and trend data.

### Audit Requirements

- The system must log important admin actions.
- The system must allow audit log retrieval by admin users.

## Non-Functional Requirements

Non-functional requirements describe how the system should behave.

### 1. Security

- The backend should use JWT authentication for protected routes.
- The backend should enforce role-based access control.
- The backend should validate request payloads.
- The backend should keep secrets in environment variables.
- The backend should avoid exposing sensitive configuration in tracked files.

### 2. Reliability

- The backend should start consistently from both the backend directory and the project root.
- The backend should handle async errors through centralized middleware.
- The backend should return proper HTTP status codes for missing resources and duplicate records.
- The backend should avoid crashing due to optional service failures such as email initialization issues.

### 3. Maintainability

- The codebase should remain organized by routes, controllers, services, middleware, config, and Prisma schema.
- The backend should use reusable helpers for validation and async error handling.
- The project should include clear environment templates and setup guidance.

### 4. Scalability

- The API should keep versioned routing such as `/api/v1`.
- The backend should separate database logic from route handling.
- The schema should support future expansion for booking, customer, and event features.

### 5. Performance

- The backend should use efficient Prisma queries for CRUD operations.
- The analytics service should use grouped counts for reporting.
- Upload size should be limited to reduce abuse and unstable memory usage.

### 6. Observability

- The backend should log requests for debugging.
- The backend should log admin actions for traceability.
- The backend should centralize runtime error reporting.

## Recent Backend Improvements

The following updates were recently completed:

### Startup and Environment Fixes

- Backend environment loading was improved so `backend/.env` is loaded correctly regardless of the working directory.
- A safe template file was added at `backend/.env.example`.
- Git ignore rules were updated so real env files stay ignored while the example file can be tracked.

### Error Handling Improvements

- Prisma `record not found` errors now return `404` instead of generic `500`.
- Prisma duplicate-value errors now return `409`.
- Centralized error handling was strengthened.

### Dependency and Runtime Fixes

- Backend dependencies were refreshed so the server can start successfully.
- Email service loading was improved so missing mail dependencies do not crash startup unexpectedly.

### Seed Alignment

- Seed data was updated to match the Prisma schema for room image fields.

## Modules That Are Still Incomplete

The following backend modules still need implementation:

- `backend/routes/bookingRoutes.js`
- `backend/controllers/bookingController.js`
- `backend/routes/eventRoutes.js`
- `backend/controllers/eventController.js`
- `backend/routes/userRoutes.js`
- `backend/controllers/userController.js`

These files currently exist as placeholders or unfinished modules.

## Current Backend Limitations

- Booking APIs are not implemented yet.
- Event APIs are not implemented yet.
- User/customer management APIs are not implemented yet.
- End-to-end automated tests are not in place.
- The backend still depends on a running PostgreSQL database and valid external service credentials for full real-world operation.

## Suggested Future Updates

### High Priority

- Implement booking routes, controllers, and services.
- Implement event management APIs.
- Implement user and customer management APIs.
- Add proper automated tests for backend routes and services.
- Add database migration and setup instructions for new developers.

### Medium Priority

- Add pagination for list endpoints.
- Add filtering and search for rooms, messages, and gallery items.
- Add stronger production validation for secrets and configuration.
- Add rate limiting on public endpoints such as login and contact messages.

### Low Priority

- Add API documentation using Swagger or OpenAPI.
- Add monitoring and health-check endpoints.
- Add caching for read-heavy content endpoints if needed later.

## Backend Folder Summary

- `backend/config/`: Prisma and backend configuration
- `backend/controllers/`: request handlers
- `backend/middleware/`: auth, validation, upload, and error handling
- `backend/prisma/`: schema and seed files
- `backend/routes/`: API route definitions
- `backend/services/`: business logic and external service integration
- `backend/utils/`: helper utilities

## Conclusion

This project already has a meaningful backend foundation. Right now it functions primarily as a hotel admin and content-management API. The implemented parts are usable for rooms, services, gallery, messages, settings, pages, analytics, and audit logs. However, the project is not yet fully complete because booking, event, and user-related APIs still need to be built.

Once those remaining modules are implemented and tested, the backend will be much closer to a complete hotel management platform.
