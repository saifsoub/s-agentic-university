# S/ University Runtime Cycle

## Purpose
Operate the S/ University as the education and certification gate for passported S/ Agency workers.

## First cohort
Visioning Team.

## Invariant cycle
1. Worker identity + passport eligibility check
2. Baseline competency measurement
3. Curriculum and learning material assignment
4. Practical lab
5. Structured exam / assessment
6. Before-vs-after performance measurement
7. Evidence + provenance package
8. Independent QA decision
9. Certification record
10. Passport activation handoff only on PASS
11. Linear closure with evidence and blockers

## Seven operating roles
- Dean / Education Orchestrator — owns routing, sequencing, and closure
- Curriculum Designer — maps role requirements to curriculum and practical learning objectives
- Knowledge Curator — ensures source material is current, appropriate, and traceable
- Instructor — conducts targeted teaching and practical coaching
- Assessment Designer — builds role-specific exams and labs
- QA & Performance Evaluator — independently scores quality, performance delta, evidence completeness, and confidence
- Registrar / Passport Handoff — records certification and sends activation eligibility to S/ Agent Passport

## Required worker evidence
Every worker record must include:
- worker ID / role
- cohort ID and run ID
- assigned task slice
- baseline score
- learning material references
- practical lab result
- exam score
- before / after performance delta
- evidence references
- QA finding and confidence
- pass / fail result
- certificate / transcript record
- passport ID and activation handoff state
- blockers, conflicts, or exceptions

## Performance measures
At minimum:
- correctness / task quality
- completion rate
- time to completion
- retry / rework count
- evidence completeness
- instruction adherence
- tool / workflow efficiency where observable
- post-training change versus baseline

## Gate rule
No worker is activation-ready because training was merely completed. Activation eligibility requires BOTH:
1. PASS from the assessment + QA process, and
2. complete auditable evidence.

Failure at any gate returns the worker to targeted remediation, followed by a new assessment run. Previous attempts remain part of the provenance record.

## Documentation contract
The execution package is three-layered:
- PRE: intent, required outcome, worker baseline, passport state, expected evidence.
- DURING: material used, actions taken, lab/exam execution, measurements, exceptions and evidence.
- POST: each worker records a concise result summary; QA consolidates performance and evidence; Registrar records certification and activation decision.

## Systems of record
- GitHub: implementation, schemas, versioned education runtime contract and technical evidence.
- Linear: canonical execution and closure record for University work.
- monday.com: live operational orchestration where permissions allow.
- S/ Agent Passport: identity, status, capabilities and final activation gate.

## Current execution state — 2026-08-26
- Visioning Team selected as first cohort.
- Linear SAG-56 promoted to In Progress and expanded as the execution anchor.
- monday.com Education Orchestrator agent created, activated and first run enqueued.
- monday.com board `S/ University — Active Runtime` discovered, but connector write permissions currently block item/column creation; this must not be interpreted as an education-cycle failure.
