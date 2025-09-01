09.01 09:29
import { Router } from "express";

export default function apiSettings(prisma, logger) {
  const router = Router();

  router.get("/", async (req, res) => {
    try {
      const { shopId } = req.query;
      const shop = await prisma.shop.findUnique({ where: { id: String(shopId) } });
      if (!shop) return res.status(404).json({ error: "Shop not found" });
      res.json(shop.settings);
    } catch (err) {
      logger.error(err);
      res.status(500).json({ error: "Failed to fetch settings" });
    }
  });

  router.put("/", async (req, res) => {
    try {
      const { shopId, settings } = req.body;
      const shop = await prisma.shop.update({
        where: { id: shopId },
        data: { settings },
      });
      res.json(shop.settings);
    } catch (err) {
      logger.error(err);
      res.status(500).json({ error: "Failed to update settings" });
    }
  });

  return router;
}
