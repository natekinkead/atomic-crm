# Custom Fields

## Overview

Custom fields extend the data model for entities: Contacts, Companies, Deals, Notes, and Tasks.

## Updating The Data Model

Access Supabase Studio at http://localhost:54323/

### Adding a Column to Contacts Table

1. Navigate to Database menu → Tables section
2. Select the `contacts` table
3. Click "New Column" button
4. Configure column:
   - Name: `referred_by`
   - Type: `text`
   - Default value: empty
   - Allow Nullable: checked
5. Click "Save"

### Updating the contacts_summary View

Run this SQL in the SQL Editor:

```sql
drop view "public"."contacts_summary";
create view "public"."contacts_summary"
    with (security_invoker=on)
    as
select
    co.*,
    c.name as company_name,
    count(distinct t.id) as nb_tasks
from
    "public"."contacts" co
left join
    "public"."tasks" t on co.id = t.contact_id
left join
    "public"."companies" c on co.company_id = c.id
group by
    co.id, c.name;
```

### Creating a Migration

Run in terminal:
```
npx supabase db diff -f create_referred_by
```
This creates a migration file in `supabase/migrations` for production deployment.

## Displaying Custom Fields in the Frontend

### Type Definition Update

Modify `src/components/atomic-crm/types.ts` - add to the `Contact` interface:
```typescript
referred_by?: string;
```

### Form Input Component

Edit `src/components/atomic-crm/contacts/ContactInputs.tsx` - add in `<ContactMiscInputs>`:
```typescript
<TextInput
  source="referred_by"
  helperText={false}
/>
```

### Sidebar Display

Edit `src/components/atomic-crm/contacts/ContactAside.tsx`:
```typescript
{record.referred_by && (
  <div className="pb-2">
    <span className="text-sm text-muted-foreground mr-1">
      Referred by
    </span>
    <TextField source="referred_by" />
  </div>
)}
```

## Technology Stack

- **Shadcn Admin Kit** - application logic
- **Shadcn/ui** - UI components
- **TypeScript** - type safety

Frontend code location: `src/components/atomic-crm`
