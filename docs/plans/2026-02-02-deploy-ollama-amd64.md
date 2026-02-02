# Docker Compose Ollama Deployment Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a linux/amd64 image tarball for the app and deploy via docker-compose with a separate Ollama service and persistent volumes.

**Architecture:** Two services (`app`, `ollama`) with internal networking. App persists data and uploads in volumes. Ollama stores models in its own volume and is accessed via `OLLAMA_API_URL`.

**Tech Stack:** Next.js 15, Docker/Docker Compose, Ollama, Node.js 20.

---

### Task 1: Capture the current failing build (baseline)

**Files:** none

**Step 1: Run the build to capture the failure**

Run: `npm run build`

Expected: FAIL with ESLint config import error and TypeScript index error in `app/upload/page.tsx`.

---

### Task 2: Fix ESLint config import paths

**Files:**
- Modify: `eslint.config.mjs`

**Step 1: Write the failing test (lint)**

Run: `npm run lint`

Expected: FAIL with `Cannot find module 'eslint-config-next/core-web-vitals'`.

**Step 2: Write minimal implementation**

Change imports to include `.js` extension:

```js
import nextVitals from "eslint-config-next/core-web-vitals.js";
import nextTs from "eslint-config-next/typescript.js";
```

**Step 3: Verify green**

Run: `npm run lint`

Expected: PASS.

**Step 4: Commit**

```bash
git add eslint.config.mjs
git commit -m "fix: correct eslint-config-next import paths"
```

---

### Task 3: Upgrade Next.js to address security advisories

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`

**Step 1: Write the failing test (audit)**

Run: `npm audit --production`

Expected: FAIL with high severity advisories for `next`.

**Step 2: Write minimal implementation**

Run:
```bash
npm install next@15.5.11 eslint-config-next@15.5.11
```

**Step 3: Verify green**

Run: `npm audit --production`

Expected: No high severity vulnerabilities for `next`.

**Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: upgrade next to 15.5.11"
```

---

### Task 4: Fix TypeScript indexing in upload page

**Files:**
- Modify: `app/upload/page.tsx`

**Step 1: Write the failing test (build)**

Run: `npm run build`

Expected: FAIL with TS error for `UNIVERSITY_NAMES[university]`.

**Step 2: Write minimal implementation**

Update both logo `alt` attributes in `app/upload/page.tsx` to:

```tsx
alt={`${UNIVERSITY_NAMES[language][university]} Logo`}
```

**Step 3: Verify green**

Run: `npm run build`

Expected: PASS (or at least the TS error is gone).

**Step 4: Commit**

```bash
git add app/upload/page.tsx
git commit -m "fix: correct university name indexing in upload page"
```

---

### Task 5: Set Ollama default model to qwen2.5vl:3b

**Files:**
- Modify: `app/api/analyze-photo/route.ts`
- (Optional) Modify: `.env.example`
- Create: `tests/config.test.js` (if not already present in this worktree)

**Step 1: Write the failing test**

Create or update `tests/config.test.js` to assert the default model string:

```js
assert.match(routeSource, /OLLAMA_MODEL\\s*=\\s*process\\.env\\.OLLAMA_MODEL\\s*\\|\\|\\s*'qwen2\\.5vl:3b'/);
```

Run: `node --test tests/config.test.js`

Expected: FAIL.

**Step 2: Write minimal implementation**

Change default model:

```ts
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'qwen2.5vl:3b';
```

Optionally add to `.env.example`:
```
OLLAMA_API_URL=http://ollama:11434/api/chat
OLLAMA_MODEL=qwen2.5vl:3b
```

**Step 3: Verify green**

Run: `node --test tests/config.test.js`

Expected: PASS.

**Step 4: Commit**

```bash
git add app/api/analyze-photo/route.ts .env.example tests/config.test.js
git commit -m "chore: default Ollama model to qwen2.5vl:3b"
```

---

### Task 6: Ensure Bristol logo uses correct file type (if not already in this worktree)

**Files:**
- Rename: `public/bristol-logo.webp` -> `public/bristol-logo.jpg`
- Modify: `lib/constants.ts`
- Modify: `app/page.tsx`
- Update: `tests/config.test.js`

**Step 1: Write the failing test**

Add assertions to `tests/config.test.js`:

```js
assert.match(constants, /bristol:\\s*'\\/bristol-logo\\.jpg'/);
```

Run: `node --test tests/config.test.js`

Expected: FAIL.

**Step 2: Write minimal implementation**

- Rename file to `.jpg`
- Update `UNIVERSITY_LOGOS.bristol` to `/bristol-logo.jpg`
- Update home page logo src to `UNIVERSITY_LOGOS[university]`

**Step 3: Verify green**

Run: `node --test tests/config.test.js`

Expected: PASS.

**Step 4: Commit**

```bash
git add public/bristol-logo.jpg lib/constants.ts app/page.tsx tests/config.test.js
git rm public/bristol-logo.webp
git commit -m "fix: align Bristol logo filename with file type"
```

---

### Task 7: Rewrite docker-compose for app + ollama services

**Files:**
- Modify: `docker-compose.yml`

**Step 1: Write the failing test**

Run: `docker compose config`

Expected: PASS only after file is valid.

**Step 2: Write minimal implementation**

Replace `docker-compose.yml` with:

```yaml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: campus-photo-collector
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - OLLAMA_API_URL=http://ollama:11434/api/chat
      - OLLAMA_MODEL=qwen2.5vl:3b
    volumes:
      - photo_data:/app/data
      - photo_uploads:/app/public/uploads
    depends_on:
      - ollama
    restart: unless-stopped

  ollama:
    image: ollama/ollama:latest
    container_name: ollama
    volumes:
      - ollama_data:/root/.ollama
    restart: unless-stopped

volumes:
  photo_data:
    driver: local
  photo_uploads:
    driver: local
  ollama_data:
    driver: local
```

**Step 3: Verify green**

Run: `docker compose config`

Expected: PASS (no errors).

**Step 4: Commit**

```bash
git add docker-compose.yml
git commit -m "chore: split app and ollama services with persistent volumes"
```

---

### Task 8: Update README with amd64 build + deployment steps

**Files:**
- Modify: `README.md`

**Step 1: Write the failing test**

None (doc update).

**Step 2: Write minimal implementation**

Add a section describing:
- Build amd64 image using buildx
- Export to `campus-photo-collector-amd64.tar.gz`
- `docker load` on server
- `docker compose up -d`
- `ollama pull qwen2.5vl:3b` on server (or let it auto-pull)

**Step 3: Commit**

```bash
git add README.md
git commit -m "docs: add amd64 image build and ollama deployment steps"
```

---

### Task 9: Build amd64 image and export tar.gz

**Files:** none (build artifact in project root)

**Step 1: Build amd64 image**

Run:
```bash
docker buildx build --platform linux/amd64 -t campus-photo-collector:amd64 --load .
```

Expected: Build success.

**Step 2: Export tar.gz**

Run:
```bash
docker save campus-photo-collector:amd64 | gzip > campus-photo-collector-amd64.tar.gz
```

Expected: `campus-photo-collector-amd64.tar.gz` present in repo root.

**Step 3: (Optional) Verify archive**

Run: `ls -lh campus-photo-collector-amd64.tar.gz`

---

### Task 10: Final verification

**Files:** none

**Step 1: Verify build**

Run: `npm run build`

Expected: PASS.

**Step 2: Verify compose**

Run: `docker compose config`

Expected: PASS.

---
