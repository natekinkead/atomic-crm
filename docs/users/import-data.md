# Importing and Exporting Data

## Overview

Users can import contacts, companies, tasks, notes, tags, and deals, and export data in CSV or vCard formats.

## Import Contacts From CSV

Users can find import contact buttons in the initial user onboarding page and in the contacts page. Clicking the button displays a modal to upload a CSV file. An example file is available within the modal.

**Expected CSV columns:** first_name, last_name, gender, title, background, first_seen, last_seen, has_newsletter, status, tags, linkedin_url, company, email_work, email_home, email_other, phone_work, phone_home, phone_other

During import, companies and tags are automatically matched if they exist in the system, or imported as new entries.

## Export Contacts To CSV

An export button on the contacts and companies pages allows downloading lists in CSV format.

## Export Contacts To vCard

Users can export a single contact as a vCard file from the aside panel in the Contact Edit page.

## Migrating From Another CRM

Atomic CRM imports contacts, companies, tasks, notes, tags, and deals from a single JSON file. To access this feature, click the User menu in the top right corner and select "Import data."

The JSON structure supports these top-level arrays: sales, companies, contacts, notes, and tasks. A sample JSON file is available for download to verify the expected format.

After launching import, the page displays progress and any errors if the import fails.
