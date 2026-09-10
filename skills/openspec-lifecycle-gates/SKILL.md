---
name: openspec-lifecycle-gates
description: >-
  Stop and ask before writing OpenSpec files, starting implementation,
  changing the plan, filing a finished change, or updating the product
  overview. Use whenever those moments happen, including when the user
  changes the product after coding started. Do not wait for them to name
  this skill.
license: MIT
metadata:
  author: ratsuns
---

# OpenSpec lifecycle gates

Stop and ask. Do not do the next OpenSpec step until the user answers in a **separate message**.

Silence is not yes. “Sounds good” about the idea is not yes. A yes covers only the files and action you named.

The editor does not matter; OpenSpec and this playbook do.

This `SKILL.md` is the full playbook.

Longer write-up: [references/workflow.md](references/workflow.md).

## Stay on this branch

Keep the code and the OpenSpec files on **whatever branch you are already on**.

That includes the plan, the updates after we change our minds, the “file this change away” folder, and the product overview.

- Do not switch branches, commit, or push unless the user says to.
- If they say “this is on main,” they mean GitHub `main` already has the code, **or** this branch is the PR. Do **not** switch to `main`.
- You may call the work done only when the code and the OpenSpec files on **this** branch all match. Files sitting uncommitted are not finished.

## Do not detect the editor

You already know which tool you are. Do **not** run a script to guess the IDE.

Do **not** install packages, download CLIs, or write files into other tools’ skill folders.

## If OpenSpec is missing

This skill does not install the OpenSpec CLI.

OpenSpec is already here if `openspec --version` works, or `pnpm exec openspec --version` works, or `@fission-ai/openspec` is in `package.json`. Prefer `pnpm exec openspec` if `openspec` is not on `PATH`. Do not ask to install.

Only if none of those is true:

1. Do **not** run `npm`, `npx`, or `openspec init` yourself.
2. Show this command for the user to run in **their** terminal:

```bash
npx @fission-ai/openspec@latest --version
```

3. Write numbered options and wait. Example:
   1. I will run that command, then say when it is done.
   2. Skip OpenSpec for now.
4. After they say it is done, continue. If they skip, keep working without OpenSpec commands.

Ask this at most once per session.

## How to ask

Write **1. 2. 3.** in the chat. One question. Then wait.

Do **not** also open a multiple-choice popup for the same question.

`/lifecycle-check` is this pack’s optional shortcut. `/opsx-*` appear only if this project already has OpenSpec commands.

Do not invent a second flow in a pointer file. Pointers only send the agent here.

## When you MUST ask

Use this wording:

1. **New work vs existing change** — before I create or write OpenSpec files.
2. **Start coding** — the plan is done; you have not said to implement it.
3. **The ticket is wrong** — we built something the written plan does not allow (or omits). After we start coding, if you change the product (for example delete a page the plan still requires), stop and ask whether to **update the written plan**. Do this as soon as that happens. Do not wait for the user to mention this skill.
4. **The work landed** — the tasks are done on this branch. Ask: file this OpenSpec change away on **this** branch, or leave it open?
5. **The story changed** — only **after** the change is filed away, and only if the product overview’s use cases, URLs, or “shipped vs still in flight” list is now wrong.

If they open the overview **before** the change is filed away: say what would need to change, and wait. Do not edit the overview yet.

When a round of extra tweaks is over (lint, build, formatting, “does this look right”), say in **one sentence** what the next ask is (update the plan, or file the change away). Do not wait for them to point you at this skill.

## When you MUST NOT ask

Do **not** ask on every commit, every test, or in the middle of a small bugfix. Do not ask again after they already said yes. Do not offer to file away unfinished work. Do not ask them to install OpenSpec if it already works.

If you are only unsure, **keep working**. Do not spam questions. Changing the product so it no longer matches the written plan is not “just unsure” — ask item 3 above.

## After they say yes

| They said yes to | Then do this, still on this branch |
| --- | --- |
| 1 | New change → `openspec-propose` / `openspec new change`. Existing → `openspec-update-change`. |
| 2 | `openspec-apply-change` |
| 3 | `openspec-update-change` to fix the plan. Implement more only if they want the old plan kept. |
| 4 | Copy the change’s spec into `openspec/specs/`, then move the change folder into `openspec/changes/archive/`. If they already said yes to **both** of those in one answer, do both. Do not ask a second time “copy the spec first?” |
| 5 | Edit `openspec/application-overview/overview.md` only |
