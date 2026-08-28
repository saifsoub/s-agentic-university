import { z } from 'zod';

export const RiskTierSchema = z.enum(['low', 'moderate', 'high', 'critical']);
export const ClaimStatusSchema = z.enum(['approved', 'hypothesis', 'rejected']);

export const SourceClaimSchema = z.object({
  id: z.string().min(1),
  statement: z.string().min(3),
  status: ClaimStatusSchema,
  confidence: z.number().min(0).max(1),
  source: z.object({
    title: z.string().min(1),
    url: z.string().url(),
    locator: z.string().min(1),
    accessedAt: z.string().datetime(),
  }),
  limitations: z.array(z.string()).default([]),
});

export const PassportContextSchema = z.object({
  passportId: z.string().min(1),
  agentId: z.string().min(1),
  role: z.string().min(2),
  ownerId: z.string().min(1),
  status: z.enum(['eligible', 'ineligible', 'suspended']),
  authorizedTools: z.array(z.string()).default([]),
});

export const LearningOutcomeSchema = z.object({
  id: z.string().min(1),
  statement: z.string().min(5),
  performanceVerb: z.string().min(2),
  critical: z.boolean().default(false),
});

export const BaselineSchema = z.object({
  task: z.string().min(5),
  score: z.number().min(0).max(100),
  observedFailures: z.array(z.string()).default([]),
});

export const CapabilityBlueprintRequestSchema = z.object({
  passport: PassportContextSchema,
  title: z.string().min(3),
  degreePath: z.enum(['B.Ag', 'M.Ag', 'D.Ag']),
  liveWorkClass: z.string().min(2),
  outcomes: z.array(LearningOutcomeSchema).min(1).max(12),
  baseline: BaselineSchema,
  riskTier: RiskTierSchema,
  sourceClaims: z.array(SourceClaimSchema).min(1),
});

export const CapabilityBlueprintSchema = z.object({
  blueprintId: z.string().min(1),
  version: z.literal('1.0.0'),
  createdAt: z.string().datetime(),
  passport: PassportContextSchema,
  title: z.string(),
  degreePath: z.enum(['B.Ag', 'M.Ag', 'D.Ag']),
  liveWorkClass: z.string(),
  outcomes: z.array(LearningOutcomeSchema),
  baseline: BaselineSchema,
  riskTier: RiskTierSchema,
  sourceClaimIds: z.array(z.string()).min(1),
  prerequisiteGraph: z.array(z.object({
    outcomeId: z.string(),
    dependsOn: z.array(z.string()),
  })),
  capstone: z.object({
    prompt: z.string(),
    evidenceRequirements: z.array(z.string()).min(1),
  }),
  permissionRule: z.literal('owner_review_required'),
});

export const ArtifactKindSchema = z.enum([
  'source_registry',
  'scholar_note',
  'decision_case',
  'lab_simulation',
  'assessment_rubric',
  'remediation_pack',
  'thesis_viva',
  'faculty_qa',
  'evidence_manifest',
]);

export const MaterialArtifactSchema = z.object({
  artifactId: z.string(),
  kind: ArtifactKindSchema,
  version: z.literal('1.0.0'),
  title: z.string(),
  purpose: z.string(),
  outcomeIds: z.array(z.string()),
  sourceClaimIds: z.array(z.string()),
  content: z.record(z.string(), z.unknown()),
});

export const CourseReleaseRequestSchema = z.object({
  courseTitle: z.string().min(3),
  blueprint: CapabilityBlueprintSchema,
  sourceClaims: z.array(SourceClaimSchema).min(1),
});

export const CourseReleaseSchema = z.object({
  releaseId: z.string(),
  version: z.literal('1.0.0'),
  createdAt: z.string().datetime(),
  courseTitle: z.string(),
  blueprintId: z.string(),
  status: z.literal('qa_ready'),
  artifacts: z.array(MaterialArtifactSchema),
  facultyQa: z.object({
    approvedForCohortReview: z.boolean(),
    checks: z.record(z.string(), z.boolean()),
    hardGates: z.array(z.string()),
  }),
  permissionUnlock: z.object({
    state: z.literal('requires_owner_review'),
    automatic: z.literal(false),
  }),
});

export const EvidenceDecisionInputSchema = z.object({
  baselineScore: z.number().min(0).max(100),
  practicalScore: z.number().min(0).max(100),
  examScore: z.number().min(0).max(100),
  reliabilityScore: z.number().min(0).max(100),
  evidenceComplete: z.boolean(),
  qaApproved: z.boolean(),
  criticalFailures: z.array(z.string()).default([]),
});

export type SourceClaim = z.infer<typeof SourceClaimSchema>;
export type PassportContext = z.infer<typeof PassportContextSchema>;
export type LearningOutcome = z.infer<typeof LearningOutcomeSchema>;
export type CapabilityBlueprintRequest = z.infer<typeof CapabilityBlueprintRequestSchema>;
export type CapabilityBlueprint = z.infer<typeof CapabilityBlueprintSchema>;
export type MaterialArtifact = z.infer<typeof MaterialArtifactSchema>;
export type CourseReleaseRequest = z.infer<typeof CourseReleaseRequestSchema>;
export type CourseRelease = z.infer<typeof CourseReleaseSchema>;
export type EvidenceDecisionInput = z.infer<typeof EvidenceDecisionInputSchema>;
