# Inbound Email Configuration

## Overview

Atomic CRM can receive inbound emails and automatically create or update contacts based on the email content. This feature is useful to keep your CRM up-to-date with the latest interactions with your contacts. The system uses Postmark to receive and process inbound emails, with a free tier allowing up to 100 emails per month.

## Postmark Setup

You can use an existing Postmark account or create a new one. To enable inbound email features, create a webhook by selecting your server, choosing an Inbound Stream (such as Default Inbound Stream), navigating to the Setup Instructions tab, and obtaining your server's inbound email address (format: xxxxxxx@inbound.postmarkapp.com). Set your server's inbound webhook URL to: `https://<user>:<password>@<project_id>.supabase.co/functions/v1/postmark`, then save changes.

The webhook URL contains three key components: the chosen credentials for securing the webhook, and the Supabase project ID. The inbound email address can be customized by registering a domain to your Postmark account.

## Supabase Setup

Atomic CRM uses a Supabase Edge Function to handle the webhook and process received emails. After linking your Supabase project, run these commands to configure secrets:

```
npx supabase secrets set POSTMARK_WEBHOOK_USER=<user>
npx supabase secrets set POSTMARK_WEBHOOK_PASSWORD=<password>
npx supabase secrets set POSTMARK_WEBHOOK_AUTHORIZED_IPS=<comma-separated list of IPs>
npx supabase secrets set VITE_INBOUND_EMAIL=<your-postmark-inbound-email>
npx supabase secrets set VITE_ATTACHMENTS_BUCKET=attachments
```

For GitHub Actions deployment, set these repository secrets:

```
POSTMARK_WEBHOOK_USER=<user>
POSTMARK_WEBHOOK_PASSWORD=<password>
POSTMARK_WEBHOOK_AUTHORIZED_IPS=<comma-separated list of IPs>
VITE_INBOUND_EMAIL=<your-postmark-inbound-email>
```

## Application Configuration

Store the Postmark inbound email address in a `.env` file at the project root:

```
VITE_INBOUND_EMAIL=xxxxxxxxxxx@inbound.postmarkapp.com
```

Note that `VITE_INBOUND_EMAIL` must be provided in two locations: as a Supabase Secret and in the `.env` file. This dual configuration is necessary because it's used client-side to display the inbound email address in the app, and server-side by the Edge Function to detect forwarded emails.

## Testing Locally

To test inbound email features locally: start Supabase Edge Functions locally with `make start-supabase-functions`, open your local Supabase instance for public access using ngrok, configure your Postmark webhook URL to point to your ngrok URL (`https://testuser:testpwd@<ngrok-url>/functions/v1/postmark`), and send a test email to your Postmark server's inbound email address.
