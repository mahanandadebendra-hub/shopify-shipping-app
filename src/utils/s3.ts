09.01 08:55
import AWS from "aws-sdk";

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  region: process.env.AWS_REGION!,
});

export async function uploadLabelPdf(shopId: string, orderId: string, buffer: Buffer) {
  const key = `labels/${shopId}/${orderId}-${Date.now()}.pdf`;

  await s3
    .putObject({
      Bucket: process.env.S3_BUCKET!,
      Key: key,
      Body: buffer,
      ContentType: "application/pdf",
    })
    .promise();

  return `https://${process.env.S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
}
