import { readFile } from "node:fs/promises";
import path from "node:path";

export const alt = "Andreas Busk Mikkelsen portfolio";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const imagePath = path.join(process.cwd(), "public", "opengraph-image.png");
  const imageBuffer = await readFile(imagePath);
  const imageBytes = new Uint8Array(imageBuffer);

  return new Response(imageBytes, {
    headers: {
      "content-type": contentType,
      "cache-control": "public, max-age=31536000, immutable",
    },
  });
}
