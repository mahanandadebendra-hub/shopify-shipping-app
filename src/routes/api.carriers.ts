09.01 09:34
import { Router } from "express";

export default function apiCarriers(prisma, logger) {
  const router = Router();

  router.get("/", async (req, res) => {
    const carriers = await prisma.carrierCredential.findMany();
    res.json(carriers);
  });

  router.post("/", async (req, res) => {
    try {
      const { shopId, provider, creds } = req.body;
      const carrier = await prisma.carrierCredential.create({
        data: { shopId, provider, creds },
      });
      res.json(carrier);
    } catch (err) {
      logger.error(err);
      res.status(500).json({ error: "Failed to add carrier" });
    }
  });

  return router;
}
