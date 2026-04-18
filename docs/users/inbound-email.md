# Inbound Email

## Feature Overview

Atomic CRM can receive inbound emails and automatically create or update contacts based on email content.

## Setup

Requires Postmark and Supabase configuration. See [Inbound Email Setup](../developers/inbound-email-configuration.md) for details.

## Usage

- Copy or forward emails to your inbound email address (`xxxxxxx@inbound.postmarkapp.com`)
- Find the address in "My Info" menu under "Inbound Email" section
- Use **Bcc** field to send copies without notifying recipients
- System identifies users via sender's email and contacts via recipient's email
- Creates contacts with email domain as company name
- Adds email content as notes to contacts

## Examples

### Example 1: Copying Email to CRM

**Input email**: Jane Doe sends to Kim Hegmann with inbound address in Cc

**Result**: Creates "Acme" company and "Kim Hegmann" contact, associates both to Jane Doe, adds email as note.

### Example 2: Forwarding Response

**Input**: Forward Kim's response to inbound address

**Result**: Identifies Kim Hegmann contact via original sender, adds email content as note.
