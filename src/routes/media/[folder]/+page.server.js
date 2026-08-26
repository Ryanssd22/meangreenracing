import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { CLOUDFLARE_ACCESS, CLOUDFLARE_SECRET_ACCESS, CLOUDFLARE_ENDPOINT } from '$env/static/private';

const s3 = new S3Client({
  region: "auto",
  endpoint: CLOUDFLARE_ENDPOINT,
  credentials: {
    accessKeyId: CLOUDFLARE_ACCESS,
    secretAccessKey: CLOUDFLARE_SECRET_ACCESS,
  },
});

export const load = (({ params }) => {
  const folder = params.folder.replace("_", "/");
  const command = new ListObjectsV2Command({ Bucket: "mgr-media", Prefix: ("gallery/" + folder) });
  const gallery_response = s3.send(command);
  
  return {
      "gallery_response": gallery_response,
  };
});