09.01 08:50
import { Router } from "express";

export default function webhookRoutes(shopify, prisma, logger) {
  const router = Router();

  router.post("/orders-paid", async (req, res) => {
    try {
      // TODO: enqueue job for label generation
      logger.info(" Order paid webhook received");
      res.sendStatus(200);
    } catch (err) {
      logger.error(err);
      res.sendStatus(500);
    }
  });

  router.post("/app-uninstalled", async (req, res) => {
    try {
      logger.info(" App uninstalled");
      res.sendStatus(200);
    } catch (err) {
      logger.error(err);
      res.sendStatus(500);
    }
  });

  router.post("/gdpr/*", (req, res) => {
    logger.info(" GDPR webhook received");
    res.sendStatus(200);
  });

  return router;
}
