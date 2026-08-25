import express from 'express';
import { randomUUID } from 'node:crypto';
import { z } from 'zod';

const app = express();
app.use(express.json({ limit: '256kb' }));

const CourseInput = z.object({
  topic: z.string().min(3),
  level: z.enum(['foundation', 'intermediate', 'advanced']).default('intermediate'),
  outcomes: z.array(z.string().min(2)).max(8).default([]),
  lessons: z.number().int().min(3).max(12).default(6),
});

type Course = z.infer<typeof CourseInput> & { id: string; title: string; modules: Array<{ order: number; title: string; objective: string; assessment: string }> };

function generateCourse(input: z.infer<typeof CourseInput>): Course {
  const outcomes = input.outcomes.length ? input.outcomes : [
    `Explain the core concepts of ${input.topic}`,
    `Apply ${input.topic} in a realistic agent workflow`,
    `Evaluate quality, safety, and performance tradeoffs in ${input.topic}`,
  ];
  const stages = ['Foundations', 'Operating Model', 'Guided Practice', 'Applied Build', 'Evaluation', 'Production Readiness', 'Optimization', 'Capstone', 'Review', 'Certification', 'Deployment', 'Continuous Improvement'];
  const modules = Array.from({ length: input.lessons }, (_, index) => ({
    order: index + 1,
    title: `${stages[index]}: ${input.topic}`,
    objective: outcomes[index % outcomes.length],
    assessment: index === input.lessons - 1 ? 'Capstone evidence review and grant-verification checkpoint' : 'Scenario task plus observable evidence submission',
  }));
  return { ...input, id: `course_${randomUUID()}`, title: `${input.topic} — ${input.level}`, modules };
}

const sessions = new Map<string, express.Response>();

app.get('/health', (_req, res) => res.json({ ok: true, service: 's-agentic-university', transport: 'http+sse' }));

app.post('/api/courses/generate', (req, res) => {
  const parsed = CourseInput.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'invalid_course_request', issues: parsed.error.issues });
  return res.status(201).json(generateCourse(parsed.data));
});

app.get('/mcp/sse', (req, res) => {
  const sessionId = randomUUID();
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache, no-transform',
    Connection: 'keep-alive',
    'X-Accel-Buffering': 'no',
  });
  sessions.set(sessionId, res);
  res.write(`event: endpoint\ndata: /mcp/messages?sessionId=${sessionId}\n\n`);
  res.write(`event: ready\ndata: ${JSON.stringify({ sessionId, server: 's-agentic-university' })}\n\n`);
  req.on('close', () => sessions.delete(sessionId));
});

app.post('/mcp/messages', (req, res) => {
  const sessionId = String(req.query.sessionId || '');
  const stream = sessions.get(sessionId);
  if (!stream) return res.status(404).json({ error: 'mcp_session_not_found' });
  const msg = req.body as { jsonrpc?: string; id?: string | number; method?: string; params?: any };
  let result: unknown;
  if (msg.method === 'initialize') {
    result = { protocolVersion: '2024-11-05', capabilities: { tools: {} }, serverInfo: { name: 's-agentic-university', version: '1.0.0' } };
  } else if (msg.method === 'tools/list') {
    result = { tools: [{ name: 'generate_course', description: 'Generate a structured agent course', inputSchema: { type: 'object', required: ['topic'], properties: { topic: { type: 'string' }, level: { enum: ['foundation', 'intermediate', 'advanced'] }, lessons: { type: 'integer', minimum: 3, maximum: 12 }, outcomes: { type: 'array', items: { type: 'string' } } } } }] };
  } else if (msg.method === 'tools/call' && msg.params?.name === 'generate_course') {
    const parsed = CourseInput.safeParse(msg.params.arguments || {});
    result = parsed.success ? { content: [{ type: 'text', text: JSON.stringify(generateCourse(parsed.data)) }] } : { isError: true, content: [{ type: 'text', text: 'Invalid course request' }] };
  } else {
    result = { isError: true, content: [{ type: 'text', text: `Unsupported method: ${msg.method || 'unknown'}` }] };
  }
  stream.write(`event: message\ndata: ${JSON.stringify({ jsonrpc: '2.0', id: msg.id ?? null, result })}\n\n`);
  return res.status(202).json({ accepted: true });
});

const port = Number(process.env.PORT || 8787);
app.listen(port, () => console.log(`s-agentic-university listening on ${port}`));
