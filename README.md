# Agentic University

The controlled education, evaluation, and certification runtime for passported agents.


## One canonical University source

`saifsoub/s-agentic-university` is the sole source for University code, content and future changes. Kimi owns the University website and live experience. The former `saifsoub/sagentic-university` repository is superseded and must not receive a parallel launch or deployment. Its unmerged SAG-116 work is preserved in [the historical consolidation record](docs/history/SAG-116-legacy-pr-preservation.md). Current website corrections continue through PR #12 in this repository; source consolidation does not itself publish the Kimi website. An agent passport remains the planned enrollment prerequisite.

## Website and preserved prototype

- [`website/`](./website/) contains the source of the Agentic University Kimi website [preview](https://hdbmlg6savxqe.kimi.page). It is a front-end prototype; this repository does not deploy that preview automatically. The browser-only admin password supplied in the archive was excluded. The replacement interest form posts to Supabase, but the Kimi preview still serves its earlier browser-only admissions page. Unverified claims on the imported pages must be corrected before publishing the full website.
- [Spring 2027 interest registration](https://s-agentic-university-interest-2027.s-user-002.chatgpt.site) is the separate public intake page, deployed from [`intake/index.html`](./intake/index.html). It accepts expressions of interest only; no enrollment, admission, or confirmed semester date is promised. Anonymous clients may insert into `public.university_interest` in the project's Supabase instance but cannot read rows.
- [`integrations/cloudflare-agent/`](./integrations/cloudflare-agent/) preserves the separate experimental Cloudflare Agent from the former `sagentic-university` repository. It does not verify Passport signatures and is not a production authorization gateway.

## What is implemented

The v2 runtime generates evidence-bearing learning releases instead of ungrounded topic lists.

1. Approved Source and Claim Registry
2. Capability Blueprint
3. Scholar Note
4. Decision Case
5. Lab and Simulation
6. Assessment and Reliability Rubric
7. Targeted Remediation Pack
8. Thesis and Viva
9. Faculty QA and Evidence Manifest

Every release is tied to an eligible Passport context, approved source claims, observable learning outcomes, baseline evidence, hard governance gates, and owner-controlled permission review.

## API

- `GET /health`
- `POST /api/capability-blueprints/generate`
- `POST /api/course-releases/generate`
- `POST /api/evidence/decide`
- `GET /mcp/sse`
- `POST /mcp/messages?sessionId=...`

The old topic-only `POST /api/courses/generate` path is deliberately blocked because it cannot produce certifiable, source-grounded learning.

## MCP tools

- `generate_capability_blueprint`
- `generate_course_release`
- `decide_evidence`

## Verification

```bash
npm install
npm run ci
```

CI runs strict TypeScript checking, generator tests, and a production build.

## Runtime truth

This repository contains a typed, testable material-generation core. Production persistence, real Passport signature middleware, authenticated source ingestion, and deployment infrastructure remain separate integration steps and must not be represented as complete.

See [UNIVERSITY_RUNTIME_CYCLE.md](./UNIVERSITY_RUNTIME_CYCLE.md) for the education and certification gate.

## Cursor worker deployment plugin

The existing `agent-worker-deploy` Cursor plugin remains available under:

- `.cursor-plugin/plugin.json`
- `agents/agent-worker-deploy.md`
- `commands/agent-worker-deploy.md`
