---
name: openspec-lifecycle-gates
description: >-
  Prompts the user at five software-lifecycle decision points and waits for an
  explicit yes before writing OpenSpec files, applying a change, changing
  scope, syncing/archiving, or refreshing the product overview. Use when
  planning or proposing a change, starting apply, a spec disagrees with code,
  a change looks finished, or a shipped story/URL changed. Also use when the
  user says lifecycle-check, hygiene, or archive prompt.
license: MIT
compatibility: Requires Node.js 20.19+ and the OpenSpec CLI (@fission-ai/openspec)
metadata:
  author: ratsuns
---

# OpenSpec lifecycle gates

Stop and ask. Do not run the next workflow until the user answers **in a separate message**.

Silence is not yes. “Sounds good” about the idea is not yes. A yes covers only the files and action you named.

The editor does not matter; OpenSpec and this playbook do.

This `SKILL.md` is the full playbook. Install with `npx skills add ratsuns/skills --skill openspec-lifecycle-gates`.

Longer write-up: [references/workflow.md](references/workflow.md).

## Do not detect the editor

You already know which tool you are. Do **not** run a script to guess the IDE.

To pull official OpenSpec skills from the CLI and plant short pointers in skill folders that already exist, run from this skill folder:

`node scripts/install.mjs`

That install does two things:

1. `npm install -g @fission-ai/openspec@latest`, then `openspec init` or `openspec update` — official `openspec-*` skills and `/opsx-*` commands come from the CLI. Do not vendor them.
2. `scripts/install-pointers.mjs` — writes “read this playbook” files into skill folders that already exist. It does not identify the current chat.

## Tool extras (only if they exist)

- **Choice UI:** Always write numbered options in the chat. If this tool has a tap-to-choose form (for example AskQuestion), also show that. Do not rely on it alone.
- **Slash commands:** `/lifecycle-check` is ours. `/opsx-*` appear after the OpenSpec pull if this tool uses commands.

Do not invent a second flow in a pointer file. Pointers only send the agent here.

## When you MUST prompt

Use this wording:

1. **New work vs existing change** — before I create or write OpenSpec files.
2. **Start coding** — plan is done; you have not said “apply.”
3. **The ticket is wrong** — code and the spec disagree, and I would have to change scope.
4. **The work landed** — tasks done, code on `main`; sync + archive or leave it open.
5. **The story changed** — after archive, only if a use case, URL, or “ships vs in flight” line moved (overview).

## When you MUST NOT prompt

Do **not** prompt on every commit, every test, mid-bugfix, or after they already said yes. Incomplete work stays open; do not ask to archive it.

If you are merely unsure, **keep working**. False positives are what make this interruptive.

## How to prompt

Read-only first (`openspec list`, status, specs, code, overview).

Then write the gate as **numbered options in chat**. If this tool has a choice form, also show that. One question, two or more options. Put the facts in the question. Then **stop** and wait.

After yes:

| Gate | Then |
| --- | --- |
| 1 | New change → `openspec-propose` / `openspec new change`. Existing → `openspec-update-change`. |
| 2 | `openspec-apply-change` |
| 3 | `openspec-update-change` if they want the plan fixed; apply only if they keep the spec |
| 4 | `openspec-sync-specs` then `openspec-archive-change` (those skills still ask their own sync confirm if needed) |
| 5 | Edit `openspec/application-overview/overview.md` only |
