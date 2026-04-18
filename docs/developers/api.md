# Atomic CRM API

## REST API Overview

The Atomic CRM exposes a complete REST API built on Supabase/Postgrest. Documentation can be viewed in Supabase Studio via the auto-generated API docs.

## Authentication

Two API key types exist: **publishable** (limited permissions, frontend use) and **secret** (full database access, server-side only). Users authenticate via `/auth/v1/token` with email/password to receive a JWT token, then pass it via the `Authorization: Bearer` header.

## Core Endpoints

### Auth API

- `POST /auth/v1/signup` – Create user
- `POST /auth/v1/token` – Authenticate and get JWT
- `POST /auth/v1/logout` – Log out
- `GET /auth/v1/user` – Get user info

### Data API

- **Contacts:** CRUD at `/rest/v1/contacts`, plus summary endpoint
- **Contact Notes:** CRUD at `/rest/v1/contact_notes`
- **Tasks:** CRUD at `/rest/v1/tasks`
- **Companies:** CRUD at `/rest/v1/companies`, plus summary endpoint
- **Deals:** CRUD at `/rest/v1/deals`
- **Deal Notes:** CRUD at `/rest/v1/deal_notes`
- **Configuration:** GET at `/rest/v1/configuration`

## Key Features

Queries support filtering, column selection, and all PostgREST parameters. Example: `GET /rest/v1/contacts?status=eq.hot`. Single items returned by adding `Accept: application/vnd.pgrst.object+json` header.

OpenAPI spec available at `/rest/v1/` endpoint.

## Example Code

The documentation includes a JavaScript example showing how to authenticate, search contacts, and add notes using the native fetch API with proper header configuration.
