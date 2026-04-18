# Supabase Configuration

## Overview

This documentation explains how to configure a remote Supabase instance for Atomic CRM at supabase.com.

## Creating a Remote Supabase Instance

Use the CLI utility to create a backend instance:
```bash
make supabase-remote-init
```
This script creates the database, applies migrations, deploys edge functions, and generates a `.env.production.local` file. SMTP provider configuration must be done manually.

## Alternative: Using An Existing Supabase Instance

**Step 1:** Log in to Supabase
```bash
npx supabase login
```

**Step 2:** Link to your project
```bash
npx supabase link --project-ref <project_ref>
```

**Step 3:** Set secrets
```bash
npx supabase secrets set SB_PUBLISHABLE_KEY=<publishable_key>
```

**Step 4:** Apply migrations and deploy functions
```bash
npx supabase db push
npx supabase functions deploy
```

**Step 5:** Create `.env.production.local`:
```
VITE_SUPABASE_URL=<instance_url>
VITE_SB_PUBLISHABLE_KEY=<instance_publishable_key>
```

## Testing Production Mode

```bash
make prod-start
```
This tests the local frontend with the remote Supabase instance.

## Email Provider Setup

Supabase's default SMTP has limitations:
- Only sends to pre-authorized addresses
- Significant rate limits
- No SLA guarantee
- Cannot customize sender name

**Recommended SMTP providers:**
- Postmark (recommended)
- Resend
- AWS SES
- Twilio SendGrid
- ZeptoMail
- Brevo

After setup, configure at: Authentication settings page, then adjust rate limits.

## Example: Postmark Configuration

**Step 1:** Create Postmark account, enable SMTP in Server Settings, copy Server API token.

**Step 2 (optional):** Add Sender Signature or Domain for Test Mode.

**Step 3:** In Supabase Auth SMTP settings:

| Field | Value |
|-------|-------|
| Sender email | Your email (e.g., atomic-crm@company.com) |
| Sender name | Your name (e.g., Atomic CRM) |
| Host | smtp.postmarkapp.com |
| Port | 587 |
| Username | Server API token |
| Password | Server API token |

**Step 4:** Test via "Forgot your password?" link.

## Setting The Login Callback

1. Go to supabase.com dashboard
2. Navigate to **Authentication** → **URL Configuration**
3. Set Site URL (e.g., `https://example.com/atomic-crm/auth-callback.html`)

## Customizing Email Templates

**Local development:** Edit templates via `supabase/config.toml`, restart instance.

**Remote instance:**
1. Go to **Authentication** → **Email Templates**
2. Select and edit template
3. Save changes

## FAQ

**Security Definer View error:** The `init_state` view is intentionally public for testing. It exposes no data—ignore this Security Advisor warning.
