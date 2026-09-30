import assert from 'node:assert/strict';
import test from 'node:test';
import type { CapabilityBlueprintRequest } from '../src/contracts.js';
import {
  GenerationError,
  decideEvidence,
  generateCapabilityBlueprint,
  generateCourseRelease,
} from '../src/generators.js';

const request: CapabilityBlueprintRequest = {
  passport: {
    passportId: 'S-PASS-001',
    agentId: 'vision-worker-01',
    role: 'Visioning Analyst',
    ownerId: 'owner-seif',
    status: 'eligible',
    authorizedTools: ['search', 'linear'],
  },
  title: 'Agentic Strategic Visioning',
  degreePath: 'M.Ag',
  liveWorkClass: 'supervised strategic analysis',
  outcomes: [
    { id: 'OUT-1', statement: 'Evaluate strategic signals with traceable evidence', performanceVerb: 'evaluate', critical: true },
    { id: 'OUT-2', statement: 'Defend a governed recommendation under uncertainty', performanceVerb: 'defend', critical: true },
  ],
  baseline: {
    task: 'Produce a source-grounded strategic recommendation',
    score: 42,
    observedFailures: ['weak provenance', 'no transfer test'],
  },
  riskTier: 'high',
  sourceClaims: [
    {
      id: 'CLAIM-1',
      statement: 'Active practice and evidence improve demonstrated learning.',
      status: 'approved',
      confidence: 0.95,
      source: {
        title: 'Approved learning-science source',
        url: 'https://example.com/source',
        locator: 'section 2',
        accessedAt: '2026-08-28T00:00:00.000Z',
      },
      limitations: [],
    },
  ],
};

test('generates the complete nine-artifact S/ release', () => {
  const blueprint = generateCapabilityBlueprint(request);
  const release = generateCourseRelease({
    courseTitle: 'S/U Strategic Visioning',
    blueprint,
    sourceClaims: request.sourceClaims,
  });

  assert.equal(release.artifacts.length, 9);
  assert.equal(new Set(release.artifacts.map((item) => item.kind)).size, 9);
  assert.equal(release.facultyQa.approvedForCohortReview, true);
  assert.equal(release.permissionUnlock.automatic, false);
});

test('blocks generation for an ineligible Passport', () => {
  assert.throws(
    () => generateCapabilityBlueprint({
      ...request,
      passport: { ...request.passport, status: 'ineligible' },
    }),
    (error: unknown) => error instanceof GenerationError && error.code === 'passport_not_eligible',
  );
});

test('blocks unsupported source collections', () => {
  assert.throws(
    () => generateCapabilityBlueprint({
      ...request,
      sourceClaims: request.sourceClaims.map((claim) => ({ ...claim, status: 'hypothesis' as const })),
    }),
    (error: unknown) => error instanceof GenerationError && error.code === 'approved_sources_required',
  );
});

test('applies 70 percent plus QA and critical-gate policy', () => {
  const pass = decideEvidence({
    baselineScore: 42,
    practicalScore: 82,
    examScore: 78,
    reliabilityScore: 80,
    evidenceComplete: true,
    qaApproved: true,
    criticalFailures: [],
  });
  assert.equal(pass.result, 'PASS');
  assert.equal(pass.automaticActivation, false);

  const blocked = decideEvidence({
    baselineScore: 42,
    practicalScore: 95,
    examScore: 95,
    reliabilityScore: 95,
    evidenceComplete: true,
    qaApproved: true,
    criticalFailures: ['authority breach'],
  });
  assert.equal(blocked.result, 'REMEDIATION_REQUIRED');
  assert.equal(blocked.activationEligible, false);
});

test('display rounding cannot turn a score below 70 into a passing decision', () => {
  const result = decideEvidence({
    baselineScore: 42,
    practicalScore: 69.99,
    examScore: 70,
    reliabilityScore: 70,
    evidenceComplete: true,
    qaApproved: true,
    criticalFailures: [],
  });
  assert.equal(result.overallScore, 70);
  assert.equal(result.result, 'REMEDIATION_REQUIRED');
  assert.equal(result.activationEligible, false);
  assert.equal(result.passportHandoff, 'BLOCKED');
  assert.deepEqual(result.reasons, ['overall score below 70']);
});

test('an exact 70 percent score remains eligible for owner review', () => {
  for (const [practicalScore, examScore, reliabilityScore] of [
    [70, 70, 70],
    [65, 75, 70],
    [69.9, 70.1, 70],
  ]) {
    const result = decideEvidence({
      baselineScore: 42,
      practicalScore,
      examScore,
      reliabilityScore,
      evidenceComplete: true,
      qaApproved: true,
      criticalFailures: [],
    });
    assert.equal(result.result, 'PASS');
    assert.equal(result.activationEligible, true);
    assert.equal(result.automaticActivation, false);
    assert.equal(result.passportHandoff, 'OWNER_REVIEW_REQUIRED');
    assert.deepEqual(result.reasons, []);
  }
});
