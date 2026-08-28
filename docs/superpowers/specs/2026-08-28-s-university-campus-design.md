# S/ University Campus — Orchestration Design

Date: 2026-08-28  
Status: Approved for implementation  
Owner and Chancellor: Seif Alsoub  
Base implementation: GitHub PR #7, evidence-first material generators

## 1. Purpose

S/ University Campus is the operating house that coordinates specialist Workers so the owner does not need to repeatedly route, chase, reconcile, or explain university work.

The Campus does not replace Workers. It gives them explicit offices, artifact contracts, gates, deadlines, evidence rules, and handoffs.

The first operational commitment is:

- freeze the complete curriculum release candidate on 2026-08-28
- permit editorial and visual polish only on 2026-08-29
- hand a launch-readiness packet to the existing Marketing Team on 2026-08-29
- allow the Marketing Team to propose the launch date
- require Seif's final approval before launch

## 2. Goals

1. Route each university task to the correct Worker.
2. Prevent the Dean or general assistant from doing specialist work assigned to Workers.
3. Maintain one canonical run state and append-only event history.
4. Enforce source, curriculum, assessment, QA, Registrar, Passport, and launch gates.
5. Return failed work to the responsible Worker without involving the owner.
6. Escalate to Seif only for a decision, a genuine authority/security blocker, or final approval.
7. Keep GitHub, Linear, Passport, NotebookLM, and Marketing responsibilities distinct.
8. Produce a curriculum release that is measurable, reviewable, and launchable.

## 3. Non-goals

- The Campus does not activate Passport permissions automatically.
- The Campus does not choose the public launch date.
- The Campus does not create a replacement Marketing Team.
- The Campus does not create a parallel dashboard or duplicate checklist.
- The Campus does not treat NotebookLM as the system of record.
- The Campus does not represent local file persistence as production durability.
- The Campus does not merge or deploy without the appropriate external approval.

## 4. Institutional structure

### Chancellor and Owner

Seif is the singular final authority for:

- institutional direction
- exceptional scope changes
- final permission changes
- final launch approval

### Dean Orchestrator

The Dean owns routing, sequencing, deadlines, gate evaluation, and closure.

The Dean is prohibited from authoring curriculum, sources, cases, labs, assessments, QA findings, transcripts, or marketing decisions. When a deliverable is missing or rejected, the Dean creates or reopens the correct Work Item and routes it to the accountable office.

### Academic Senate

#### Curriculum Architect

Owns:

- capability outcomes
- prerequisites
- curriculum map
- capstone evidence contract
- outcome-to-practice-to-assessment alignment

#### Source Curator

Owns:

- NotebookLM source inventory
- approved SourceClaim registry
- provenance, freshness, confidence, and limitations
- unsupported-claim rejection

### Faculty Studio

#### Scholar Note Faculty

Owns concise source-grounded notes, worked examples, misconceptions, retrieval prompts, and field references.

#### Case Faculty

Owns decision-forcing cases, exhibits, constraints, discussion sequences, and faculty teaching notes.

#### Lab and Simulation Faculty

Owns sandbox state, permitted tools, fault injection, hidden transfer variants, telemetry, and critical-failure conditions.

### Examination Board

#### Assessment Designer

Owns practical exams, analytic rubrics, holdout variants, repeated-trial reliability, and scoring policy.

#### Independent QA Examiner

Owns source coverage, alignment, difficulty, leakage, privacy, bias, accessibility, reliability, and critical-gate review. QA cannot author the artifact it reviews.

### Registrar Office

Owns:

- evidence completeness
- attempt history
- before-versus-after capability delta
- remediation records
- transcript and certificate references
- final PASS or REMEDIATION_REQUIRED record

### Passport Office

Owns:

- eligibility before enrollment
- identity and owner binding
- authority boundaries
- owner-reviewed handoff after PASS
- refusal of automatic activation

### Launch Office

#### Release Manager

Owns curriculum freeze, polish scope control, release manifest, and launch-readiness packet.

#### Marketing Liaison

Hands the packet to the existing Marketing Team and receives the proposed launch date, campaign requirements, and readiness questions. The Liaison cannot select the date on the Marketing Team's behalf.

## 5. State machine

A Campus Run moves through these states:

1. INTAKE
2. PASSPORT_ELIGIBILITY
3. SOURCE_LOCK
4. CURRICULUM_BUILD
5. FACULTY_BUILD
6. EXAM_BUILD
7. INDEPENDENT_QA
8. CURRICULUM_FROZEN
9. POLISH
10. LAUNCH_READY
11. MARKETING_SCHEDULING
12. OWNER_APPROVAL
13. SCHEDULED
14. CLOSED

Failure transitions:

- source failure returns to SOURCE_LOCK
- outcome or prerequisite failure returns to CURRICULUM_BUILD
- material failure returns to the responsible Faculty Worker
- assessment failure returns to EXAM_BUILD
- QA rejection returns individual artifacts to their accountable Workers
- evidence failure returns to the Registrar
- Passport failure blocks enrollment or handoff without creating a worker-performance FAIL
- Marketing questions return the packet to the Release Manager
- owner rejection returns the run to the named gate with a recorded reason

No state may be skipped.

## 6. Deadline policy

The inaugural run uses Asia/Dubai time:

- Curriculum freeze deadline: 2026-08-28 23:00
- Polish freeze deadline: 2026-08-29 14:00
- Marketing handoff deadline: 2026-08-29 16:00

The Campus may mark a deadline AT_RISK and re-route work. It may not silently lower quality gates to meet a deadline.

The Marketing Team owns the proposed public launch date after receiving the launch-readiness packet.

## 7. Canonical data contracts

### CampusRun

- runId
- cohortId
- courseReleaseId
- ownerId
- currentState
- schedule
- workItems
- artifactRefs
- gateDecisions
- blockers
- marketingHandoff
- ownerDecision
- createdAt
- updatedAt
- version

### WorkItem

- workItemId
- runId
- office
- workerRole
- objective
- requiredInputs
- requiredOutputs
- acceptanceCriteria
- status
- dueAt
- attempt
- artifactRefs
- blockerCategory
- createdAt
- updatedAt

### ArtifactSubmission

- artifactId
- workItemId
- artifactKind
- version
- sourceClaimIds
- outcomeIds
- evidenceRefs
- submittedBy
- submittedAt
- supersedes
- status

### GateDecision

- gate
- decision: PASS, RETURN, or BLOCK
- reviewerRole
- findings
- evidenceRefs
- decidedAt

### LaunchReadinessPacket

- runId
- frozenCourseRelease
- QA decision
- Registrar decision
- Passport readiness state
- unresolved non-blocking polish notes
- proposed audience
- positioning summary
- launch dependencies
- marketingQuestions
- deliveredAt
- marketingProposedDate

## 8. Storage and systems of record

### GitHub

Canonical for:

- code
- schemas
- worker contracts
- versioned curriculum artifacts
- test evidence
- run manifests suitable for source control

### Linear

Canonical for:

- project state
- ownership
- deadlines
- decision records
- launch handoff status
- closure evidence links

The Campus updates existing University work and does not create a parallel issue hierarchy when existing anchors are available.

### S/ Agent Passport

Canonical for identity, owner, eligibility, authority, capability status, and final activation gate.

### NotebookLM

A source workspace. The Source Curator extracts and approves SourceClaims into the university evidence layer.

### Campus Store

Implementation uses a CampusStore interface.

The first adapter is a local append-only file store for deterministic development and today’s curriculum run. Runtime files are ignored by Git.

A Supabase-backed adapter is a separate production integration. Until that adapter is verified, the Campus must report file-backed durability accurately.

## 9. APIs and MCP tools

HTTP API:

- POST /api/campus/runs
- GET /api/campus/runs/:runId
- POST /api/campus/runs/:runId/work-items/:workItemId/claim
- POST /api/campus/runs/:runId/artifacts
- POST /api/campus/runs/:runId/gates
- POST /api/campus/runs/:runId/advance
- POST /api/campus/runs/:runId/marketing-handoff
- POST /api/campus/runs/:runId/owner-decision

MCP tools:

- start_campus_run
- get_campus_status
- claim_campus_work
- submit_campus_artifact
- decide_campus_gate
- advance_campus_run
- prepare_marketing_handoff
- record_marketing_date
- record_owner_decision

## 10. Orchestration rules

1. The Dean creates Work Items from the current state.
2. A Worker may claim only work assigned to its office.
3. Submission requires every declared output and evidence reference.
4. A Worker cannot approve its own artifact.
5. A gate decision records evidence and findings.
6. RETURN reopens or creates the accountable Work Item.
7. BLOCK records a blocker category and required unblock condition.
8. Advance is legal only when the current state's mandatory gate passes.
9. Marketing handoff requires curriculum freeze, QA PASS, Registrar completeness, and Passport readiness.
10. Owner approval requires a Marketing-proposed date.
11. Every mutation appends an event; previous attempts remain queryable.
12. The Dean escalates only the three owner-facing categories defined in the Goals.

## 11. Error and blocker model

Blocker categories:

- WORKER
- EVIDENCE
- SOURCE
- PASSPORT
- PLATFORM_LINEAR
- PLATFORM_GITHUB
- PLATFORM_NOTEBOOKLM
- PLATFORM_MARKETING
- SECURITY
- OWNER_DECISION
- SYSTEM_OTHER

A platform blocker never reduces a Worker score.

A Passport identity blocker prevents enrollment but is not a FAIL.

A missed deadline creates AT_RISK status and a routing event, not an automatic quality waiver.

## 12. First curriculum run

The first run must produce:

1. approved source and claim registry
2. capability blueprint
3. complete course map
4. scholar notes
5. decision cases
6. labs and simulations
7. assessments and rubrics
8. remediation packs
9. thesis and viva requirements
10. Faculty QA manifest
11. Registrar evidence manifest
12. Passport handoff contract
13. frozen curriculum release
14. polish change set
15. marketing launch-readiness packet

Curriculum freeze means structure, outcomes, sources, teaching materials, assessments, gates, and evidence contracts are complete. Tomorrow's polish may improve wording, visuals, navigation, and packaging but may not silently change academic requirements.

## 13. Testing strategy

Development follows test-first Red-Green-Refactor.

Required tests:

- Dean cannot author specialist artifacts
- Worker cannot claim another office's work
- artifact submission fails when required evidence is missing
- Worker cannot approve its own artifact
- state cannot advance without the required gate
- RETURN routes work to the accountable office
- platform blocker does not reduce Worker score
- Passport blocker does not create FAIL
- curriculum cannot freeze without all fifteen run outputs
- polish cannot change frozen academic requirements
- marketing handoff requires QA, Registrar, and Passport readiness
- Campus cannot choose the marketing launch date
- owner approval requires a Marketing-proposed date
- append-only history preserves prior attempts
- restart recovers a file-backed Campus Run

CI must run type-check, tests, and production build.

## 14. Delivery structure

The Campus implementation is a stacked branch based on PR #7.

Planned repository structure:

- src/campus/contracts.ts
- src/campus/state-machine.ts
- src/campus/orchestrator.ts
- src/campus/store.ts
- src/campus/file-store.ts
- src/campus/routes.ts
- src/campus/mcp-tools.ts
- workers/dean.md
- workers/academic-senate.md
- workers/faculty-studio.md
- workers/examination-board.md
- workers/registrar.md
- workers/passport-office.md
- workers/launch-office.md
- test/campus/*.test.ts
- docs/superpowers/plans/2026-08-28-s-university-campus-plan.md

## 15. Acceptance criteria

The Campus is implementation-complete for the inaugural run when:

- all required tests pass in GitHub CI
- a run can be created, persisted, restarted, and queried
- Workers can claim, submit, return, and re-submit artifacts
- illegal state transitions are rejected
- the full curriculum output checklist can reach CURRICULUM_FROZEN
- tomorrow's polish is scope-limited
- a launch-readiness packet can be generated and handed to Marketing
- only Marketing can supply the proposed date
- only Seif can approve the launch
- Linear contains the GitHub evidence link and actual status
- no production persistence, deployment, or external integration is falsely represented
