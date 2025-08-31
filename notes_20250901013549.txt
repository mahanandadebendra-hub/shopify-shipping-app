09.01 01:34
import express from "express";
import cors from "cors";
import helmet from "helmet";
import pino from "pino";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { shopifyApi, ApiVersion } from "@shopify/shopify-api";
import { validateEnv } from "./utils/validateEnv.js";
import authRoutes from "./routes/auth.js";
import webhookRoutes from "./routes/webhooks.js";
import apiLabels from "./routes/api.labels.js";
import apiReports from "./routes/api.reports.js";
import apiSettings from "./routes/api.settings.js";
import apiCarriers from "./routes/api.carriers.js";

dotenv.config();
validateEnv();

const logger = pino();
const prisma = new PrismaClient();

const shopify = shopifyApi({
  apiKey: process.env.SHOPIFY_API_KEY!,
  apiSecretKey: process.env.SHOPIFY_API_SECRET!,
  scopes: (process.env.SCOPES || "read_orders,write_fulfillments").split(","),
  hostName: process.env.HOST!.replace(/https?:\/\//, ""),
  apiVersion: ApiVersion.July24,
  isEmbeddedApp: true,
});

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json({ limit: "2mb" }));

// Routes
app.use("/auth", authRoutes(shopify, prisma, logger));
app.use("/webhooks", webhookRoutes(shopify, prisma, logger));
app.use("/api/labels", apiLabels(prisma, shopify, logger));
app.use("/api/reports", apiReports(prisma, logger));
app.use("/api/settings", apiSettings(prisma, logger));
app.use("/api/carriers", apiCarriers(prisma, logger));

// Health check
app.get("/health", (req, res) => res.json({ status: "ok" }));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  logger.info(` Server running on port ${port}`);
});
