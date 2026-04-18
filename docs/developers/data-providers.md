# Data Providers

## Overview

Atomic CRM uses **Supabase** as its default backend API. Supabase is an open-source Firebase alternative built on Postgres, offering a REST API and real-time subscriptions with a generous free tier.

## Using Test Data

Import test data via CSV file:

1. Navigate to contacts page
2. Click "Import" button
3. Select `test-data/contacts.csv`

## Using A Fake API For Development

**FakeRest** provides browser-based REST API for frontend testing without backend setup. Data resets on page reload.

### Running With FakeRest

Command: `npm run dev:demo`

- Starts at http://localhost:5173/
- Logs in as demo user with admin rights
- Pre-filled with random test data
- Custom field data can be modified in `src/components/atomic-crm/providers/fakerest/dataGenerator`

### Manual Setup

Modify `src/App.tsx`:
```
import { dataProvider, authProvider } from "@/components/atomic-crm/providers/fakerest";
// Use <CRM dataProvider={dataProvider} authProvider={authProvider} />
```

**Note:** Supabase environment variables remain required.

### Filters Syntax

Filters must follow ra-data-postgrest convention: `field@operator` (e.g., `first_name@eq`). FakeRest uses `supabaseAdapter` for filter mapping.
