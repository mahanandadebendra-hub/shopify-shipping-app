09.01 09:18
import { Router } from "express";
import { uploadLabelPdf } from "../utils/s3.js";
import { generateFallbackLabel } from "../pdf/generator.js";

export default function apiLabels(prisma, shopify, logger) {
  const router = Router();

  // Manual label generation (fallback for testing)
  router.post("/generate", async (req, res) => {
    try {
      const { shopId, orderId, from, to, carrier } = req.body;

      const pdf = await generateFallbackLabel({ orderId, from, to, carrier });
      const url = await uploadLabelPdf(shopId, orderId, pdf);

      const label = await prisma.orderLabel.create({
        data: {
          shopId,
          orderId,
          carrier,
          service: "manual",
          labelUrl: url,
          tracking: "TESTTRACK123",
          status: "GENERATED",
        },
      });

      res.json({ success: true, label });
    } catch (err) {
      logger.error(err);
      res.status(500).json({ error: "Failed to generate label" });
    }
  });

  // Download by id
  router.get("/:id/download", async (req, res) => {
    try {
      const label = await prisma.orderLabel.findUnique({
        where: { id: req.params.id },
      });
      if (!label) return res.status(404).json({ error: "Label not found" });
      res.redirect(label.labelUrl);
    } catch (err) {
      logger.error(err);
      res.status(500).json({ error: "Download failed" });
    }
  });

  return router;
}
