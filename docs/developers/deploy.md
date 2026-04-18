# Deploy

## Backend Deployment

The backend (Postgres database, REST API, edge functions) is hosted on Supabase. After configuration, deploy with:

```bash
make supabase-deploy
```

Ensure the frontend is accessed once to initialize the main admin account.

## Testing Production Mode

Test local frontend code against the remote Supabase instance using:

```bash
make prod-start
```

This applies migrations, deploys edge functions, and allows access at http://localhost:3000/

## Frontend Deployment

Build the bundle with:

```bash
make build
```

Upload the generated `dist` directory to a CDN (Netlify, Vercel, etc.). For GitHub Pages:

```bash
npm run ghpages:deploy
```

Available at `https://<username>.github.io/atomic-crm/`

## Deploying Updates

Run the following to deploy new versions:

```bash
make prod-deploy
```

This applies migrations, deploys edge functions, and pushes the built application to `gh-pages` branch.

## GitHub Actions Automation

Required secrets to configure:
- SUPABASE_ACCESS_TOKEN
- SUPABASE_DB_PASSWORD
- SUPABASE_PROJECT_ID
- SUPABASE_URL
- SB_PUBLISHABLE_KEY
- POSTMARK_WEBHOOK_USER
- POSTMARK_WEBHOOK_PASSWORD
- POSTMARK_WEBHOOK_AUTHORIZED_IPS
- VITE_INBOUND_EMAIL
- VITE_ATTACHMENTS_BUCKET (optional, defaults to "attachments")

"The GitHub action will run the `prod-deploy` command on every push to the `main` branch, deploying the frontend to GitHub pages and updating the Supabase instance."
