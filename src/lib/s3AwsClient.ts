import { S3Client } from "@aws-sdk/client-s3";

const { ACCOUNT_ID, ACCESS_KEY_ID, SECRET_ACCESS_KEY } = process.env;

export const s3AwsClient = new S3Client({
  region: "auto",
  endpoint: `https://${ACCOUNT_ID}.eu.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
  },
});
