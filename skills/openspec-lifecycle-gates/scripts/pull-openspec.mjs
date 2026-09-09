import { existsSync, readdirSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { join } from "node:path";
import { findRepoRoot } from "./repo-root.mjs";

// Pull official OpenSpec skills/commands from the installed CLI.
// Do not vendor those files. Upgrade the CLI, then init or update.

const repoRoot = findRepoRoot();

const args = new Set(process.argv.slice(2));
const skipUpgrade = args.has("--skip-upgrade");
const useNpx = args.has("--use-npx");

const TOOL_DIRS = [
  [".cursor", "cursor"],
  [".claude", "claude"],
  [".codex", "codex"],
  [".github", "github-copilot"],
  [".windsurf", "devin"],
  [".devin", "devin"],
  [".agent", "agents"],
  [".agents", "agents"],
];

function resolveBin(name) {
  if (process.platform !== "win32") {
    return name;
  }
  return `${name}.cmd`;
}

function run(command, commandArgs) {
  const result = spawnSync(resolveBin(command), commandArgs, {
    cwd: repoRoot,
    stdio: "inherit",
    env: { ...process.env, OPENSPEC_NO_UPDATE_CHECK: "1" },
  });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

function commandSucceeds(command, commandArgs) {
  const result = spawnSync(resolveBin(command), commandArgs, {
    cwd: repoRoot,
    encoding: "utf8",
  });
  return result.status === 0;
}

function detectTools() {
  const fromEnv = process.env.OPENSPEC_TOOLS?.trim();
  if (fromEnv) {
    return fromEnv
      .split(",")
      .map((id) => id.trim())
      .filter(Boolean);
  }

  const found = [];
  for (const [dir, id] of TOOL_DIRS) {
    if (existsSync(join(repoRoot, dir))) {
      found.push(id);
    }
  }

  const tools = new Set(found);
  tools.add("agents");
  if (tools.size === 1) {
    tools.add("cursor");
    tools.add("claude");
  }
  return [...tools];
}

function skillRoots() {
  return [
    ".cursor/skills",
    ".claude/skills",
    ".codex/skills",
    ".github/skills",
    ".windsurf/skills",
    ".devin/skills",
    ".agent/skills",
    ".agents/skills",
  ];
}

function hasOfficialOpenspecSkills() {
  for (const root of skillRoots()) {
    const abs = join(repoRoot, root);
    if (!existsSync(abs)) {
      continue;
    }
    const names = readdirSync(abs);
    if (names.some((name) => name.startsWith("openspec-"))) {
      return true;
    }
  }
  return false;
}

function ensureCli() {
  if (skipUpgrade || useNpx) {
    return;
  }

  console.log("Installing latest OpenSpec CLI: npm install -g @fission-ai/openspec@latest");
  run("npm", ["install", "-g", "@fission-ai/openspec@latest"]);
}

function runOpenspec(openspecArgs) {
  if (useNpx || !commandSucceeds("openspec", ["--version"])) {
    console.log(`npx @fission-ai/openspec@latest ${openspecArgs.join(" ")}`);
    run("npx", ["--yes", "@fission-ai/openspec@latest", ...openspecArgs]);
    return;
  }

  console.log(`openspec ${openspecArgs.join(" ")}`);
  run("openspec", openspecArgs);
}

ensureCli();

const tools = detectTools();
const toolsFlag = tools.join(",");

if (hasOfficialOpenspecSkills()) {
  console.log("Official OpenSpec skills already present. Refreshing from the CLI.");
  runOpenspec(["update", "--force"]);
} else {
  console.log(`No official OpenSpec skills yet. Installing for: ${toolsFlag}`);
  runOpenspec(["init", "--tools", toolsFlag, "--force", "--no-animation"]);
}

console.log("Official OpenSpec skills now come from the installed CLI, not this pack.");
