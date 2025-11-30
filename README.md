# customer360-bot-demo

# Platform 360° – Product Support Hub

A single entry-point **support website + smart bot** that helps customers raise issues for all your products, and gives engineers a 360° view of the customer before they even join the chat.

Built for the **Cliqtrix** hackathon using:

- **Frontend:** Static HTML, CSS, JavaScript (no framework)
- **Backend logic:** Zoho **SalesIQ Zobot** (Deluge message + context handlers)
- **Optional integrations:** Zoho Desk / Zoho CRM / Zoho Subscriptions via Deluge Connections

---

## 🎯 What this project does

**Platform 360°** is a mini “support hub” where:

- Users land on a clean **Home / Products / Contact** website
- A **floating chat bot** in the bottom-right (SalesIQ Zobot) starts the support flow
- The bot:
  - Asks if the user is a **new** or **existing** customer
  - Gathers key details (name, email, product, issue summary, urgency…)
  - Optionally calls Zoho APIs to fetch:
    - Recent **Desk tickets**
    - **Subscription / plan** details
  - Scores the request (Hot / Warm / Cold) and forwards it to the right queue

The site branding and product names (Inbox360, BillPro, SupportDesk, etc.) are **demo product names for the hackathon**.

---

## 🧩 Features

### 1. Frontend – Support Hub Website

- Modern, responsive one-page layout:
  - **Home** – explains the Platform 360° Support Hub
  - **Products** – shows a product grid (Inbox360, BillPro, SupportDesk, etc.)
  - **Contact** – simple contact form + explanation of the bot as the main channel
- Smooth **navigation**:
  - Top navbar with `Home / Products / Contact`
  - Smooth scrolling and **active section highlight** on scroll
- Clearly communicates:
  - “Click the chat bubble on bottom-right to start support”
  - The idea of one bot, handling many products

### 2. Bot – Platform 360° Support (SalesIQ Zobot)

- **Message handler (Deluge):**
  - Welcomes the visitor
  - Asks: _“Are you a New visitor or an Existing customer?”_
  - Uses **suggestion chips** for quick replies
  - Starts context flows based on choice

- **Context handler (Deluge):**
  - **New visitor**
    - Asks for name, email, company, requirement
    - Scores urgency based on keywords (e.g., “down”, “outage”, “urgent”, “bug”, “payment”)
    - Classifies as `Hot / Warm / Cold`
    - Prepares lead map that can be sent to **Zoho CRM** (via connection)
    - Ends with a summary message for the user
  - **Existing customer**
    - Asks for email
    - Uses a connection to **Zoho Desk** to fetch last few tickets
    - Optionally uses a connection to **Zoho Subscriptions** to check plan & renewal date
    - Forwards the chat to a human operator with:
      - Email
      - Ticket lines
      - Optional plan line

### 3. Optional Integrations (via Deluge `invokeurl`)

> These are optional, but show the “360°” idea:

- **Zoho Desk** – Fetch last 3 tickets:
  - `GET https://desk.zoho.com/api/v1/tickets?...&email=<cust_email>`
- **Zoho Subscriptions** – Fetch customer and plan info:
  - `GET https://subscriptions.zoho.com/api/v1/customers?email=<cust_email>&organization_id=<ORG_ID>`

Connections (example names):

- `zohodesk_subs_conn`
- `zohosubs_conn`

---

## 🏗️ Tech Stack

**Frontend**

- `index.html` – full landing page (Home / Products / Contact)
- Inline CSS and JavaScript in the same file for simplicity

**Backend (Zoho side)**

- **Zoho SalesIQ**
  - Zobot running in **Deluge** mode
  - `Message handler` – entry and initial branching
  - `Context handler` – question flows and API calls
- **Zoho Connections**
  - Pre-configured connections to Desk / Subscriptions (if used)

No external server (Node, Django, etc.) is required.  
All “backend” logic sits inside **Zoho’s Deluge environment**.

---

## 📁 Project Structure

```text
.
├── index.html    # Main website (Home / Products / Contact + SalesIQ snippet)
└── README.md     # This file
