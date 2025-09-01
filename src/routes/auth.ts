09.01 08:42
import { Router } from "express";
import { storeShopToken } from "../utils/shopify.js";

export default function authRoutes(shopify, prisma, logger) {
  const router = Router();

  router.get("/install", async (req, res) => {
    try {
      const shop = req.query.shop;
      if (!shop) return res.status(400).send("Missing shop param");
      const authRoute = await shopify.auth.begin({
        shop: shop.toString(),
        callbackPath: "/auth/callback",
        isOnline: false,
        rawRequest: req,
        rawResponse: res,
      });
      return res.redirect(authRoute);
    } catch (err) {
      logger.error(err);
      res.status(500).send("OAuth error");
    }
  });

  router.get("/callback", async (req, res) => {
    try {
      const { shop, accessToken } = await shopify.auth.callback({
        rawRequest: req,
        rawResponse: res,
      });
      await storeShopToken(shop, accessToken);
      logger.info(`✅ Installed on ${shop}`);
      res.redirect(`https://${shop}/admin/apps`);
    } catch (err) {
      logger.error(err);
      res.status(500).send("Callback error");
    }
  });

  return router;
}
