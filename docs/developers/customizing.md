# Customizing

## Overview

This documentation explains how to customize the Atomic CRM application. Admin users can modify domain-specific data (deal stages, note statuses, etc.) through the Settings page. Developers can go further by configuring the `<CRM>` component in `src/App.tsx`.

## The `<CRM>` Component

The frontend entry point is `src/App.tsx`, which renders the `<CRM>` component. This component accepts various props for customization.

### Default Implementation

```tsx
import { CRM } from '@/components/atomic-crm/root/CRM';
const App = () => <CRM />;
export default App;
```

### Customization Example

```tsx
import { CRM } from '@/components/atomic-crm/root/CRM';

const App = () => (
    <CRM
        companySectors={[
            { value: 'technology', label: 'Technology' },
            { value: 'finance', label: 'Finance' },
        ]}
        dealCategories={[
            { value: 'copywriting', label: 'Copywriting' },
            { value: 'design', label: 'Design' },
        ]}
        dealPipelineStatuses={['won']}
        dealStages={[
            { value: 'opportunity', label: 'Opportunity' },
            { value: 'proposal-sent', label: 'Proposal Sent' },
            { value: 'won', label: 'Won' },
            { value: 'lost', label: 'Lost' },
        ]}
        noteStatuses={[
            { value: 'cold', label: 'Cold', color: '#7dbde8' },
            { value: 'warm', label: 'Warm', color: '#e8cb7d' },
            { value: 'hot', label: 'Hot', color: '#e88b7d' },
        ]}
        taskTypes={[
            { value: 'call', label: 'Call' },
            { value: 'email', label: 'Email' },
            { value: 'meeting', label: 'Meeting' },
        ]}
    />
);

export default App;
```

### Props Table

| Props | Description | Type |
|-------|-------------|------|
| companySectors | List of company sectors used in the application | LabeledValue[] |
| currency | ISO 4217 currency code for formatting monetary values (default: "USD") | string |
| darkTheme | Theme for dark mode | RaThemeOptions |
| dealCategories | Categories of deals | LabeledValue[] |
| dealPipelineStatuses | Statuses of deals in the pipeline | string[] |
| dealStages | Stages of deals | DealStage[] |
| lightTheme | Theme for light mode | RaThemeOptions |
| logo | Logo for the CRM application | string |
| noteStatuses | Statuses of notes | NoteStatus[] |
| taskTypes | Types of tasks | LabeledValue[] |
| title | Title of the CRM application | string |

## Languages (i18n)

Configuration is managed in `src/components/atomic-crm/providers/commons/i18nProvider.ts`. Default locales are `en` (English) and `fr` (French).

The i18nProvider defines:
- Initial locale resolver (browser language with `en` fallback)
- Available locales list
- Message resolution for each locale

The language switcher appears in the Profile page when multiple locales are configured.

### Adding a New Language

1. Import a translation package for base messages (35+ language integrations available via Shadcn Admin Kit)
2. Create a message catalog for CRM messages using the English catalog as base
3. Merge translations using the `mergeTranslations` utility
4. Edit `i18nProvider.ts` and add new locale with merged messages
5. Import new locale for date formatting in `src/components/atomic-crm/misc/RelativeDate.tsx`
6. Start the app and verify the locale works from the Profile page

### Type-Checking Message Catalogs

For in-repo locales, use strict typing so missing keys fail at compile time:
```tsx
import type { CrmMessages } from './englishCrmMessages';

export const frenchCrmMessages = {
    crm: {
        // ...
    },
} satisfies CrmMessages;
```

For external/custom locales, you can choose:
- **Strict typing** (`CrmMessages`) for complete catalogs
- **Partial typing** (`PartialCrmMessages`) for incremental translations with English fallback

```tsx
import type { PartialCrmMessages } from './englishCrmMessages';

const polishMessages: PartialCrmMessages = {
    crm: {
        // only override what you need
    },
};
```

If no official package exists, keep English integration messages as base and override only needed keys.

## Disabling Telemetry

In production, atomic-crm sends anonymous requests to a telemetry server operated by Marmelab at: `https://atomic-crm-telemetry.marmelab.com/atomic-crm-telemetry`

The only data sent is the admin domain (e.g., "example.com") - no personal data or cookies are included. This is used to track framework usage.

**To opt out:**
```tsx
import { CRM } from '@/components/atomic-crm/root/CRM';

const App = () => <CRM disableTelemetry />;

export default App;
```
