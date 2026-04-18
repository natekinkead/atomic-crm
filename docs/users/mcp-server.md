# MCP Server

## Overview

The MCP Server enables interaction with Atomic CRM data through AI assistants. Powered by Supabase Edge Functions and OAuth, it requires no installation.

## Getting The MCP Server URL

1. Log in to your Atomic CRM instance
2. Click your profile picture → select "Profile"
3. Scroll down to the "MCP Server" section
4. Copy the displayed URL

## Supported AI Assistants

- Chat GPT
- Claude.ai
- Visual Studio Code
- Claude Desktop
- Claude Code

Unavailable (crossed out): Gemini, Claude Mobile, ChatGPT Desktop, ChatGPT Mobile

## Setup Instructions

**Chat GPT:** Requires paid account and Developer Mode enabled. Create custom connector with OAuth authentication.

**Claude.ai:** Open Settings → Connectors → Add custom connector. Enter name and MCP Server URL.

**Visual Studio Code:** Run "MCP: Add Server..." command, select "HTTP" type, enter URL, name it `atomic-crm`.

**Claude Desktop:** Settings > Extensions > Add custom Extension. Enter Name and URL, then click "Connect".

**Claude Code:** Run command: `claude mcp add atomic-crm --transport http {MCP Server URL}`, then authenticate via browser.

## Usage

Query data with natural language:
- "Pending tasks for hot contacts?"
- "List open deals over $10,000"
- "Top 5 companies by revenue"

Perform actions:
- Create contacts
- Update deal statuses
- Add follow-up tasks
- Combine with other connectors for multi-source queries
