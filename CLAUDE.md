# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands

```bash
make install      # Install dependencies (frontend, backend, local Supabase)
make start         # Start full stack (Supabase + Vite dev server)
make start-demo    # Start with FakeRest data provider (no backend)
make stop          # Stop the stack
make test          # Run unit tests (vitest)
make typecheck     # TypeScript type checking
make lint          # ESLint and Prettier checks
make build         # Production build (tsc + vite build)
```

### Database Migrations

```bash
npx supabase db diff --local -f <name>  # Generate migration from schema changes
npx supabase migration up --local       # Apply migrations
npx supabase db push                    # Push to remote
```

### Registry (Shadcn components)

```bash
make registry-gen    # Generate registry.json (auto-runs on pre-commit)
make registry-build  # Build Shadcn registry
```

## Architecture

### Stack
- **Frontend**: React 19 + TypeScript + Vite, React Router v7, React Query, React Hook Form
- **UI**: Shadcn UI + Radix UI, Tailwind CSS v4
- **Backend**: Supabase (PostgreSQL, REST API, Auth, Storage, Edge Functions)

### Key Directories
- `src/components/atomic-crm/` — Main CRM code (~15,000 LOC), organized by domain: contacts, deals, tasks, notes, companies, etc.
- `src/components/admin/` — Shadcn Admin Kit framework (mutable dependency)
- `src/components/ui/` — Shadcn UI components (mutable dependency)
- `supabase/schemas/` — Declarative schema (source of truth for database structure)
- `supabase/functions/` — Edge functions (user management, inbound email)

### Configuration
The `<CRM>` component in `src/App.tsx` accepts props for branding, themes, and domain-specific options (contactGender, companySectors, dealCategories, etc.).

### Data Providers
Two providers: **Supabase** (production, default) and **FakeRest** (in-browser demo mode, resets on reload). Filter syntax uses `ra-data-postgrest` convention: `field_name@operator`.

### Mutable Dependencies
Files in `src/components/admin/` and `src/components/ui/` are meant to be customized directly — they are integrated into the codebase, not imported as external packages.

## Important Notes

- Database schema is declarative in `supabase/schemas/` — migrations are auto-generated
- User deletion not supported; use account disabling instead
- Schema changes require updating: sample CSV, import functions, FakeRest generators, views, exports, merge logic

## More Details
See [AGENTS.md](AGENTS.md) for detailed development workflows, architecture patterns, and service URLs.

## Documentation

Local copies of the official Atomic CRM documentation are available in this repo:

**User Documentation:**
- [docs/users/user-management.md](docs/users/user-management.md) — Creating users, admin roles
- [docs/users/import-data.md](docs/users/import-data.md) — CSV import/export, JSON migration
- [docs/users/inbound-email.md](docs/users/inbound-email.md) — Email-to-note capture
- [docs/users/mcp-server.md](docs/users/mcp-server.md) — AI assistant integration
- [docs/users/merging-contacts.md](docs/users/merging-contacts.md) — Deduplicate contacts
- [docs/users/mobile-app.md](docs/users/mobile-app.md) — PWA installation, offline mode
- [docs/users/settings.md](docs/users/settings.md) — Application settings

**Developer Documentation:**
- [docs/developers/architecture.md](docs/developers/architecture.md) — Architecture decisions
- [docs/developers/api.md](docs/developers/api.md) — REST API reference
- [docs/developers/custom-fields.md](docs/developers/custom-fields.md) — Extending the data model
- [docs/developers/customizing.md](docs/developers/customizing.md) — CRM component props, i18n
- [docs/developers/data-providers.md](docs/developers/data-providers.md) — FakeRest for development
- [docs/developers/deploy.md](docs/developers/deploy.md) — Production deployment
- [docs/developers/inbound-email-configuration.md](docs/developers/inbound-email-configuration.md) — Postmark setup
- [docs/developers/migrations.md](docs/developers/migrations.md) — Database schema management
- [docs/developers/sso.md](docs/developers/sso.md) — SAML 2.0 SSO configuration
- [docs/developers/supabase-configuration.md](docs/developers/supabase-configuration.md) — Remote Supabase setup