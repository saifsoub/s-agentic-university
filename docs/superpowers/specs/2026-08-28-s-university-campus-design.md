# S/ University Campus — Orchestration Design

Date: 2026-08-28  
Status: Approved architecture; reviewed and corrected before implementation  
Owner and Chancellor: Seif Alsoub  
Base implementation: GitHub PR #7, evidence-first material generators

## 1. Purpose

S/ University Campus is the operating house that coordinates specialist Workers so the owner does not need to repeatedly route, chase, reconcile, or explain university work.

The Campus does not replace Workers. It gives them explicit offices, artifact contracts, gates, deadlines, evidence rules, leases, review separation, and handoffs.

The inaugural commitment is:

- freeze the complete academic curriculum release candidate by 2026-08-28 23:00 Asia/Dubai
- permit editorial and visual polish only on 2026-08-29
- verify the polish and prepare the launch packet on 2026-08-29
- let the existing Marketing Team propose the public launch date
- require Seif's final approval before launch

## 2. Goals

1. Route each university task to the correct Worker.
2. Prevent the Dean or general assistant from doing specialist work assigned to Workers.
3. Maintain one canonical run state and append-only event history.
4. Enforce source, curriculum, faculty, assessment, QA, Registrar, Passport, and launch gates.
5. Return failed work to the responsible Worker without involving the owner.
6. Escalate to Seif only for a decision, a genuine authority/security blocker, or final approval.
7. Keep GitHub, Linear, Passport, NotebookLM, and Marketing responsibilities distinct.
8. Produce a curriculum release that is measurable, reviewable, restartable, and launchable.
9. Dispatch and recover Workers without requiring manual prompting for every task.

## 3. Non-goals

- The Campus does not activate Passport permissions automatically.
- The Campus does not choose the public launch date.
- The Campus does not create a replacement Marketing Team.
- The Campus does not create a dashboard, a duplicate checklist, or a parallel Linear hierarchy.
- The Campus does not treat NotebookLM as the system of record.
- The Campus does not represent local file persistence as production durability.
- The Campus does not merge, deploy, publish, or launch without the appropriate external approval.
- The Campus does not lower academic or governance gates to meet a deadline.

## 4. Institutional structure and artifact authority

### Chancellor and Owner

Seif is the singular final authority for institutional direction, exceptional scope changes, final permission changes, and final launch approval.

### Dean Orchestrator

The Dean owns routing, sequencing, deadline monitoring, gate readiness checks, and closure.

The Dean cannot author or submit any specialist artifact. The Dean allowlist is limited to:

- CampusRun
- WorkItem
- RoutingDecision
- DeadlineEvent
- StatusSummary
- EscalationRecord

When a deliverable is missing or rejected, the Dean creates or reopens the correct Work Item and routes it to the accountable office.

### Academic Senate

#### Curriculum Architect

Allowed artifacts:

- CapabilityBlueprint
- CurriculumMap
- PrerequisiteGraph
- CapstoneEvidenceContract

#### Source Curator

Allowed artifacts:

- SourceInventory
- SourceClaimRegistry
- ProvenanceAudit
- SourceFreshnessDecision

NotebookLM is an input workspace. Only approved SourceClaims enter the university evidence layer.

### Faculty Studio

#### Scholar Note Faculty

Allowed artifacts:

- ScholarNote
- WorkedExample
- MisconceptionCheck
- RetrievalPromptSet
- FieldReference

#### Case Faculty

Allowed artifacts:

- DecisionCase
- CaseExhibits
- DiscussionSequence
- FacultyTeachingNote

#### Lab and Simulation Faculty

Allowed artifacts:

- LabSimulation
- FaultInjectionPlan
- HiddenTransferVariant
- TelemetryContract
- CriticalFailureConditions

### Examination Board

#### Assessment Designer

Allowed artifacts:

- PracticalExam
- AnalyticRubric
- HoldoutVariant
- ReliabilityTrialPlan
- ScoringPolicy

#### Independent QA Examiner

Allowed artifacts:

- QaFinding
- QaDecision
- AlignmentMatrix
- LeakageReview
- AccessibilityPrivacyBiasReview

QA cannot author or approve the same artifact. A reviewer is rejected when reviewerActorId equals artifact submittedBy.

### Registrar Office

Allowed artifacts:

- EvidenceCompletenessDecision
- AttemptHistory
- CapabilityDelta
- RemediationRecord
- TranscriptReference
- CertificateReference
- RegistrarDecision

### Passport Office

Allowed artifacts:

- EnrollmentEligibilityDecision
- IdentityOwnerBinding
- AuthorityBoundaryRecord
- PassportHandoffReadiness
- ActivationReviewRequest

The Passport Office cannot activate an agent. It can only produce an owner-reviewable handoff after PASS.

### Launch Office

#### Release Manager

Allowed artifacts:

- AcademicFreezeManifest
- PolishChangeSet
- PolishVerification
- ReleaseManifest
- LaunchReadinessPacket

#### Marketing Liaison

Allowed artifacts:

- MarketingHandoffReceipt
- MarketingQuestionSet
- MarketingProposedDate

The Liaison transmits the packet to the existing Marketing Team and records its response. It cannot select the date on the Marketing Team's behalf.

## 5. Actor identity and authorization

Every mutation carries ActorContext:

- actorId
- actorRole
- office
- ownerId
- trustedIdentitySource
- authenticatedAt
- requestId

Trusted identity sources implement IdentityProvider. The local implementation uses a signed static Worker Registry for deterministic tests and the inaugural local run. Production identity must use a verified Passport or SSO adapter before deployment.

Authorization rules:

| Action | Authorized actor |
|---|---|
| Start run, route work, request gate readiness, advance passed gate | Dean |
| Claim and submit office artifact | Worker bound to that office and artifact kind |
| Academic QA decision | Independent QA Examiner who did not author artifact |
| Evidence completeness and PASS/remediation record | Registrar |
| Enrollment and handoff readiness | Passport Office |
| Freeze and polish verification | Release Manager |
| Record proposed launch date | Marketing Liaison using Marketing Team response |
| Final launch decision | Seif actor ID bound to the Campus owner |

APIs reject missing identity, role mismatch, owner mismatch, self-review, or an untrusted identity source.

## 6. State machine

A Campus Run moves through these states:

1. INTAKE
2. PASSPORT_ENROLLMENT
3. SOURCE_LOCK
4. CURRICULUM_BUILD
5. FACULTY_BUILD
6. EXAM_BUILD
7. INDEPENDENT_QA
8. REGISTRAR_REVIEW
9. CURRICULUM_FROZEN
10. POLISH
11. POLISH_VERIFICATION
12. PASSPORT_HANDOFF_READINESS
13. LAUNCH_READY
14. MARKETING_SCHEDULING
15. OWNER_APPROVAL
16. SCHEDULED
17. CLOSED

Exceptional state:

- CURRICULUM_LATE records a missed curriculum-freeze deadline while retaining the last academic state and all unmet gates. It is a recovery wrapper, not an academic gate result. When work resumes, the run returns to lastAcademicState with deadlineOutcome=LATE. After all gates pass it may enter CURRICULUM_FROZEN with the persistent late outcome, but it never retroactively becomes ON_TIME or satisfies the inaugural deadline acceptance criterion.

Failure transitions:

- enrollment failure remains PASSPORT_ENROLLMENT with BLOCK and no worker-performance FAIL
- source failure returns to SOURCE_LOCK
- outcome or prerequisite failure returns to CURRICULUM_BUILD
- material failure returns the named artifact to the accountable Faculty office
- assessment failure returns to EXAM_BUILD
- QA RETURN routes individual artifacts to their authoring offices and invalidates dependent decisions
- evidence failure returns to REGISTRAR_REVIEW
- academic change after freeze invalidates the freeze, creates a new release version, and returns to the owning academic state
- polish failure returns to POLISH without altering the academic hash
- Passport handoff failure remains PASSPORT_HANDOFF_READINESS and does not rewrite the Registrar result
- Marketing questions return the launch packet to the Release Manager
- owner rejection returns to the named gate with a recorded reason

No state may be skipped.

## 7. Mandatory gate table

| State completed | Required decision | Reviewer | Minimum evidence |
|---|---|---|---|
| INTAKE | Run initialized | Dean | owner ID, schedule, existing Linear anchors, active Worker Registry |
| PASSPORT_ENROLLMENT | Enrollment PASS | Passport Office | passport ID, status, owner binding, authority boundary |
| SOURCE_LOCK | Source PASS | Source Curator | source inventory, approved claims, provenance and freshness |
| CURRICULUM_BUILD | Curriculum PASS | Curriculum Architect | outcomes, prerequisites, map, capstone contract |
| FACULTY_BUILD | Faculty completeness PASS | Dean readiness check | all assigned scholar, case, and lab artifacts |
| EXAM_BUILD | Exam completeness PASS | Assessment Designer | exam, rubric, holdout, trials, hard gates |
| INDEPENDENT_QA | QA PASS | Independent QA Examiner | alignment, provenance, leakage, accessibility, privacy, bias |
| REGISTRAR_REVIEW | Registrar PASS or REMEDIATION_REQUIRED | Registrar | baseline, attempts, lab, exam, reliability, delta, QA |
| CURRICULUM_FROZEN | Freeze PASS | Release Manager | academic hash and complete pre-freeze output set |
| POLISH | Polish submitted | Release Manager | complete PolishChangeSet limited to allowed fields; transition target is POLISH_VERIFICATION |
| POLISH_VERIFICATION | Polish PASS | Release Manager | allowed-field diff and unchanged academic hash |
| PASSPORT_HANDOFF_READINESS | Handoff PASS | Passport Office | Registrar PASS, QA PASS, owner-bound request |
| LAUNCH_READY | Packet PASS | Release Manager | final manifest and launch-readiness packet |
| MARKETING_SCHEDULING | Date received | Marketing Liaison | Marketing Team response and proposed date |
| OWNER_APPROVAL | APPROVE or RETURN | Seif | proposed date, readiness packet, unresolved notes |
| SCHEDULED | Schedule recorded | Release Manager | owner approval, Marketing-proposed date, Marketing acknowledgement; CLOSED requires LaunchExecutionReceipt or owner-approved cancellation |

## 8. Deadline policy and clock

The inaugural run uses Asia/Dubai time:

- Curriculum freeze deadline: 2026-08-28 23:00
- Polish freeze deadline: 2026-08-29 14:00
- Marketing handoff deadline: 2026-08-29 16:00

All timestamps are stored as UTC plus the declared scheduleTimeZone.

The orchestrator receives an injected Clock. Tests use a deterministic clock and verify pre-deadline, exact-deadline, and late behavior.

If the academic freeze gate has not passed by the deadline, the Campus appends CURRICULUM_DEADLINE_MISSED, marks the run CURRICULUM_LATE, identifies unmet Work Items, and re-dispatches or blocks them. It never invents completion or waives gates.

Acceptance for the inaugural run requires an AcademicFreezeManifest event timestamped no later than the configured curriculum freeze deadline. If the real run misses it, the status is late, not complete.

The Marketing Team owns the proposed public launch date after receiving the launch-readiness packet.

## 9. Freeze immutability and polish

AcademicFreezeManifest contains a cryptographic academicHash over:

- approved SourceClaim IDs and versions
- outcomes and prerequisites
- curriculum map
- scholar notes
- cases and labs
- assessments, rubrics, holdouts, and hard gates
- QA decision
- Registrar decision

After CURRICULUM_FROZEN, allowed polish fields are limited to:

- spelling and copy edit that does not change meaning
- visual styling
- layout and navigation
- accessibility presentation metadata
- packaging metadata

PolishVerification recomputes academicHash and requires equality.

Any change to an academic field:

1. invalidates the current freeze;
2. creates a new CourseRelease version;
3. records the superseded release;
4. returns the run to the owning academic state;
5. reruns dependent QA and Registrar gates before a new freeze.

An explicit note cannot bypass this rule.

## 10. Canonical data contracts

### CampusRun

- runId
- cohortId
- courseReleaseId
- ownerId
- currentState
- lastAcademicState
- schedule and scheduleTimeZone
- workItems
- artifactRefs
- gateDecisions
- blockers
- academicHash
- marketingHandoff
- ownerDecision
- version for optimistic concurrency
- createdAt
- updatedAt

### ActorContext

- actorId
- actorRole
- office
- ownerId
- trustedIdentitySource
- authenticatedAt
- requestId

### WorkerBinding

- workerId
- actorId
- office
- allowedArtifactKinds
- dispatchTarget
- active
- leaseDurationSeconds
- maxAttempts

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
- claimedBy
- leaseExpiresAt
- heartbeatAt
- idempotencyKey
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
- contentHash
- status

### GateDecision

- gate
- decision: PASS, RETURN, or BLOCK
- reviewerActorId
- reviewerRole
- findings
- evidenceRefs
- decidedAt

### LaunchReadinessPacket

- runId
- frozenCourseRelease
- academicHash
- polishVerification
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

## 11. Worker dispatch, leases, and recovery

WorkerRegistry maps each office to active WorkerBindings.

The Dispatcher interface supports:

- dispatch(workItem)
- wake(workerBinding, workItem)
- cancel(workItem)
- health(workerBinding)

Claim rules:

- a Work Item has one active lease
- claim requires matching office and allowed artifact kind
- claim uses optimistic run version and an idempotency key
- duplicate requests return the prior result
- heartbeat extends the lease
- expired lease returns the item to READY and appends LEASE_EXPIRED
- a Worker receives at most three attempts by default
- after max attempts, the Dean records WORKER or SYSTEM_OTHER blocker based on evidence and routes a replacement Worker when available
- concurrent submissions with a stale version are rejected
- a restart rebuilds ready and leased state from the append-only event log

A run cannot remain silently idle: every nonterminal state must have an active Work Item, a scheduled retry, or a named BLOCK with an unblock condition.

## 12. Storage and systems-of-record precedence

### Campus Store

CampusStore is canonical for runtime state, Worker leases, idempotency, and the append-only event log.

The first adapter is FileCampusStore for deterministic development and the inaugural local run. Runtime files are excluded from Git.

A Supabase-backed adapter is a separate production requirement. Until verified, the service reports file-backed durability.

### GitHub

Canonical for code, schemas, worker contracts, versioned curriculum artifacts, immutable release manifests, and test evidence.

### Linear

Canonical human-facing command and decision surface for project status, ownership, deadlines, launch handoff, and closure evidence links.

The Linear adapter accepts existing project and issue IDs in Campus configuration. It exposes updateExistingAnchor and appendComment only. It has no createIssue, createProject, or createDashboard method.

### S/ Agent Passport

Canonical for identity, owner, eligibility, authority, capability state, and final activation gate.

### NotebookLM

A source workspace only. The Source Curator persists approved SourceClaims in the university evidence layer, defined as the SourceClaim records attached to the versioned CourseRelease and Campus event log.

### Cross-system synchronization

Every external write uses an OutboxEvent with:

- eventId
- idempotencyKey
- targetSystem
- targetAnchor
- payloadHash
- attempt
- nextAttemptAt
- status
- lastError

The Campus domain event and every derived OutboxEvent are persisted in the same atomic CampusStore transaction. For FileCampusStore, the transaction is one checksummed write-ahead envelope committed through temporary-file write, sync, and atomic rename before reduction. Crash recovery ignores incomplete envelopes and rebuilds both run state and pending outbox work from committed envelopes.

Campus state commits before external delivery. Failed mirrors become PENDING_SYNC and retry with the same idempotency key. External mirrors never overwrite Campus runtime state. Conflicts are recorded as SYNC_CONFLICT and routed to the Dean; they are not resolved by last-write-wins.

## 13. APIs and MCP tools

HTTP API:

- POST /api/campus/runs
- GET /api/campus/runs/:runId
- POST /api/campus/runs/:runId/work-items/:workItemId/claim
- POST /api/campus/runs/:runId/work-items/:workItemId/heartbeat
- POST /api/campus/runs/:runId/artifacts
- POST /api/campus/runs/:runId/gates
- POST /api/campus/runs/:runId/advance
- POST /api/campus/runs/:runId/marketing-handoff
- POST /api/campus/runs/:runId/marketing-date
- POST /api/campus/runs/:runId/owner-decision

Every mutation requires ActorContext, expectedRunVersion, and idempotencyKey.

MCP tools:

- start_campus_run
- get_campus_status
- claim_campus_work
- heartbeat_campus_work
- submit_campus_artifact
- decide_campus_gate
- advance_campus_run
- prepare_marketing_handoff
- record_marketing_date
- record_owner_decision

## 14. Orchestration rules

1. The Dean creates Work Items from the current state.
2. A Worker may claim only work assigned to its office and artifact allowlist.
3. Submission requires every declared output and evidence reference.
4. A Worker cannot approve its own artifact.
5. A gate decision records authenticated reviewer, evidence, and findings.
6. RETURN reopens or creates the accountable Work Item.
7. BLOCK records a blocker category and explicit unblock condition.
8. Advance is legal only when the current state's mandatory gate passes.
9. Marketing handoff requires academic freeze, polish verification, QA PASS, Registrar PASS, and Passport handoff readiness.
10. Only a Marketing Liaison can record a date received from the Marketing Team.
11. Only Seif's configured owner actor ID can approve launch.
12. Every mutation appends an event; previous attempts remain queryable.
13. The Dean escalates only owner decisions, authority/security blockers, or final approval.
14. The Campus exposes status through the existing Linear anchors and read APIs; no UI or new checklist is created.

## 15. Error and blocker model

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

A missed deadline creates CURRICULUM_LATE and re-routing, not a quality waiver.

Appropriate external approval means only: merge, deploy, publish, launch, access-control change, secret creation, or Passport activation.

Actual status means the latest event-reduced CampusRun state plus any PENDING_SYNC mirrors; Linear displays it but does not redefine it.

## 16. Inaugural curriculum output sets

### Pre-freeze academic set — required by 2026-08-28 23:00

1. approved source and claim registry
2. capability blueprint
3. complete course map and prerequisites
4. scholar notes
5. decision cases
6. labs and simulations
7. assessments and rubrics
8. remediation packs
9. thesis and viva requirements
10. independent Faculty QA manifest
11. Registrar evidence manifest and decision

The AcademicFreezeManifest is the result of passing this set; it is not an input to its own gate.

### Post-freeze polish set — required by 2026-08-29 14:00

12. polish change set limited to allowed fields
13. polish verification with unchanged academicHash
14. final release manifest

### Launch handoff set — required by 2026-08-29 16:00

15. Passport handoff readiness
16. marketing launch-readiness packet
17. Marketing handoff receipt

MarketingProposedDate is produced by the existing Marketing Team after handoff and is not required for curriculum freeze.

## 17. Testing strategy

Development follows test-first Red-Green-Refactor.

Required tests:

- Dean cannot author each specialist artifact kind
- Worker cannot claim another office's work
- worker registry rejects inactive or unbound Workers
- lease prevents double claim and expires deterministically
- idempotency returns the prior mutation result
- stale run version rejects concurrent mutation
- artifact submission fails when required evidence is missing
- Worker cannot approve its own artifact
- authorization rejects actor, role, office, owner, or identity-source mismatch
- state cannot advance without the required gate
- RETURN routes work to the accountable office
- every nonterminal state has work, retry, or named blocker
- platform blocker does not reduce Worker score
- Passport blocker does not create FAIL
- pre-freeze set can freeze without post-freeze or Marketing outputs
- curriculum cannot freeze without all eleven pre-freeze outputs
- deadline behavior is correct before, at, and after 23:00 Asia/Dubai
- academic hash is stable across allowed polish
- academic change invalidates freeze, versions release, and reruns dependent gates
- marketing handoff requires QA, Registrar, polish, and Passport readiness
- Campus cannot choose the Marketing launch date
- only Marketing Liaison records the Team's proposed date
- only Seif's owner actor approves launch
- append-only history preserves prior attempts
- restart recovers run, leases, idempotency, and outbox state
- a crash between mutation and delivery cannot lose the atomically persisted OutboxEvent
- incomplete file-store transaction envelopes are ignored during recovery
- failed external mirror becomes PENDING_SYNC without rolling back Campus state
- Linear adapter cannot create issues, projects, dashboards, or checklists
- no Campus UI routes or assets are introduced

CI must run type-check, tests, and production build.

## 18. Delivery structure

The Campus implementation is a stacked branch based on PR #7.

Planned repository structure:

- src/campus/contracts.ts
- src/campus/identity.ts
- src/campus/authorization.ts
- src/campus/state-machine.ts
- src/campus/orchestrator.ts
- src/campus/worker-registry.ts
- src/campus/dispatcher.ts
- src/campus/store.ts
- src/campus/file-store.ts
- src/campus/outbox.ts
- src/campus/clock.ts
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

## 19. Acceptance criteria

The Campus is implementation-complete for the inaugural local run when:

- all required tests pass in GitHub CI
- a run can be created, persisted, restarted, and queried
- authenticated Workers can be dispatched, claim, heartbeat, submit, return, and re-submit artifacts
- illegal role actions and state transitions are rejected
- the eleven-item academic set reaches CURRICULUM_FROZEN no later than the configured deadline; CURRICULUM_LATE is a truthful failed operational outcome and does not satisfy inaugural-run completion
- tomorrow's polish cannot alter the academic hash
- a launch-readiness packet can be generated and handed to the existing Marketing Team
- only the Marketing Liaison can record the Team's proposed date
- only Seif can approve launch
- Linear mirrors through existing anchors only
- the Campus creates no dashboard, UI, duplicate issue hierarchy, or parallel checklist
- no production persistence, deployment, authentication integration, or external connector is falsely represented
