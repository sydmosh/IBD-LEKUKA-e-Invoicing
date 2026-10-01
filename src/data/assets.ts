import fs from "node:fs";
import path from "node:path";

export interface AssetFlags {
  hasRslScreenshot: boolean;
}

/**
 * Checked at request/render time on the server so the deck never requests an
 * image that does not exist. Drop the supplied RSL platform screenshot into
 * public/images/rsl-platform-screenshot.png and it is picked up automatically.
 */
export function getAssetFlags(): AssetFlags {
  const screenshot = path.join(
    process.cwd(),
    "public",
    "images",
    "rsl-platform-screenshot.png"
  );

  return {
    hasRslScreenshot: fs.existsSync(screenshot),
  };
}
