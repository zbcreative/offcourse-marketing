/**
 * GitHub Pages skips paths starting with _ ; .nojekyll disables Jekyll so static files work.
 * Eleventy clears output each build, so we recreate this file after every build.
 */
import { writeFile } from "node:fs/promises";
import { join } from "node:path";

await writeFile(join(process.cwd(), "docs", ".nojekyll"), "", "utf8");
