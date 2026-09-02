import express, { type Response } from 'express';
import { randomUUID } from 'node:crypto';
import {
  CapabilityBlueprintRequestSchema,
  CourseReleaseRequestSchema,
  EvidenceDecisionInputSchema,
} from './contracts.js';
import {
  GenerationError,
  decideEvidence,
  generateCapabilityBlueprint,
  generateCourseRelease,
} from './generators.js';

const app = express();
app.use(express.json({ limit: '512kb' }));

const sessions = new Map<string, Response>();

function failure(error: unknown) {
  if (error instanceof GenerationError) {
    return { status: 422, body: { error: error.code, message: error.message } };
  }
  return { status: 500, body: { error: 'generation_failed', message: 'Material generation failed.' } };
}

app.get('/health', (_req, res) => res.json({
  ok: true,
  service: 's-agentic-university',
  version: '2.0.0',
  transport: 'http+sse',
  materialStandard: 'case-lab-viva',
}));

app.post('/api/capability-blueprints/generate', (req, res) => {
  const parsed = CapabilityBlueprintRequestSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'invalid_blueprint_request', issues: parsed.error.issues });
  try {
    return res.status(201).json(generateCapabilityBlueprint(parsed.data));
  } catch (error) {
    const result = failure(error);
    return res.status(result.status).json(result.body);
  }
});

app.post('/api/course-releases/generate', (req, res) => {
  const parsed = CourseReleaseRequestSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'invalid_release_request', issues: parsed.error.issues });
  try {
    return res.status(201).json(generateCourseRelease(parsed.data));
  } catch (error) {
    const result = failure(error);
    return res.status(result.status).json(result.body);
  }
});

app.post('/api/evidence/decide', (req, res) => {
  const parsed = EvidenceDecisionInputSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'invalid_evidence_request', issues: parsed.error.issues });
  return res.json(decideEvidence(parsed.data));
});

app.post('/api/courses/generate', (_req, res) => res.status(409).json({
  error: 'evidence_contract_required',
  message: 'Ungrounded topic-only generation is disabled. Generate a capability blueprint, then a course release.',
  migrateTo: ['/api/capability-blueprints/generate', '/api/course-releases/generate'],
}));

const toolDefinitions = [
  {
    name: 'generate_capability_blueprint',
    description: 'Create an evidence-first capability blueprint for an eligible passported agent.',
    inputSchema: { type: 'object', required: ['passport', 'title', 'degreePath', 'liveWorkClass', 'outcomes', 'baseline', 'riskTier', 'sourceClaims'] },
  },
  {
    name: 'generate_course_release',
    description: 'Generate the complete S/ Case-Lab-Viva material bundle from an approved blueprint and source registry.',
    inputSchema: { type: 'object', required: ['courseTitle', 'blueprint', 'sourceClaims'] },
  },
  {
    name: 'decide_evidence',
    description: 'Apply the frozen 70% plus independent-QA evidence gate without automatic activation.',
    inputSchema: { type: 'object', required: ['baselineScore', 'practicalScore', 'examScore', 'reliabilityScore', 'evidenceComplete', 'qaApproved'] },
  },
];

app.get('/mcp/sse', (req, res) => {
  const sessionId = randomUUID();
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache, no-transform',
    Connection: 'keep-alive',
    'X-Accel-Buffering': 'no',
  });
  sessions.set(sessionId, res);
  res.write('event: endpoint\ndata: /mcp/messages?sessionId=' + sessionId + '\n\n');
  res.write('event: ready\ndata: ' + JSON.stringify({ sessionId, server: 's-agentic-university' }) + '\n\n');
  req.on('close', () => sessions.delete(sessionId));
});

app.post('/mcp/messages', (req, res) => {
  const sessionId = String(req.query.sessionId || '');
  const stream = sessions.get(sessionId);
  if (!stream) return res.status(404).json({ error: 'mcp_session_not_found' });

  const msg = req.body as { id?: string | number; method?: string; params?: { name?: string; arguments?: unknown } };
  let result: unknown;

  try {
    if (msg.method === 'initialize') {
      result = {
        protocolVersion: '2024-11-05',
        capabilities: { tools: {} },
        serverInfo: { name: 's-agentic-university', version: '2.0.0' },
      };
    } else if (msg.method === 'tools/list') {
      result = { tools: toolDefinitions };
    } else if (msg.method === 'tools/call') {
      if (msg.params?.name === 'generate_capability_blueprint') {
        const parsed = CapabilityBlueprintRequestSchema.parse(msg.params.arguments);
        result = { content: [{ type: 'text', text: JSON.stringify(generateCapabilityBlueprint(parsed)) }] };
      } else if (msg.params?.name === 'generate_course_release') {
        const parsed = CourseReleaseRequestSchema.parse(msg.params.arguments);
        result = { content: [{ type: 'text', text: JSON.stringify(generateCourseRelease(parsed)) }] };
      } else if (msg.params?.name === 'decide_evidence') {
        const parsed = EvidenceDecisionInputSchema.parse(msg.params.arguments);
        result = { content: [{ type: 'text', text: JSON.stringify(decideEvidence(parsed)) }] };
      } else {
        result = { isError: true, content: [{ type: 'text', text: 'Unknown material-generation tool.' }] };
      }
    } else {
      result = { isError: true, content: [{ type: 'text', text: 'Unsupported method: ' + (msg.method || 'unknown') }] };
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Invalid tool request';
    result = { isError: true, content: [{ type: 'text', text: message }] };
  }

  stream.write('event: message\ndata: ' + JSON.stringify({ jsonrpc: '2.0', id: msg.id ?? null, result }) + '\n\n');
  return res.status(202).json({ accepted: true });
});

const port = Number(process.env.PORT || 8787);
app.listen(port, () => console.log('s-agentic-university listening on ' + port));
