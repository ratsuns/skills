# ratsuns/skills

Agent skills from [ratsuns](https://github.com/ratsuns)

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

| Skill | What it does | Installs |
| --- | --- | --- |
| [git-worktrees](skills/git-worktrees/SKILL.md) | Extra git folder for a side job. When that job is finished, stop and show numbered options. | [![skills.sh](https://shieldcn.dev/skills/installs/ratsuns/skills/git-worktrees.svg)](https://www.skills.sh/ratsuns/skills/git-worktrees) |
| [openspec-lifecycle-gates](skills/openspec-lifecycle-gates/SKILL.md) | Stop and ask at five OpenSpec moments. Use the clickable picker. Agent runs lint/build before a finished commit. | [![skills.sh](https://shieldcn.dev/skills/installs/ratsuns/skills/openspec-lifecycle-gates.svg)](https://www.skills.sh/ratsuns/skills/openspec-lifecycle-gates) |

Each skill is a folder under `skills/` with a `SKILL.md` ([Agent Skills spec](https://agentskills.io/specification)). That is what [skills.sh](https://skills.sh) indexes.

## OpenSpec CLI

`openspec-lifecycle-gates` is a playbook. It does not install the OpenSpec CLI.

If an agent needs OpenSpec and it is not already installed, it should stop and ask you to run this in your own terminal:

```bash
npx @fission-ai/openspec@latest --version
```

Then wait until you say it is done. The agent must not run that command.

## License

MIT
