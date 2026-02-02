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
