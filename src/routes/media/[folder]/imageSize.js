// src/lib/server/imageSize.js
export async function getRemoteImageSize(url, chunkSize = 64) {
  const res = await fetch(url, {
    headers: { Range: `bytes=0-${chunkSize - 1}` }
  });

  if (res.status !== 206 && res.status !== 200) {
    throw new Error(`Unexpected status ${res.status}`);
  }

  const buffer = await res.arrayBuffer();
  return parseWebpDimensions(new Uint8Array(buffer));
}

function parseWebpDimensions(bytes) {
  const dv = new DataView(bytes.buffer);

  const isRiff =
    bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46;
  const isWebp =
    bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50;

  if (!isRiff || !isWebp) {
    throw new Error("Not a WebP file");
  }

  const fourCC = String.fromCharCode(bytes[12], bytes[13], bytes[14], bytes[15]);

  if (fourCC === "VP8X") {
    const width = (bytes[24] | (bytes[25] << 8) | (bytes[26] << 16)) + 1;
    const height = (bytes[27] | (bytes[28] << 8) | (bytes[29] << 16)) + 1;
    return { width, height };
  }

  if (fourCC === "VP8 ") {
    const width = dv.getUint16(26, true) & 0x3fff;
    const height = dv.getUint16(28, true) & 0x3fff;
    return { width, height };
  }

  if (fourCC === "VP8L") {
    const bits = dv.getUint32(21, true);
    const width = (bits & 0x3fff) + 1;
    const height = ((bits >> 14) & 0x3fff) + 1;
    return { width, height };
  }

  throw new Error(`Unrecognized WebP chunk type: ${fourCC}`);
}