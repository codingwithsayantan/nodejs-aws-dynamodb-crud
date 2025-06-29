import { table } from "console";
import "dotenv/config";

const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION } = process.env;

const CONST = {
  AWS: {
    awsAccessKeyID: AWS_ACCESS_KEY_ID,
    awsSecretAccessKey: AWS_SECRET_ACCESS_KEY,
    awsRegion: AWS_REGION,
  },
  DYNAMODB: {
    tableNameUsers: "users",
  },
} as const;

export default CONST;
