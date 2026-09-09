import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// This folder is `skills/openspec-lifecycle-gates` in the pack, or
// `.agents/skills/openspec-lifecycle-gates` after `npx skills add`. Walk up.

export function findRepoRoot() {
  const scriptsDir = dirname(fileURLToPath(import.meta.url));
  let dir = scriptsDir;
  for (;;) {
    const parent = dirname(dir);
    if (parent === dir) {
      break;
    }
    dir = parent;
    if (existsSync(join(dir, ".git")) || existsSync(join(dir, "openspec", "config.yaml"))) {
      return dir;
    }
  }
  return join(scriptsDir, "../../..");
}
