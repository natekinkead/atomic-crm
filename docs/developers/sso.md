# SSO

## SSO with SAML for Atomic CRM

Atomic CRM supports Single Sign-On authentication through SAML 2.0, allowing users to authenticate via identity providers like Google Workspace, Okta, or Microsoft Azure AD.

## Setup with Google Workspace

### Step 1: Enable SAML 2.0 in Supabase

Enable SAML 2.0 in Supabase under _Authentication > Sign in / Providers_.

### Step 2: Create application in Google Workspace

- Open Google Workplace Console → Apps > Web and mobile apps
- Add custom SAML app
- Download IdP metadata file (save for later)
- Add service provider details:
  - ACS URL: `https://<project>.supabase.co/auth/v1/sso/saml/acs`
  - Entity ID: `https://<project>.supabase.co/auth/v1/sso/saml/metadata`
  - Name ID format: EMAIL
  - Name ID: Primary email

- Configure attribute mapping:
  - Primary email → email
  - First name → first_name
  - Last name → last_name

### Step 3: Register SSO Provider in Supabase

Create `mapping.json` file, then run:
```
npx supabase sso add --type saml --project-ref <your-project> \
  --metadata-file /path/to/saml/metadata.xml \
  --attribute-mapping-file /path/to/mapping.json \
  --domains company.com
```

### Step 4: Enable on login page

Add to `.env`:
```
VITE_GOOGLE_WORKSPACE_DOMAIN=company.com
```
Optionally disable email/password auth:
```
VITE_DISABLE_EMAIL_PASSWORD_AUTHENTICATION=true
```

Users will see a Google Workspace SSO button on the login page and be automatically redirected after authentication.
