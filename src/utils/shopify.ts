09.01 08:31
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function storeShopToken(shopDomain: string, accessToken: string) {
  const shop = await prisma.shop.upsert({
    where: { shopDomain },
    update: { accessToken },
    create: {
      shopDomain,
      accessToken,
      settings: {},
    },
  });
  return shop;
}

export async function getShopToken(shopDomain: string) {
  const shop = await prisma.shop.findUnique({
    where: { shopDomain },
  });
  return shop?.accessToken || null;
}
