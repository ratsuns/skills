---
name: git-worktrees
description: >-
  Repeatable git worktree pattern: extra folder for a side job, work freely,
  then when that side job is finished show numbered options. Use when the user
  wants a worktree or extra folder (any wording), when a side-folder job
  finishes (any wording), or when they ask what to do with extra-folder work.
  Before starting, tell them a worktree is a snapshot in time of the branch
  they are on. Do not treat "I'm done" / "now what" as a worktree unless a
  worktree job is actually in play.
license: MIT
compatibility: Requires git
metadata:
  author: ratsuns
---

# Git worktrees

A worktree is an extra folder of the same git project. Any job can run there. The editor does not matter; git does.

**Done in the worktree ≠ done in the project.** When the side job is finished, stop. Show options. Wait.

## This file is the playbook

This `SKILL.md` is the full playbook. Do not look for a pointer file or an install script. Do not invent a second flow.

You already know which tool you are. Do **not** run a script to guess the IDE or the model.

This skill lives at `skills/git-worktrees/` in the `ratsuns/skills` collection. To add skills from that repo, run `npx skills add ratsuns/skills` and pick from the list. Do not install every skill unless they asked for all.

If they already named **git-worktrees**, this `SKILL.md` is the full playbook. Copy the whole folder (not a stub) into `.agents/skills/git-worktrees/`, `.cursor/skills/git-worktrees/`, `.claude/skills/git-worktrees/`, or `.codex/skills/git-worktrees/` (or the home-dir copies).

## Create the extra folder

Git is the fallback. Do **not** scan the machine to guess which editor this is.

1. **Already isolated?** If `git-dir` and `git-common-dir` differ, and this is not a submodule (`git rev-parse --show-superproject-working-tree` is empty), you are already in a worktree. Use it. Do not create another.
2. **Native create tool:** If *this* agent already has a worktree/create-isolated-folder action (you already know if you do), use that. Then skip to **Project setup**.
3. **Git fallback** — `git worktree add` from the start branch. Path order:
   - The path they named.
   - Else this tool’s documented default worktrees directory.
   - Else an existing project-local `.worktrees/` or `worktrees/` (`.worktrees` wins). That folder **must** be gitignored. If it is not, add it to `.gitignore` and tell them. Do not commit the ignore unless they ask.
   - Else a folder they can open.
4. **Project setup** (in the extra folder), then continue the job:
   - If the **project they are editing** documents extra-folder setup, run that.
   - Else, if the extra folder has a lockfile or manifest, install with **that** project’s tool: `packageManager` in `package.json`, or `pnpm-lock.yaml` → pnpm, `yarn.lock` → yarn, `bun.lock` / `bun.lockb` → bun, `package-lock.json` → npm, `Cargo.toml` → cargo, `go.mod` → go, `pyproject.toml` / `requirements.txt` → that Python tool. Skip if none of these exist. Do not assume npm.

**Choice UI:** Always write numbered options in the chat. If this tool has a tap-to-choose form, also show that. Do not rely on it alone.

## Do not be rigid

No passphrases. Understand **intent**.

- **Start:** they want a second folder / isolated job / git worktree. Any wording is enough.
- **During:** they work freely. Do not make them say magic words to continue. If they want the extra folder to pick up later start-branch work and keep going, that is **Pull in latest changes from {start branch} and continue working** (below). Do it in the extra folder only. Do not treat that as “the side job is finished.”
- **Finished:** they mean the side job is done (any wording). Then show options. Do not save, merge, push, or delete on your own.
- **Not a worktree:** “I’m done, now what?” on a normal branch with no extra-folder job is about *that* branch. Do not show worktree options.

Only use this playbook when a worktree is in play or they asked to start one.

Do not invent a sample branch name. Use the branch they are actually on. Call it the **start branch**. The branch they want extra work put onto is the **target branch** (usually the start branch).

## Name the remote, do not assume GitHub

People use different git hosts (GitHub, GitLab, Bitbucket, Azure DevOps, Codeberg, Gitea, a company server, and others). Do **not** say GitHub unless this project’s remote is GitHub.

Before talking about push or backup, identify the host from this repo:

1. Read `git remote -v` (or `git remote get-url origin`) in the project they are working in.
2. Name the host from the URL: `github.com` → GitHub, `gitlab.com` or a `gitlab.` host → GitLab, `bitbucket.org` → Bitbucket, `dev.azure.com` / `visualstudio.com` → Azure DevOps, other hostnames → that hostname or the product they use.
3. Use that name in chat and in the numbered options (`push to GitLab`, `backup on Bitbucket`, and so on).
4. If there is no remote, say the work can only be saved locally until they add one. Do not offer “push to GitHub” as a default.
5. If there are several remotes, use `origin` unless they named a different one.

Push means `git push` to **this project’s remote**, not a specific vendor.

## Before any worktree work starts

Tell them, in plain language, **before** creating the extra folder or doing the side job:

- A worktree is a **snapshot in time** of whichever branch they are on right now. That is the **start branch**.
- The extra folder does **not** update itself if that branch later moves, is merged into `main`, or keeps getting work.
- Newer work from the start branch is pulled in **when they pick merge**, or **when they pick Pull in latest changes from {start branch} and continue working**, using the recipes below. It is not a self-update.

## Every time

1. They want a worktree (intent). Explain the snapshot (above). Create the extra folder using **Create the extra folder**. Remember the **start branch**.
2. Do that job only in the extra folder. Do not edit the start-branch folder unless they later pick merge into the start branch (and, if the start branch is `main`, they confirmed after the warning).
3. Project setup already ran as part of create. Do not skip it when a lockfile or documented setup exists.
4. When the side job is finished, inspect the extra folder and the start branch. If the extra folder is not clean, follow **Check the extra folder**: list files, show only those three options, wait. Do **not** show the finished 1–5 list as the merge/push/delete menu until extra unsaved work is handled. If extra is clean, write the finished **numbered options** in chat. Use a choice UI only if this tool has one.
5. Wait. Do only what they pick.

Name the start branch, the extra folder, and the extra branch. Do not say “here” alone.

In chat and in numbered options, use the extra **branch** name (`worktree/readme-test`). Do **not** paste the full disk path (`C:\Users\…\.cursor\worktrees\…`). Keep the full path for git commands only.

## Check the start branch before merge

The extra folder can look clean while the **start branch** has moved. Inspect the **start-branch folder** (not only the extra folder) before you treat merge as safe.

Run git there and tell them, in plain language, anything that is true:

- **Unsaved files** — uncommitted or untracked changes on the start branch
- **Saved locally, not on the remote** — commits that exist only on their machine (not pushed)
- **Remote is ahead** — the host has commits the start branch does not have yet
- **No remote tracking** — this branch was never pushed, so there is nothing to compare
- **In-progress git state** — merge, rebase, or cherry-pick still open

Do this **twice** for merge (and once before pull-in):

1. When the side job is finished and you show the numbered options. If option 1 (merge into the start branch) would mix extra work into a start branch that is dirty or not in sync, say so next to that option. Do not present merge as a quiet, clean default. If option 2 (Pull in latest changes from {start branch} and continue working) would miss unsaved start-branch files, say that those files will not come in until they are saved on the start branch.
2. After they pick merge, **before** you pull, merge, or edit the start branch. Repeat the check. If anything above is still true, **stop, alert, and wait**. Do not stash, commit, discard, or push their start-branch work unless they ask.

Name the start branch and what you found. Example: “`feat/…` has unsaved files” or “`feat/…` has 2 local commits not on the remote.”

## Check the extra folder (unsaved extra work)

Inspect the **extra folder** when the side job is finished, and again after they pick merge, pull-in, save/push, or delete.

Unsaved extra files are not a commit yet. Merge and push only move **saved** extra-branch commits. To put those files onto the start branch, they must **save them on the extra branch first**, then merge. Delete the extra folder and unsaved files are gone.

**Unsaved means only this:** `git status` in the extra folder shows modified or untracked files (working tree not clean).

**Not unsaved:** extra work already committed; extra branch not merged into the start branch; extra branch not pushed. Do **not** show the unsaved-edits picker for those.

After they say they saved, **run `git status` again** in the extra folder before asking. If it is clean, skip the unsaved picker and show the finished 1–5 options (or continue the merge they already picked).

If the extra folder is not clean:

1. **Stop. Do not** merge, pull in latest, push, or delete yet. Do not paste absolute disk paths.
2. For merge, the question text must be exactly this shape (replace `{name}` with the extra branch’s short name, e.g. `readme-test`):

   `worktree/{name} has unsaved edits. Merge cannot include that until it is saved on worktree/{name} branch.`

   Example: `worktree/readme-test has unsaved edits. Merge cannot include that until it is saved on worktree/readme-test branch.`

   For pull-in, push, or delete, keep the same two sentences and only swap the word `Merge` for `Pull`, `Push`, or `Delete`. Do not list file paths or a file-by-file inventory in the question.
3. Show **only** these three numbered options (not the finished 1–5 list as a substitute). Always write them in chat. Use a choice UI only if this tool has one.

The three options (tailor the verb to merge / pull-in / push / delete):

1. **Save the extra-folder work on the extra branch, then continue** — commit those files on the extra branch first. Then merge / pull in latest / push. (For delete: save first, then ask again before deleting.)
2. **Continue without saving those files** — only already-saved extra commits are used. Unsaved edits stay only in the extra folder and are **not** in the merge or push. If the action is **delete**, say clearly that those unsaved files will be **gone**.
3. **Don’t continue yet** — leave everything as it is. Keep the extra folder.

Do **not** offer “throw away the unsaved extra files” as a normal choice (that is not option 2 unless they already picked delete, and even then the wording must say the files will be gone).

Do not commit, stash, or discard extra-folder work unless they pick 1 or (for delete) 2. Do not annotate the 1–5 finished list instead of this stop.

## Merge recipe (every merge)

Use this **every** time extra work is merged, including later. Target = the branch we are merging **into** (start branch, or `main` only if they confirmed).

1. Check the extra folder as in **Check the extra folder**. Show the unsaved picker only if `git status` there is not clean.
2. Check the target as in **Check the start branch before merge**. Alert and wait if needed.
3. Pull the latest updates from the target branch (and from the remote, if it has a remote).
4. Bring those updates into the extra work.
5. Fix conflicts there.
6. **Then** merge the extra work onto the target.

Do not merge onto a stale copy. Do not merge onto unsaved or un-synced start-branch work without them saying to go ahead. Unsaved extra-folder work is not in this merge unless they already saved it on the extra branch (see **Check the extra folder**). Do not say conflicts are “fixed on the way to `main`.” The steps are the same; `main` is riskier only because it is usually the live line.

They do **not** need to pick option 2 before merge. Merge already brings current start-branch commits into the extra folder, then puts extra work onto the start branch. Option 2 is only when they want to catch up and **keep working** without merging yet.

## Pull in latest changes from {start branch} and continue working

In every option list, write this label with the real start branch name, for example: **Pull in latest changes from feat/sidebar-search and continue working**. Never say “Loop in.”

Use this when they want the extra folder to catch up to the start branch and **keep working** there. Not a merge onto the start branch.

1. Check the extra folder as in **Check the extra folder**. Show the unsaved picker only if `git status` there is not clean.
2. Check the start branch as in **Check the start branch before merge**. Tell them what will come in.
3. Unsaved files on the start branch are **not** in git yet, so they will not appear in the extra folder until those files are saved on the start branch. Say that. Do not commit or stash their start-branch work unless they ask.
4. Bring the start branch’s current commits into the extra work (in the extra folder).
5. Fix conflicts there.
6. **Stop.** Do not merge extra work onto the start branch. They continue in the extra folder.

If the remote is ahead of the start branch, say so: this pull only brings what is already on the start branch, unless they also want the start branch updated from the remote first. Wait if that is unclear.

If they ask for this **during** the side job (any wording: catch up, pull in start-branch changes, update the extra folder), do this recipe. Do not show the finished-job options unless they also mean the side job is done.

## When the extra job is finished

Ask: do they want this merged into the **start branch**?

If they **do not** pick that, tell them: keeping this as a separate branch means a later merge can hit **conflicts**. Then you will use the merge recipe: pull the target, bring those updates in, fix conflicts, then merge. The AI will fix those conflicts when they ask.

Then show these options:

1. **Merge into the start branch** — first bring current start-branch commits into the extra folder, then put extra work onto the start branch. They do not need option 2 first. Not `main`, unless that start branch *is* `main` and they confirmed after the warning. If the start-branch check found unsaved files, local-only commits, or a remote that is ahead, say that here. If the extra folder is not clean, do not use this list yet — follow **Check the extra folder**. Say they must **save extra work on the extra branch first** to include it in the merge.
2. **Pull in latest changes from {start branch} and continue working** — fill in the real start branch name. Bring current start-branch commits into the extra folder, fix conflicts there, keep working. Does **not** put extra work onto the start branch. Use this when they want to catch up and keep going, not when they already want merge (option 1 does the catch-up as part of merge). If the start branch has unsaved files, say those will not come in until they are saved. If the extra folder is not clean, follow **Check the extra folder** instead of this list. Never label this “Loop in.”
3. **Save as a separate branch only** — saved locally; not merged; not pushed.
4. **Save as a separate branch and push to the remote** — backup on the host this project uses (name it); still not merged into the start branch. Skip or reword this option if there is no remote.
5. **Delete the extra folder and the local extra branch** — removes the extra folder and deletes the local extra named branch. Write it with that branch’s real name, for example: `Delete the extra folder and the local branch worktree/readme-test`. Do not say the extra branch will still exist. Do not delete the start branch. Do not delete a remote extra branch unless they asked. If the extra folder is not clean, say unsaved extra files would be gone.

If they pick 3 or 4, repeat: the start branch (and `main`) can keep moving; a later merge uses the merge recipe; they can also pick option 2 later to catch up without merging; the AI would fix conflicts then.

### If the start branch is `main`

Do **not** merge onto `main` as the default.

Recommend **option 4** (save as a separate branch and push). `main` stays unchanged until they later merge that branch on purpose.

If they still want extra work **directly on `main`**, warn first, then wait:

- `main` is usually the live line. The side job would land there with no separate branch to review or undo easily.
- Anyone else using `main` would get that side job mixed in.
- A mistake on `main` is harder to undo than a mistake on a named branch.
- Merge still uses the same recipe (pull `main`, bring updates into extra work, fix conflicts, then merge). That work happens against the live line, which is why it is riskier.

Only merge onto `main` if they still say yes after that warning.

### Delete folder and local extra branch

- Unsaved work lives only in the extra folder. Delete the folder, that work is gone.
- This also deletes the **local** extra named branch. Commits that exist only on that branch are gone unless they were already merged or pushed.
- If that extra branch was already pushed, the remote copy still exists. Say so. Do not delete the remote branch unless they asked.
- Never delete the start branch.

If the extra folder is already gone and nothing was committed: delete the leftover local extra branch if it still exists, then only offer redo-then-ask, or stop.

If the extra job is **already saved** on a named branch and they ask again, same intents: merge into the start branch (use merge recipe; `main` rules still apply), pull in latest changes from the start branch and continue working, leave it as that separate branch, push that branch to this project’s remote (name the host), or delete the extra folder **and** the local extra named branch. Still warn if they are not merging into the start branch.

## After they pick

- Merge: apply the merge recipe only after this pick. If the extra folder is not clean, follow **Check the extra folder** first. Run the start-branch check and wait if it is dirty or not in sync. If start is `main`, apply the `main` warning first.
- Pull in latest changes from {start branch} and continue working: apply that recipe only after this pick (or when they ask for it during the job). If the extra folder is not clean, follow **Check the extra folder** first. Do not merge onto the start branch.
- Save as a separate branch only: if the extra folder is not clean, follow **Check the extra folder** first. Then commit on the extra named branch. Do not merge. Do not push.
- Save and push: if the extra folder is not clean, follow **Check the extra folder** first. Then commit on the extra named branch, then push that branch only to this project’s remote. Do not merge unless they also picked merge (and confirmed if target is `main`).
- Delete folder and local extra branch: if the extra folder is not clean, follow **Check the extra folder** first (delete-without-saving means unsaved extra files are gone). Then remove that worktree (`git worktree remove` when it is a git worktree). Then delete the local extra named branch (`git branch -d`, or `-D` if they already picked delete and the branch is not merged). Never delete the start branch. Confirm the start branch was not modified and the local extra branch is gone. If a remote extra branch exists, say it still exists.

Windows “command line is too long” on commit: batches of ~40 files. No `--no-verify` unless they asked.
