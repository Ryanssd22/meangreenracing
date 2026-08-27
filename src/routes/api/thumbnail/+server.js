// Get a thumbnail for media EX) "[ENDPOINT]/api/thumbnail?img=gallery/2013/misc/CC.webp"
export const config = { runtime: 'nodejs20.x' }; // force Node, not Edge

import { json } from '@sveltejs/kit';
import sharp from 'sharp';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { CLOUDFLARE_ACCESS, CLOUDFLARE_SECRET_ACCESS, CLOUDFLARE_ENDPOINT } from '$env/static/private';
import { error } from '@sveltejs/kit';

const r2 = new S3Client({
  region: 'auto',
  endpoint: CLOUDFLARE_ENDPOINT,
  credentials: {
    accessKeyId: CLOUDFLARE_ACCESS,
    secretAccessKey: CLOUDFLARE_SECRET_ACCESS,
  },
});

export async function GET({ url, setHeaders }) {
  const key = url.searchParams.get('img');       // e.g. ?img=photos/cat.jpg
  const width = Number(url.searchParams.get('w')) || 240;
  const height = Number(url.searchParams.get('h')) || 240;


  if (!key) throw error(400, 'Missing ?img= param');

  const obj = await r2.send(new GetObjectCommand({ Bucket: 'mgr-media', Key: key }));
  const buffer = Buffer.from(await obj.Body.transformToByteArray());

  const image = sharp(buffer);
  const metadata = await image.metadata();

  const thumb = await sharp(buffer)
    .resize(width, height, { fit: 'cover' })
    .toFormat('webp')
    .toBuffer();

  setHeaders({
    'Content-Type': 'image/webp',
    'Cache-Control': 'public, max-age=31536000, immutable', // cache it hard
    'X-Original-Width': String(metadata.width),
    'X-Original-Height': String(metadata.height),
  });

  return new Response(thumb);
}