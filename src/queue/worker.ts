09.01 09:41
import { Worker, Queue } from "bullmq";
import { PrismaClient } from "@prisma/client";
import { uploadLabelPdf } from "../utils/s3.js";
import { generateFallbackLabel } from "../pdf/generator.js";
import pino from "pino";

const prisma = new PrismaClient();
const logger = pino();

const connection = {
  connection: {
    url: process.env.REDIS_URL!,
  },
};

export const labelQueue = new Queue("labels", connection);

new Worker(
  "labels",
  async (job) => {
    logger.info(` Processing job ${job.id} for shop ${job.data.shopId}`);
    const { shopId, orderId, from, to, carrier } = job.data;

    try {
      // TODO: Replace with actual carrier API integration (AusPost/Sendle)
      const pdf = await generateFallbackLabel({ orderId, from, to, carrier });
      const url = await uploadLabelPdf(shopId, orderId, pdf);

      await prisma.orderLabel.create({
        data: {
          shopId,
          orderId,
          carrier,
          service: "auto",
          labelUrl: url,
          tracking: `TRACK-${Date.now()}`,
          status: "GENERATED",
        },
      });

      logger.info(`✅ Label created for order ${orderId}`);
    } catch (err) {
      logger.error(err);
      await prisma.jobLog.create({
        data: {
          shopId,
          jobType: "label-generation",
          status: "FAILED",
          errorJSON: { message: err.message },
        },
      });
      throw err;
    }
  },
  connection
);
