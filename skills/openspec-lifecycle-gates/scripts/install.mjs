import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { findRepoRoot } from "./repo-root.mjs";

const scriptsDir = dirname(fileURLToPath(import.meta.url));
const extraArgs = process.argv.slice(2);
const repoRoot = findRepoRoot();

function run(script) {
  const result = spawnSync(process.execPath, [join(scriptsDir, script), ...extraArgs], {
    cwd: repoRoot,
    stdio: "inherit",
  });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

run("pull-openspec.mjs");
run("install-pointers.mjs");
