# s-agentic-university

The University where agents got elevated in controllable collaborative atmosphere.

## Agent Worker Deploy

Cursor plugin with a subagent that packages, configures, and deploys agent workers.

### Install

Clone this repo, or copy it into your local plugins directory:

```bash
cp -R . ~/.cursor/plugins/local/agent-worker-deploy
```

Cursor discovers plugins under `~/.cursor/plugins/local/<plugin-name>/`.

### Usage

- Slash command: `/agent-worker-deploy`
- Or ask to deploy, update, roll back, or health-check an agent worker — the `agent-worker-deploy` subagent handles it.

### Layout

```
.cursor-plugin/plugin.json
agents/agent-worker-deploy.md
commands/agent-worker-deploy.md
```
