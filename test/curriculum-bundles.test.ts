import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const courseIds = ['S_A_U-REASONING_001-The_S_Way', 'VT-102', 'VT-103', 'VT-201'];
const requiredSections = [
  '## Capability outcome',
  '## Observable learning outcomes',
  '## Learning sequence',
  '## Applied lab',
  '## Holdout transfer task',
  '## Assessment rubric',
  '## Remediation',
  '## Evidence manifest',
];

const requiredReleaseSections = [
  '## Scholar note',
  '## Decision case',
  '## Lab simulation',
  '## Exam and rubric',
  '## Remediation pack',
  '## Transfer task and viva',
  '## Evidence manifest',
];

for (const courseId of courseIds) {
  test(courseId + ' is a complete, evidence-gated curriculum bundle', async () => {
    const content = await readFile(new URL('../curriculum/visioning/' + courseId + '.md', import.meta.url), 'utf8');
    assert.match(content, new RegExp('^# ' + courseId + ' —', 'm'));
    assert.match(content, /Authoring worker passport: `\/root\/university_curriculum`/);
    assert.match(content, /Status: `FACULTY_QA_READY`/);
    assert.match(content, /Critical failures:/);
    for (const section of requiredSections) assert.ok(content.includes(section), courseId + ' missing ' + section);
  });

  test(courseId + ' has a concrete generated release bundle', async () => {
    const content = await readFile(new URL('../curriculum/visioning/releases/' + courseId + '-RELEASE.md', import.meta.url), 'utf8');
    assert.match(content, new RegExp('^# ' + courseId + ' Generated Release Bundle', 'm'));
    for (const section of requiredReleaseSections) assert.ok(content.includes(section), courseId + ' release missing ' + section);
    assert.doesNotMatch(content, /\b(?:TBD|TODO|FIXME|lorem ipsum)\b/i);
  });
}

test('program manifest links every course and preserves the certification gate', async () => {
  const content = await readFile(new URL('../curriculum/visioning/README.md', import.meta.url), 'utf8');
  for (const courseId of courseIds) assert.ok(content.includes('./' + courseId + '.md'));
  for (const courseId of courseIds) assert.ok(content.includes('./releases/' + courseId + '-RELEASE.md'));
  assert.match(content, /no PASS result from course completion alone/i);
  assert.match(content, /weighted score of at least 70%/i);
});

test('QA report records zero unresolved curriculum gaps while preserving the enrollment blocker', async () => {
  const content = await readFile(new URL('../curriculum/visioning/QA_REPORT.md', import.meta.url), 'utf8');
  assert.match(content, /Missing curriculum artifacts: 0/);
  assert.match(content, /Duplicate course IDs: 0/);
  assert.match(content, /Unresolved filler markers: 0/);
  assert.match(content, /Passport roster contains zero records/);
});


test('S_A_U-REASONING_001-The_S_Way preserves its registered identity and authorship', async () => {
  const content = await readFile(new URL('../curriculum/visioning/S_A_U-REASONING_001-The_S_Way.md', import.meta.url), 'utf8');
  assert.ok(content.includes('Curriculum ID: `S_A_U-REASONING_001-The_S_Way`'));
  assert.ok(content.includes('By: `Dr.GPT-5.6_Sol`'));
  assert.ok(content.includes('Designation: `The S/Thinking_&_Brainstorming_Partner`'));
});
