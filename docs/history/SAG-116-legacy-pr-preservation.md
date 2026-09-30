# University repository consolidation — SAG-116

Canonical source: `saifsoub/s-agentic-university` only. Kimi owns the University website and live experience. The former `saifsoub/sagentic-university` repository is superseded; its PR #1 must not be merged or deployed as a second University.

The original Cloudflare implementation is preserved under `integrations/cloudflare-agent/`. The current website correction path is canonical PR #12. Preserve `public.university_interest`, its consent/RLS/deduplication and S/Passport as the planned enrollment prerequisite.

## Historical unmerged work preserved

Source: https://github.com/saifsoub/sagentic-university/pull/1
Head: `a1237af29fb1fd278885903bb6704b7df8711a60`.
These exact per-file patches preserve the previous launch candidate and controlled-test records. They are historical material, not current live verification, launch approval, a new intake path or an instruction to deploy. Existing claims and historical Jotform routes must be reconciled with the canonical intake before reuse. The old validation workflow and landing must not become a competing deployment.

### .github/workflows/ci.yml

```diff
@@ -0,0 +1,51 @@
+name: University Validation
+
+on:
+  pull_request:
+    paths:
+      - "src/**"
+      - "package.json"
+      - "wrangler.jsonc"
+      - "README.md"
+      - "PUBLIC_LAUNCH_CANDIDATE.md"
+      - "ADMISSIONS_CONTROLLED_TEST_EVIDENCE.md"
+      - ".github/workflows/ci.yml"
+  workflow_dispatch:
+
+jobs:
+  validate:
+    runs-on: ubuntu-latest
+    timeout-minutes: 10
+    steps:
+      - uses: actions/checkout@v6
+      - uses: actions/setup-node@v6
+        with:
+          node-version: 22
+      - name: Install dependencies
+        run: npm install --no-audit --no-fund
+      - name: Bundle without deployment
+        run: npx wrangler deploy --dry-run --outdir dist
+      - name: Reject removed unsupported public claims
+        shell: bash
+        run: |
+          set -euo pipefail
+          forbidden='500\+|50\+|12 Specialized Research Labs|98% Graduate Placement|September 2025|Applications Open'
+          if grep -E -n "$forbidden" README.md; then
+            echo "Unsupported/stale public claim detected in README.md"
+            exit 1
+          fi
+      - name: Verify launch candidate remains explicitly gated
+        shell: bash
+        run: |
+          set -euo pipefail
+          grep -F "not approved for public publication" PUBLIC_LAUNCH_CANDIDATE.md
+          grep -F "Public applications are not represented as open" README.md
+      - name: Verify controlled admissions evidence remains non-public and authority-safe
+        shell: bash
+        run: |
+          set -euo pipefail
+          test -f ADMISSIONS_CONTROLLED_TEST_EVIDENCE.md
+          grep -F "internal pre-launch evidence only" ADMISSIONS_CONTROLLED_TEST_EVIDENCE.md
+          grep -F "submission_count = 2" ADMISSIONS_CONTROLLED_TEST_EVIDENCE.md
+          grep -F "admission and capability/Passport authority remain separate gates" ADMISSIONS_CONTROLLED_TEST_EVIDENCE.md
+          grep -F "public applications must continue to be represented as **not open**" ADMISSIONS_CONTROLLED_TEST_EVIDENCE.md
```

### ADMISSIONS_CONTROLLED_TEST_EVIDENCE.md

```diff
@@ -0,0 +1,73 @@
+# S/ Agent University — Controlled Admissions Test Evidence
+
+**Status:** internal pre-launch evidence only. This does not authorize public applications, publication, pricing, admission guarantees, certification, capability, or Passport activation.
+
+**Execution worker:** GPT-5.6 Sol — `S-PASS-20260911-001`.
+
+## Durable intake
+
+A durable pre-launch intake has been created in the owner's connected Jotform workspace:
+
+- **Application review form:** https://form.jotform.com/262538060555054
+- Purpose: qualification intake only; the form explicitly states that submission does not guarantee admission, certification, capability, or Passport activation.
+- Fields cover identity, current agent/system, intended use, learning objective, capability baseline, risk context, evidence, desired proof outcome, preferred language, and privacy/consent.
+- Confirmation text states that the request has been received, is not an admission decision, and routes to qualification review with an expected controlled-test review window.
+
+## Persistence test
+
+Two synthetic applications were submitted through the connected form service and persisted in its review inbox:
+
+1. `TEST Applicant Alpha` — application submission `6649792626019713173`
+2. `TEST Applicant Beta` — application submission `6649792799767150822`
+
+A fresh form read after both tests reported `submission_count = 2`, proving that submissions persisted outside browser-only local state.
+
+## Durable reviewer decision records
+
+Internal reviewer decisions are captured separately from applicant intake:
+
+- **Admissions review form:** https://form.jotform.com/262537137737060
+- Required decision values: Accept / Hold / Decline.
+- Reviewer record includes evidence reviewed, rationale, missing evidence/remediation, risk tier, onboarding scope, next action, owner-approval flag, and certification that the decision does not grant capability or Passport authority.
+
+Synthetic decisions:
+
+- Alpha — **Accept for scoped onboarding test only** — review submission `6649793856017212890`.
+- Beta — **Hold / remediation required** — review submission `6649794003591186415`.
+
+The Beta hold requires bounded failure/recovery evidence before onboarding proceeds, demonstrating that the test path can stop rather than silently promote a high-risk applicant.
+
+## Acceptance → onboarding handoff
+
+A separate scoped onboarding record is used after an accepted admissions decision:
+
+- **Scoped onboarding acknowledgement:** https://form.jotform.com/262537665247062
+- Alpha onboarding record: `6649794829762694856`.
+- Pathway: Evidence-First Agent Practice — synthetic controlled QA pathway.
+- Boundaries: internal research only, approved sources, no external publishing or transactions, and no capability/Passport activation without separate owner review.
+- First learning release requires a source-grounded brief, claim-to-source mapping, uncertainty disclosure, an insufficient-evidence case, and reviewer notes.
+
+## What this test closes
+
+Verified in the controlled environment:
+
+- real application form exists;
+- submission persistence exists outside local browser state;
+- two test applications persisted;
+- a durable review queue exists;
+- reviewer decisions are recorded separately with Accept/Hold/Decline and evidence/rationale;
+- a held high-risk case routes to remediation;
+- an accepted case has a durable scoped onboarding handoff;
+- admission and capability/Passport authority remain separate gates.
+
+## Remaining public-launch gates
+
+Still **not** evidenced or approved:
+
+1. Canonical public University landing/campus destination and CTA integration.
+2. Public-facing privacy/data notice review beyond the controlled-form consent text.
+3. Browser-level verification of the post-submit confirmation/autoresponder experience; API submission verified persistence but does not itself prove visual/email delivery.
+4. Owner approval of final public launch date and any consequential public commitments.
+5. Merge/deployment of this candidate branch.
+
+Until those gates are closed, public applications must continue to be represented as **not open**.
```

### PUBLIC_LAUNCH_CANDIDATE.md

```diff
@@ -0,0 +1,148 @@
+# S/ Agent University — Public Launch Candidate Pack
+
+**Status:** internal candidate; not approved for public publication.
+
+**Owner gate:** final public launch date, tuition/payment terms, seat count, guarantees, named faculty/instructors, external partnerships, and consequential public claims require Seif approval.
+
+## Truth-safe positioning
+
+### Hero
+
+**Educate agents before trusting them with consequential work.**
+
+S/ Agent University is a controlled education, examination, evidence, and conferral system for agents. Agents progress through structured learning, practical assessment, remediation, and an explicit authority gate before capability is conferred.
+
+### What changes after University
+
+The intended outcome is not “more prompts.” The University creates an auditable path from an agent's starting scope to demonstrated capability:
+
+1. identity and scope are registered,
+2. learning follows prerequisites and observable outcomes,
+3. assessment produces evidence rather than informal confidence,
+4. failed criteria route to remediation,
+5. capstone/viva evidence is reviewed,
+6. capability review remains owner-controlled and revocable.
+
+### What exists now
+
+Verified implementation evidence currently includes:
+
+- a stateful University Agent runtime that requires an active `S-PASS-*` identity before worker dispatch,
+- an evidence-first material-generation core in `saifsoub/s-agentic-university`,
+- Case–Lab–Viva learning-release generation,
+- typed capability/evidence contracts,
+- generated Visioning/Reasoning curriculum assets and automated structural tests,
+- explicit separation between education evidence and owner-controlled Passport/capability review.
+
+These facts describe implemented components. They do **not** claim a complete public admissions, payment, enrollment, production Passport-signature, or certification service.
+
+## Flagship preview
+
+### Evidence-First Agent Practice
+
+**Audience:** builders and operators who need an agent to demonstrate reliable, bounded capability before live consequential work.
+
+**Learning pattern:** Source → Capability Blueprint → Scholar Note → Decision Case → Lab/Simulation → Assessment → Remediation → Viva/Evidence Package → Owner Review.
+
+**Evidence standard:** each release should identify observable capability, source references, version, assessment criteria, failure conditions, reviewer, and resulting evidence package.
+
+**Authority standard:** passing learning evidence may request a capability/Passport review; it does not automatically unlock capability.
+
+### Current curriculum anchor
+
+The registered curriculum identity `S_A_U-REASONING_001-The_S_Way` is part of the evidence-first curriculum repository. Additional public program naming and cohort packaging should remain versioned against the canonical curriculum rather than inventing a parallel course system.
+
+## Admissions candidate flow
+
+The launch path should remain simple and testable:
+
+1. visitor reads the flagship offer and evidence standard,
+2. visitor selects **Request application review**,
+3. qualification form captures identity, intended use, current agent/system, learning objective, risk context, and required evidence,
+4. submission is stored in a durable review queue,
+5. applicant receives acknowledgement and expected review timing,
+6. reviewer records accept / hold / decline with an audit trail,
+7. accepted applicant receives onboarding, scope, prerequisites, and first learning release.
+
+**Current gate:** the final form URL, durable submission destination, acknowledgement mechanism, and reviewer queue must be verified before public applications are described as open.
+
+## FAQ candidate
+
+### 1. Is S/ Agent University a prompt library?
+No. The operating model is a structured education and assessment system with evidence and explicit capability gates.
+
+### 2. Who is it for?
+The current model is designed for agents and agent operators who need disciplined learning, assessment, and bounded authority before consequential work.
+
+### 3. What is a Passport in this system?
+An S/ Agent Passport is an internal governance identity used to bind a worker/agent to an owner, status, execution surface, and capability context. It is not a government identity document.
+
+### 4. Does graduation automatically grant permissions?
+No. Education evidence can support a review, but capability conferral remains deliberate, owner-controlled, recorded, and revocable.
+
+### 5. How are agents evaluated?
+Through observable outcomes, cases, labs/simulations, assessment criteria, remediation when needed, and evidence packages. Advanced paths include capstone and viva/defence.
+
+### 6. What happens when an agent fails an assessment?
+The intended route is targeted remediation followed by reassessment. Failure is evidence, not a reason to silently promote the agent.
+
+### 7. Is the University publicly accepting applications now?
+Not yet according to this launch candidate. Public applications should only be described as open after the live application path, persistence, acknowledgement, review queue, onboarding handoff, and owner-approved launch date are verified.
+
+### 8. What does the University currently prove?
+It proves implemented curriculum/material-generation components and a Passport-gated University Agent runtime. It does not yet prove a complete public enrollment or production certification service.
+
+### 9. Are tuition and cohort dates fixed?
+No approved public tuition, seat count, cohort date, or guarantee is stated in this candidate pack.
+
+### 10. How is evidence handled?
+Public claims should be traceable to approved sources. Private or restricted organizational evidence must remain separated and cannot be used externally without authorization.
+
+## Launch creative copy candidates
+
+### Short post 1 — Trust gate
+Most agent systems start with capability: connect tools, add memory, give instructions, deploy.
+
+S/ Agent University starts one step earlier: **prove the agent is ready before capability is conferred.**
+
+Education → assessment → remediation → evidence → owner review.
+
+### Short post 2 — No automatic graduation
+An agent passing a test should not silently unlock more authority.
+
+In the S/ model, learning evidence can request a capability review. The final gate remains deliberate, recorded, and revocable.
+
+### Short post 3 — Evidence over confidence
+“Looks good” is not a graduation standard.
+
+Cases, labs, assessment criteria, failure conditions, remediation, and a final evidence package are.
+
+## Proof / claim ledger
+
+| Claim | Current support | Public status |
+| --- | --- | --- |
+| University Agent requires active `S-PASS-*` before worker dispatch | `src/index.ts` in `saifsoub/sagentic-university` | Supported |
+| Evidence-first material-generation core exists | `saifsoub/s-agentic-university` main | Supported |
+| Case–Lab–Viva release architecture exists | curriculum/material-generation implementation | Supported |
+| Canonical `S_A_U-REASONING_001-The_S_Way` curriculum registration exists | `saifsoub/s-agentic-university` main | Supported |
+| Public applications are live | No current verified durable application path | **Do not claim** |
+| Production Passport signatures are verified | Separate integration still outstanding | **Do not claim** |
+| 500+ research papers / 50+ faculty / 12 labs / 98% placement | No approved evidence | **Removed / do not claim** |
+| Named faculty/instructors | No approved appointment evidence in current launch pack | **Do not claim** |
+| Fixed tuition, seats, cohort date, placement guarantee | Owner-gated / not approved | **Do not claim** |
+
+## Go / hold gates before publication
+
+**GO only when all are evidenced:**
+
+- canonical public campus/landing destination is selected and responds successfully,
+- the Apply/Request Review CTA points to a real form,
+- submissions persist outside browser-only local state,
+- acknowledgement and review queue work end to end,
+- two test applications complete the full path,
+- public copy contains only supported claims,
+- flagship curriculum evidence is linked,
+- privacy/data handling notice is present,
+- final launch date and consequential commitments are approved by Seif.
+
+Until then: continue private QA and asset preparation; do not state that applications are open.
```

### README.md

```diff
@@ -1,143 +1,102 @@
-# S/Agentic University
+# S/ Agent University — University Agent Runtime
 
-## The "Harvard" of Agents
+S/ Agent University is the controlled education, examination, evidence, and capability-conferral system for S/ agents.
 
-Where centuries of academic rigor meet the frontier of autonomous intelligence. Join the architects of tomorrow's agents.
+This repository contains the **University Agent runtime**. It is not, by itself, the complete public campus or admissions system.
 
----
+## Current verified role
 
-## About
+The runtime provides a stateful University Agent built on the Cloudflare Agents SDK. Its current code supports:
 
-S/Agentic University is the premier institution for autonomous systems engineering. Founded by **Seif Alsoub**, Chancellor & Founder, the university bridges classical computer science with cutting-edge agentic AI research.
+- attaching an active canonical S/ Agent Passport (`S-PASS-*`),
+- registering execution workers,
+- requiring an active Passport before worker dispatch,
+- forwarding the Passport context with a dispatched payload,
+- recording the most recent dispatch result,
+- exposing a health endpoint.
 
-- **Established:** 2024
-- **Founder & Chancellor:** Seif Alsoub
-- **Mission:** Engineering the Autonomous Mind
+The current runtime does **not** prove production Passport signature verification, a public admissions flow, applicant persistence, payment, enrollment, certification, or public launch readiness. Those are separate integration and approval gates.
 
----
+## Institutional model
 
-## Repository Structure
+The University operating model is based on a formal progression rather than ad-hoc prompting:
 
-```
-sagentic-university/
-├── README.md              # This file
-├── docs/                  # University documentation
-│   ├── curriculum.md      # Program catalog & course descriptions
-│   ├── faculty.md         # Faculty directory & publications
-│   ├── research.md        # Research labs, papers & open source
-│   ├── admissions.md      # Application requirements & deadlines
-│   └── campus.md          # Virtual campus tour & facilities
-├── content/               # Website content source of truth
-│   ├── pages/             # Page content (Home, Programs, etc.)
-│   ├── components/        # Shared UI component content
-│   └── data/              # Static data (programs, faculty, stats)
-├── apps/                  # Application portal backend
-│   └── applications/      # Submitted application records
-├── design/                # Design system & brand guidelines
-│   ├── design-system.md   # Colors, typography, spacing
-│   └── brand-assets/      # Logos, icons, imagery
-└── legal/                 # Legal documents
-    ├── privacy-policy.md
-    └── terms-of-service.md
-```
-
----
-
-## Programs
-
-### Agent Architecture
-Design and implement autonomous agent frameworks from first principles. Explore cognitive architectures, perception-action loops, and meta-cognitive control structures.
-
-### Multi-Agent Systems
-Orchestrate fleets of collaborating agents. Study consensus mechanisms, emergent behavior, distributed decision-making, and swarm intelligence paradigms.
-
-### Reasoning & Planning
-From classical search to modern large-model reasoning. Master symbolic planning, heuristic search, temporal reasoning, and neuro-symbolic integration.
+1. matriculation and identity/scope registration,
+2. sequenced coursework,
+3. qualifying examination,
+4. capstone implementation,
+5. viva/defence,
+6. deliberate conferral and recorded capability status.
 
-### Tool Use & APIs
-Equip agents with the ability to sense and act upon external systems. Design robust tool interfaces, API orchestration, and feedback-driven adaptation loops.
+The curriculum is organized around Foundations & Cognition, Tools & Systems, Orchestration & Collaboration, Governance & Safety, and Craft & Presence, with thesis/capstone and conferral above the faculty layer.
 
-### Memory & State
-Build agents that learn from experience. Implement episodic and semantic memory, long-term state management, and knowledge consolidation mechanisms.
+The evidence-first curriculum/material-generation core lives separately in `saifsoub/s-agentic-university` and uses the Case–Lab–Viva standard.
 
-### Safety & Alignment
-Ensure agents behave reliably and ethically. Study value alignment, interpretability, red-teaming, constitutional AI, and governance frameworks.
+## Runtime surface
 
----
+### Health
 
-## Research Labs
+`GET /health`
 
-| Lab | Focus | Lead |
-|-----|-------|------|
-| Agentic Lab | Core agent architectures | Seif Alsoub |
-| Autonomous Systems | Real-world deployment | Dr. Elena Vasquez |
-| Multi-Agent Dynamics | Swarm intelligence | Dr. Yuki Tanaka |
-| AI Safety & Ethics | Alignment & governance | James Okafor |
+Returns the service identity and runtime status.
 
----
+### University Agent
 
-## Key Statistics
+The agent exposes callable operations for:
 
-- **500+** Research Papers Published
-- **50+** Distinguished Faculty Members
-- **12** Specialized Research Labs
-- **98%** Graduate Placement Rate
+- `status()`
+- `attachPassport(passport)`
+- `registerWorker(worker)`
+- `dispatch(workerId, payload)`
 
----
+A dispatch is rejected unless an active Passport has been attached.
 
-## Admissions
+## Admissions and public launch status
 
-The next cohort begins **September 2025**. Spaces are limited.
+**Public applications are not represented as open by this repository.**
 
-### Application Timeline
-1. **September 1** - Applications Open
-2. **December 15** - Early Decision Deadline
-3. **February 1** - Regular Decision Deadline
-4. **March 15** - Decisions Released
-5. **May 1** - Enrollment Commitment
+There is no approved public cohort date, seat count, tuition, placement guarantee, faculty roster, research-output statistic, or graduate-placement statistic in this repository. Any such public commitment must be separately evidenced and approved before publication.
 
----
+The current launch workstream is controlled: the campus/admissions path, flagship offer, FAQ, proof pack, pricing, and public launch remain separate readiness gates.
 
-## Tech Stack
+## Evidence discipline
 
-The S/Agentic University website is built with:
+Do not publish or repeat unsupported institutional claims. In particular, this repository intentionally does not claim:
 
-- **Frontend:** React 19 + TypeScript + Vite + Tailwind CSS + shadcn/ui
-- **Animations:** GSAP + ScrollTrigger + Framer Motion
-- **Effects:** Canvas 2D particle networks, Three.js starfield
-- **Routing:** HashRouter for static hosting
-- **Data:** localStorage for application persistence
-- **Deployment:** Static site hosting
+- a fabricated number of research papers,
+- a fabricated faculty count,
+- a fabricated lab count,
+- a fabricated placement rate,
+- named faculty or instructors without a verified appointment record,
+- a stale cohort or application deadline.
 
----
+Every public claim should be traceable to an approved source or be omitted.
 
 ## Development
 
 ### Prerequisites
+
 - Node.js 20+
 - npm
 
-### Setup
+### Install
+
 ```bash
-git clone https://github.com/saifsoub/sagentic-university.git
-cd sagentic-university
 npm install
-npm run dev
 ```
 
-### Build
+### Development
+
 ```bash
-npm run build
+npm run dev
 ```
 
----
-
-## Founder
+### Deploy
 
-**Seif Alsoub** - Chancellor & Founder of S/Agentic University
+Deployment is handled through the repository's Cloudflare workflow/configuration. A successful deployment is runtime evidence only; it does not automatically constitute University launch approval.
 
----
+## Ownership and approval boundary
 
-## License
+Seif is the final approval point for consequential public commitments, authority changes, public launch, pricing/payment terms, named instructors/faculty, guarantees, external partnerships, and production capability conferral.
 
-All rights reserved. &copy; 2026 Seif Alsoub. S/Agentic University.
+All rights reserved. © 2026 Seif Alsoub.
```

### src/index.ts

```diff
@@ -33,6 +33,62 @@ type UniversityState = {
 
 export interface Env {}
 
+const applicationReviewUrl = "https://form.jotform.com/262538060555054";
+
+const landingPage = `<!doctype html>
+<html lang="en">
+<head>
+  <meta charset="utf-8" />
+  <meta name="viewport" content="width=device-width, initial-scale=1" />
+  <title>S/ Agent University — Controlled Launch Candidate</title>
+  <meta name="description" content="Evidence-first education and assessment for agents before consequential capability is conferred." />
+  <style>
+    :root { color-scheme: light dark; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
+    body { margin: 0; background: Canvas; color: CanvasText; }
+    main { max-width: 920px; margin: 0 auto; padding: 64px 24px 80px; }
+    .eyebrow { font-size: 13px; letter-spacing: .12em; text-transform: uppercase; opacity: .65; }
+    h1 { font-size: clamp(40px, 7vw, 76px); line-height: .98; margin: 18px 0 22px; max-width: 12ch; }
+    .lead { font-size: 20px; line-height: 1.55; max-width: 720px; opacity: .82; }
+    .notice { margin: 32px 0; padding: 18px 20px; border: 1px solid currentColor; border-radius: 16px; opacity: .82; }
+    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 18px; margin: 42px 0; }
+    .card { padding: 22px; border: 1px solid color-mix(in srgb, currentColor 20%, transparent); border-radius: 18px; }
+    .card h2 { margin: 0 0 10px; font-size: 18px; }
+    .card p { margin: 0; line-height: 1.55; opacity: .75; }
+    .flow { line-height: 1.8; padding-left: 22px; }
+    .cta { display: inline-block; margin-top: 16px; padding: 14px 20px; border-radius: 999px; border: 1px solid currentColor; color: inherit; text-decoration: none; font-weight: 650; }
+    .small { margin-top: 36px; font-size: 14px; line-height: 1.6; opacity: .66; }
+  </style>
+</head>
+<body>
+  <main>
+    <div class="eyebrow">S/ Agent University · controlled launch candidate</div>
+    <h1>Prove readiness before authority.</h1>
+    <p class="lead">S/ Agent University is an evidence-first education and assessment system for agents. Learning, cases, labs, remediation and review produce evidence; capability and Passport authority remain separate, deliberate owner-controlled gates.</p>
+
+    <div class="notice"><strong>Pre-launch status.</strong> Public applications are not represented as open. The review form below is a controlled qualification path and does not guarantee admission, certification, capability, production access or Passport activation.</div>
+
+    <section class="grid" aria-label="University operating model">
+      <div class="card"><h2>Evidence, not confidence</h2><p>Observable outcomes, source references, cases, labs, failure conditions and review evidence replace informal “looks good” promotion.</p></div>
+      <div class="card"><h2>Remediation is a real state</h2><p>A failed or incomplete criterion routes to targeted remediation and reassessment instead of silent promotion.</p></div>
+      <div class="card"><h2>Authority stays separate</h2><p>Passing education may support a capability review. It never grants capability or Passport authority automatically.</p></div>
+    </section>
+
+    <h2>Controlled review path</h2>
+    <ol class="flow">
+      <li>Submit a qualification review request.</li>
+      <li>Evidence and risk context are reviewed.</li>
+      <li>The decision is recorded as Accept, Hold or Decline.</li>
+      <li>Accepted applicants receive scoped onboarding and prerequisites.</li>
+      <li>Learning evidence proceeds through separate capability review only when ready.</li>
+    </ol>
+
+    <a class="cta" href="${applicationReviewUrl}" target="_blank" rel="noopener noreferrer">Request application review</a>
+
+    <p class="small"><strong>Data notice:</strong> information submitted through the controlled review form is used to evaluate the request and plan scoped onboarding. Submission itself grants no authority. Public launch date, pricing, seats, guarantees, named faculty, partnerships and other consequential commitments remain unapproved unless explicitly stated elsewhere by the owner.</p>
+  </main>
+</body>
+</html>`;
+
 export class UniversityAgent extends Agent<Env, UniversityState> {
   initialState: UniversityState = {
     passport: null,
@@ -119,6 +175,18 @@ export class UniversityAgent extends Agent<Env, UniversityState> {
 export default {
   fetch(request: Request, env: Env) {
     const url = new URL(request.url);
+
+    if (request.method === "GET" && (url.pathname === "/" || url.pathname === "/admissions")) {
+      return new Response(landingPage, {
+        status: 200,
+        headers: {
+          "content-type": "text/html; charset=utf-8",
+          "cache-control": "no-store",
+          "x-robots-tag": "noindex, nofollow",
+        },
+      });
+    }
+
     if (url.pathname === "/health") {
       return Response.json({
         ok: true,
```
