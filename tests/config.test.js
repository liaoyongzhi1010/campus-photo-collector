const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const projectRoot = path.resolve(__dirname, '..');

test('Default Ollama model is qwen2.5vl:3b', () => {
  const routePath = path.join(projectRoot, 'app', 'api', 'analyze-photo', 'route.ts');
  const routeSource = fs.readFileSync(routePath, 'utf8');

  assert.match(
    routeSource,
    /OLLAMA_MODEL\s*=\s*process\.env\.OLLAMA_MODEL\s*\|\|\s*'qwen2\.5vl:3b'/,
    'Expected OLLAMA_MODEL default to be qwen2.5vl:3b'
  );
});

test('Bristol logo path points to a JPEG file', () => {
  const constantsPath = path.join(projectRoot, 'lib', 'constants.ts');
  const logoPath = path.join(projectRoot, 'public', 'bristol-logo.jpg');

  const constants = fs.readFileSync(constantsPath, 'utf8');
  assert.match(
    constants,
    /bristol:\s*'\/bristol-logo\.jpg'/,
    'Expected Bristol logo path to be /bristol-logo.jpg in lib/constants.ts'
  );

  const logoBytes = fs.readFileSync(logoPath);
  assert.ok(
    logoBytes.length > 3 &&
      logoBytes[0] === 0xff &&
      logoBytes[1] === 0xd8 &&
      logoBytes[2] === 0xff,
    'Expected public/bristol-logo.jpg to be a JPEG file'
  );
});

test('Home page uses UNIVERSITY_LOGOS mapping for university logos', () => {
  const pagePath = path.join(projectRoot, 'app', 'page.tsx');
  const pageSource = fs.readFileSync(pagePath, 'utf8');

  assert.match(
    pageSource,
    /UNIVERSITY_LOGOS\s*\[\s*university\s*\]/,
    'Expected home page to use UNIVERSITY_LOGOS[university] for logo src'
  );
});
