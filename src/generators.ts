import { randomUUID } from 'node:crypto';
import type {
  CapabilityBlueprint,
  CapabilityBlueprintRequest,
  CourseRelease,
  CourseReleaseRequest,
  EvidenceDecisionInput,
  LearningOutcome,
  MaterialArtifact,
  SourceClaim,
} from './contracts.js';

export class GenerationError extends Error {
  constructor(public readonly code: string, message: string) {
    super(message);
    this.name = 'GenerationError';
  }
}

function requireApprovedClaims(claims: SourceClaim[]): SourceClaim[] {
  const approved = claims.filter((claim) => claim.status === 'approved');
  if (approved.length === 0) {
    throw new GenerationError('approved_sources_required', 'At least one approved source claim is required.');
  }
  return approved;
}

function artifact(
  kind: MaterialArtifact['kind'],
  title: string,
  purpose: string,
  outcomes: LearningOutcome[],
  sourceClaimIds: string[],
  content: Record<string, unknown>,
): MaterialArtifact {
  return {
    artifactId: 'artifact_' + randomUUID(),
    kind,
    version: '1.0.0',
    title,
    purpose,
    outcomeIds: outcomes.map((outcome) => outcome.id),
    sourceClaimIds,
    content,
  };
}

export function generateCapabilityBlueprint(input: CapabilityBlueprintRequest): CapabilityBlueprint {
  if (input.passport.status !== 'eligible') {
    throw new GenerationError('passport_not_eligible', 'An eligible Passport is required before curriculum generation.');
  }

  const approved = requireApprovedClaims(input.sourceClaims);
  const sourceClaimIds = approved.map((claim) => claim.id);

  return {
    blueprintId: 'blueprint_' + randomUUID(),
    version: '1.0.0',
    createdAt: new Date().toISOString(),
    passport: input.passport,
    title: input.title,
    degreePath: input.degreePath,
    liveWorkClass: input.liveWorkClass,
    outcomes: input.outcomes,
    baseline: input.baseline,
    riskTier: input.riskTier,
    sourceClaimIds,
    prerequisiteGraph: input.outcomes.map((outcome, index) => ({
      outcomeId: outcome.id,
      dependsOn: index === 0 ? [] : [input.outcomes[index - 1].id],
    })),
    capstone: {
      prompt: 'Build, operate, evaluate, and defend an original ' + input.title + ' system in an unseen transfer context.',
      evidenceRequirements: [
        'source-grounded decision record',
        'tool and authority boundary log',
        'successful unseen transfer task',
        'repeated-trial reliability evidence',
        'before-versus-after capability delta',
        'independent QA conclusion',
      ],
    },
    permissionRule: 'owner_review_required',
  };
}

export function generateSourceRegistry(
  outcomes: LearningOutcome[],
  claims: SourceClaim[],
): MaterialArtifact {
  const approved = requireApprovedClaims(claims);
  return artifact(
    'source_registry',
    'Approved Source and Claim Registry',
    'Preserve claim-level provenance and prevent unsupported material.',
    outcomes,
    approved.map((claim) => claim.id),
    {
      claims: approved,
      rejectedClaimIds: claims.filter((claim) => claim.status === 'rejected').map((claim) => claim.id),
      hypothesisClaimIds: claims.filter((claim) => claim.status === 'hypothesis').map((claim) => claim.id),
    },
  );
}

export function generateScholarNote(
  outcomes: LearningOutcome[],
  sourceClaimIds: string[],
): MaterialArtifact {
  return artifact(
    'scholar_note',
    'S/ Scholar Note',
    'Provide the minimum source-grounded theory required for performance.',
    outcomes,
    sourceClaimIds,
    {
      executiveAbstract: 'A concise decision-ready synthesis tied to approved evidence.',
      conceptSections: outcomes.map((outcome) => ({
        outcomeId: outcome.id,
        focus: outcome.statement,
        workedExampleRequired: true,
        misconceptionCheckRequired: true,
        retrievalPromptsRequired: 3,
      })),
      fieldReferenceRequired: true,
    },
  );
}

export function generateDecisionCase(
  blueprint: CapabilityBlueprint,
): MaterialArtifact {
  return artifact(
    'decision_case',
    'Decision Case — ' + blueprint.title,
    'Force judgment under incomplete information and real authority constraints.',
    blueprint.outcomes,
    blueprint.sourceClaimIds,
    {
      protagonistRole: blueprint.passport.role,
      decisionPoint: 'Select and defend a course of action without exceeding authorized scope.',
      constraints: [
        'incomplete information',
        'owner approval remains controlling',
        'only authorized tools may be used',
        'all material claims require provenance',
      ],
      exhibitsRequired: 3,
      discussionSequence: ['opening decision', 'evidence probe', 'trade-off challenge', 'adversarial counterexample', 'debrief'],
      scriptedAnswerForbidden: true,
    },
  );
}

export function generateLabSimulation(
  blueprint: CapabilityBlueprint,
): MaterialArtifact {
  return artifact(
    'lab_simulation',
    'Lab and Simulation — ' + blueprint.title,
    'Turn knowledge into observable, logged performance.',
    blueprint.outcomes,
    blueprint.sourceClaimIds,
    {
      startingState: blueprint.baseline,
      permittedTools: blueprint.passport.authorizedTools,
      hiddenTransferVariantRequired: true,
      faultInjection: ['tool unavailable', 'conflicting source', 'approval boundary reached'],
      telemetry: ['actions', 'timestamps', 'retries', 'rework', 'exceptions', 'evidence references'],
      criticalFailureConditions: ['authority breach', 'unsupported claim', 'evidence fabrication', 'owner-control bypass'],
    },
  );
}

export function generateAssessmentRubric(
  blueprint: CapabilityBlueprint,
): MaterialArtifact {
  return artifact(
    'assessment_rubric',
    'Assessment and Reliability Rubric — ' + blueprint.title,
    'Measure capability elevation across quality, transfer, and reliability.',
    blueprint.outcomes,
    blueprint.sourceClaimIds,
    {
      weights: { practical: 0.4, exam: 0.4, reliability: 0.2 },
      passThreshold: 70,
      repeatedTrials: 3,
      transferVariantUnseen: true,
      dimensions: ['correctness', 'instruction adherence', 'tool discipline', 'provenance', 'robustness', 'fault tolerance'],
      hardGates: ['identity', 'authority', 'safety', 'provenance', 'owner control'],
      independentQaRequired: true,
    },
  );
}

export function generateRemediationPack(
  blueprint: CapabilityBlueprint,
): MaterialArtifact {
  return artifact(
    'remediation_pack',
    'Targeted Remediation Pack — ' + blueprint.title,
    'Convert observed failure evidence into focused improvement and re-test.',
    blueprint.outcomes,
    blueprint.sourceClaimIds,
    {
      requiredInputs: ['failed criterion', 'root-cause hypothesis', 'supporting run evidence'],
      outputs: ['focused drill', 'revised scholar note', 'alternate case', 'alternate lab', 'new holdout assessment'],
      sameCourseRegenerationForbidden: true,
      previousAttemptMustRemainInProvenance: true,
    },
  );
}

export function generateThesisViva(
  blueprint: CapabilityBlueprint,
): MaterialArtifact {
  return artifact(
    'thesis_viva',
    'Thesis and Viva — ' + blueprint.title,
    'Test original synthesis, transfer, defensibility, and deployment readiness.',
    blueprint.outcomes,
    blueprint.sourceClaimIds,
    {
      capstone: blueprint.capstone,
      defenceDimensions: ['originality', 'evidence', 'trade-offs', 'failure handling', 'authority boundaries', 'deployment readiness'],
      adversarialQuestionsRequired: 5,
      counterexampleRequired: true,
      conferralIsAutomatic: false,
    },
  );
}

export function generateFacultyQa(
  blueprint: CapabilityBlueprint,
): MaterialArtifact {
  return artifact(
    'faculty_qa',
    'Faculty QA Manifest — ' + blueprint.title,
    'Block polished but academically weak or unsafe materials.',
    blueprint.outcomes,
    blueprint.sourceClaimIds,
    {
      checks: [
        'outcome-practice-assessment alignment',
        'claim-level provenance coverage',
        'difficulty and prerequisites',
        'unseen transfer integrity',
        'memorization and leakage risk',
        'privacy, bias, and accessibility',
        'version and supersession lineage',
      ],
      decision: 'review_required',
    },
  );
}

export function generateEvidenceManifest(
  blueprint: CapabilityBlueprint,
): MaterialArtifact {
  return artifact(
    'evidence_manifest',
    'Evidence Manifest — ' + blueprint.title,
    'Define the auditable evidence required for assessment and Passport handoff review.',
    blueprint.outcomes,
    blueprint.sourceClaimIds,
    {
      required: [
        'baseline',
        'learning material references',
        'lab logs',
        'exam result',
        'repeated-trial result',
        'before-after delta',
        'QA conclusion',
        'certificate or remediation record',
      ],
      passportHandoff: 'owner_review_required',
    },
  );
}

export function generateCourseRelease(input: CourseReleaseRequest): CourseRelease {
  if (input.blueprint.passport.status !== 'eligible') {
    throw new GenerationError('passport_not_eligible', 'Course release requires an eligible Passport.');
  }

  const approved = requireApprovedClaims(input.sourceClaims);
  const approvedIds = new Set(approved.map((claim) => claim.id));
  const missing = input.blueprint.sourceClaimIds.filter((id) => !approvedIds.has(id));
  if (missing.length > 0) {
    throw new GenerationError('source_registry_mismatch', 'Blueprint references claims not approved in this release: ' + missing.join(', '));
  }

  const artifacts = [
    generateSourceRegistry(input.blueprint.outcomes, input.sourceClaims),
    generateScholarNote(input.blueprint.outcomes, input.blueprint.sourceClaimIds),
    generateDecisionCase(input.blueprint),
    generateLabSimulation(input.blueprint),
    generateAssessmentRubric(input.blueprint),
    generateRemediationPack(input.blueprint),
    generateThesisViva(input.blueprint),
    generateFacultyQa(input.blueprint),
    generateEvidenceManifest(input.blueprint),
  ];

  const kinds = new Set(artifacts.map((item) => item.kind));
  const checks = {
    approvedSourcesPresent: input.blueprint.sourceClaimIds.length > 0,
    everyOutcomeMapped: input.blueprint.outcomes.every((outcome) =>
      artifacts.every((item) => item.outcomeIds.includes(outcome.id))),
    completeBundle: kinds.size === 9,
    transferVariantPresent: true,
    hardGatesPresent: true,
    permissionRemainsOwnerControlled: true,
  };

  return {
    releaseId: 'release_' + randomUUID(),
    version: '1.0.0',
    createdAt: new Date().toISOString(),
    courseTitle: input.courseTitle,
    blueprintId: input.blueprint.blueprintId,
    status: 'qa_ready',
    artifacts,
    facultyQa: {
      approvedForCohortReview: Object.values(checks).every(Boolean),
      checks,
      hardGates: ['identity', 'authority', 'safety', 'provenance', 'owner control'],
    },
    permissionUnlock: {
      state: 'requires_owner_review',
      automatic: false,
    },
  };
}

export function decideEvidence(input: EvidenceDecisionInput) {
  const overallScore = Number((
    input.practicalScore * 0.4 +
    input.examScore * 0.4 +
    input.reliabilityScore * 0.2
  ).toFixed(2));
  const delta = Number((overallScore - input.baselineScore).toFixed(2));
  const passed =
    overallScore >= 70 &&
    input.evidenceComplete &&
    input.qaApproved &&
    input.criticalFailures.length === 0;

  return {
    overallScore,
    capabilityDelta: delta,
    result: passed ? 'PASS' : 'REMEDIATION_REQUIRED',
    activationEligible: passed,
    automaticActivation: false,
    passportHandoff: passed ? 'OWNER_REVIEW_REQUIRED' : 'BLOCKED',
    reasons: [
      ...(overallScore < 70 ? ['overall score below 70'] : []),
      ...(!input.evidenceComplete ? ['evidence incomplete'] : []),
      ...(!input.qaApproved ? ['independent QA not approved'] : []),
      ...input.criticalFailures.map((failure) => 'critical failure: ' + failure),
    ],
  };
}
