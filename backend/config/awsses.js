import SES from "aws-sdk/clients/ses.js";
export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
export const AWS_REGION = "ap-southeast-2";
export const AWS_VERSION = "2010-12-12";
export const AWS_BUCKET = "royalcrestimages";

const awsConfig = {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region: AWS_REGION,
    version: AWS_VERSION,
};

export const sender_email = "Royal Crest Estate <suniltariq08@gmail.com>";
export const CLIENT_URL = "http://localhost";

export const AWSSES = new SES(awsConfig);
console.log("✅ AWS SES is connected!");