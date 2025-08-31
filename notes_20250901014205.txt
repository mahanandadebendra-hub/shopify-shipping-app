09.01 01:40
import { z } from "zod";

const schema = z.object({
  SHOPIFY_API_KEY: z.string(),
  SHOPIFY_API_SECRET: z.string(),
  SCOPES: z.string(),
  HOST: z.string().url(),
  DATABASE_URL: z.string().url(),
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
  AWS_REGION: z.string(),
  S3_BUCKET: z.string(),
  REDIS_URL: z.string().optional(),
});

export function validateEnv() {
  schema.parse(process.env);
}
