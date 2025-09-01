09.01 14:15
# Shopify Shipping Label App (Australia)

##  Features
- Auto-generate shipping labels (PDF) on order paid.
- Supports Australia Post & Sendle (extensible).
- Stores labels in AWS S3.
- BullMQ queue for background jobs.
- Admin UI with Polaris (Dashboard, Orders, Reports, Settings).
- Billing with Shopify Billing API.

---

##  Prerequisites
- Node.js 20+
- pnpm or npm
- Shopify Partner account + Dev Store
- PostgreSQL (local via Docker or Neon DB)
- Redis (local via Docker or Upstash)
- AWS S3 bucket
- ngrok (if testing locally)

---

## ⚙️ Setup
1. Clone repo or copy files into Replit.
2. Install deps:
   ```bash
   pnpm install
