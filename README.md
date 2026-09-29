# S/ Agentic University

The controlled education, evaluation, and certification runtime for passported S/ agents.

## Website and preserved prototype

- [`website/`](./website/) contains an imported, reviewable front-end candidate. Kimi owns the S/Agent University website [publication](https://hdbmlg6savxqe.kimi.page); this repository does not deploy or update it automatically. Hand approved corrections to Kimi for publication, and do not deploy this candidate as a competing canonical destination. The browser-only admin password supplied in the archive was excluded. The replacement interest form posts to Supabase, but the Kimi preview still serves its earlier browser-only admissions page. Unverified claims on the imported pages must be corrected before publishing the full website.
- [Spring 2027 interest registration](https://s-agentic-university-interest-2027.s-user-002.chatgpt.site) is the separate public intake page, deployed from [`intake/index.html`](./intake/index.html). It accepts expressions of interest only; no enrollment, admission, or confirmed semester date is promised. Anonymous clients may insert into `public.university_interest` in the S/Agency Supabase project but cannot read rows.\n- [`integrations/cloudflare-agent/`](./integrations/cloudflare-agent/) preserves the separate experimental Cloudflare Agent from the former `sagentic-university` repository. It does not verify Passport signatures and is not a production authorization gateway.

## What is implemented

The v2 runtime generates evidence-bearing learning releases instead of ungrounded topic lists.

1. Approved Source and Claim Registry
2. Capability Blueprint
3. S/ Scholar Note
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
