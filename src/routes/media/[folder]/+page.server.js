import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { CLOUDFLARE_ACCESS, CLOUDFLARE_SECRET_ACCESS, CLOUDFLARE_ENDPOINT } from '$env/static/private';
import { PUBLIC_CLOUDFLARE_S2_ENDPOINT } from '$env/static/public';
import { getRemoteImageSize } from './imageSize.js';

const s3 = new S3Client({
  region: "auto",
  endpoint: CLOUDFLARE_ENDPOINT,
  credentials: {
    accessKeyId: CLOUDFLARE_ACCESS,
    secretAccessKey: CLOUDFLARE_SECRET_ACCESS,
  },
});

async function loadImages(folder) {
  const command = new ListObjectsV2Command({ Bucket: "mgr-media", Prefix: ("gallery/" + folder) });
  const response = await s3.send(command);

  console.log("RESPONSE:", response);

  let image_links = (response?.Contents ?? []).map(image => (PUBLIC_CLOUDFLARE_S2_ENDPOINT + image.Key));
  image_links = image_links.filter(link => link.includes(".webp") || link.includes(".mp4"));

  const images = await Promise.all(
    image_links.map(async (link) => {
      let dimensions = {width:1920, height: 1080};
      if (link.endsWith(".webp")) {
        try {
          dimensions = await getRemoteImageSize(link);
        } catch (err) {
          console.error(`Failed to get dimensions for ${link}:`, err.message);
        }
      }
      return { link, dimensions };
    })
  );

  console.log("IMAGES:", images);
  return images;
}

export const load = (({ params }) => {
  const folder = params.folder.replace("_", "/");

  return {
    images: loadImages(folder) // not awaited — streams in once resolved
  };
});