import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { findRepoRoot } from "./repo-root.mjs";

// Not an IDE detector. Writes "follow the canonical playbook" into skill
// folders this repo already has. Add a root to SKILL_ROOTS if a new tool
// uses a project …/skills directory.

const thisSkillDir = join(dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = findRepoRoot();

const DESCRIPTION = `Prompts the user at five software-lifecycle decision points and waits for an
  explicit yes before writing OpenSpec files, applying a change, changing
  scope, syncing/archiving, or refreshing the product overview. Use when
  planning or proposing a change, starting apply, a spec disagrees with code,
  a change looks finished, or a shipped story/URL changed. Also use when the
  user says lifecycle-check, hygiene, or archive prompt.`;

const SKILL_ROOTS = [
  ".agents/skills",
  ".cursor/skills",
  ".claude/skills",
  ".codex/skills",
  ".github/skills",
  ".windsurf/skills",
  ".agent/skills",
];

function pointerMarkdown(name) {
  return `---
name: ${name}
description: >-
  ${DESCRIPTION}
---

# OpenSpec lifecycle gates

Read and follow \`skills/openspec-lifecycle-gates/SKILL.md\`. That file is the full playbook.

Do not invent a second flow here. Always write numbered options in chat. If this tool has a choice form, also show it.
`;
}

function writePointer(skillsRoot, folder, name) {
  const dir = join(repoRoot, skillsRoot, folder);
  // Do not stub the installed playbook (pack path or `npx skills add` copy).
  if (resolve(dir) === resolve(thisSkillDir) || existsSync(join(dir, "scripts", "install.mjs"))) {
    return null;
  }
  mkdirSync(dir, { recursive: true });
  const file = join(dir, "SKILL.md");
  writeFileSync(file, pointerMarkdown(name), "utf8");
  return file;
}

const written = [];

for (const root of SKILL_ROOTS) {
  const abs = join(repoRoot, root);
  if (!existsSync(abs)) {
    continue;
  }
  const file = writePointer(root, "openspec-lifecycle-gates", "openspec-lifecycle-gates");
  if (file) {
    written.push(file);
  }
}

if (written.length === 0) {
  console.log(
    "No skill folders found. Put a pointer in a tool skills folder, or open skills/openspec-lifecycle-gates/SKILL.md.",
  );
} else {
  for (const file of written) {
    console.log(`wrote ${file.slice(repoRoot.length + 1)}`);
  }
}
