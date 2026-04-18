# Architecture

## Overview

This document explains architecture decisions made during Atomic CRM development.

## Components

### Frontend Architecture

- Single-Page Application built with Shadcn Admin Kit
- Framework integrates popular React libraries including React Router for routing, React Query for data fetching and caching, React Hook Form for form management, Shadcn UI and Radix UI for accessible components, and Tailwind CSS for styling

### Backend Architecture

- Leverages Supabase providing PostgreSQL database, REST API, authentication, storage, and edge functions
- Minimal backend code to maintain, primarily edge functions for user management and inbound email processing

## Mutable Dependencies

- Primary code resides in `src/components/atomic-crm` directory with under 15,000 lines
- Mutable dependencies located in `src/components/admin` (Shadcn Admin Kit) and `src/components/ui` (Shadcn UI)
- These directories can be directly modified to customize the application
- Follow respective documentation for upgrading these dependencies

## Database Views

- Complex queries are abstracted using database views to simplify frontend code
- Example: `contacts_summary` view provides task counts for contact list pages
- Views are emulated in frontend when using FakeRest data provider
- View definition located in `supabase/migrations/init_db.sql`

## Database Triggers

- User credentials stored in Supabase's `auth.users` table (no column additions allowed)
- Additional user details stored in separate `sales` table
- Trigger automatically syncs sales record when users are created or updated
- Trigger located in `supabase/migrations/20240730075425_init_triggers.sql`

## Edge Functions

### Users Function

- Manages user creation and updates with permission verification
- No user deletion support; uses Supabase ban feature instead

### Email Processing

- Handles webhooks and processes received emails
- Functions located in `supabase/functions/` directory
