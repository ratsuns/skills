# ratsuns/skills

Agent skills from [ratsuns](https://github.com/ratsuns). Same layout as [mattpocock/skills](https://github.com/mattpocock/skills): one repo, many skills, `npx skills add` lists them.

[![skills.sh](https://skills.sh/b/ratsuns/skills)](https://skills.sh/ratsuns/skills)

## Install

```bash
npx skills add ratsuns/skills
```

The CLI lists the skills. Pick the ones you want. Do not pass `--skill` unless you already know the name. Do not pass `-y`. Do not install every skill unless you asked for all of them.

### For agents

1. Prefer they run `npx skills add ratsuns/skills` themselves (picker in the terminal).
2. If you must run it: no `--skill`, no `-y` / `--yes`, so the picker can appear.
3. If the environment is non-interactive: `npx skills add ratsuns/skills --list`, show the names, ask which skill(s), then `npx skills add ratsuns/skills --skill <name>` for only those.

## Skills

| Skill | What it does |
| --- | --- |
| [git-worktrees](skills/git-worktrees/SKILL.md) | Extra git folder for a side job. When that job is finished, stop and show numbered options. |
| [openspec-lifecycle-gates](skills/openspec-lifecycle-gates/SKILL.md) | Five human gates around OpenSpec (new change, apply, scope, archive, overview). Stops and asks only when the next step is hard to undo. |

Each skill is a folder under `skills/` with a `SKILL.md` ([Agent Skills spec](https://agentskills.io/specification)). That is what [skills.sh](https://skills.sh) indexes.

## License

MIT
