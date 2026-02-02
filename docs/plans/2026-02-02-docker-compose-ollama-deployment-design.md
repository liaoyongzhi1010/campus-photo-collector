# Docker Compose Ollama Deployment Design

**Goal:** Package the app into a linux/amd64 image tarball and deploy with docker-compose using a separate Ollama service and persistent data volumes.

**Context/Constraints:**
- Build host is arm64; deployment target is Ubuntu 22.04 x86_64.
- Image must be exported as a tar.gz in the project root.
- Data must live in volumes, not inside the app image.
- Ollama models must be stored in their own volume (not in the app image).

## Architecture
- Two services: `app` (Next.js API/UI) and `ollama` (model runtime).
- App talks to Ollama via internal Docker network using `OLLAMA_API_URL=http://ollama:11434/api/chat`.
- Default model set to `qwen2.5vl:3b`.
- Volumes:
  - `photo_data` -> `/app/data` (SQLite)
  - `photo_uploads` -> `/app/public/uploads` (user uploads)
  - `ollama_data` -> `/root/.ollama` (models)

## Build & Packaging
- Use `docker buildx build --platform linux/amd64` to create the app image on arm64.
- Export to tar and gzip in project root: `campus-photo-collector-amd64.tar.gz`.
- Do not embed models in the app image.

## Deployment Flow (High-level)
1. Fix local build errors so `npm run build` and Docker build succeed.
2. Build amd64 image and export tar.gz.
3. Transfer tar.gz + docker-compose.yml to the Ubuntu server.
4. Load image on server: `docker load -i campus-photo-collector-amd64.tar.gz`.
5. Start services with `docker compose up -d`.
6. Pull model in the `ollama` service or let Ollama auto-pull on first request.

## Risks / Notes
- AMD64 image is required for x86_64 Ubuntu; arm64 image will not run.
- CPU-only inference is slow; expect high CPU usage and multi-minute responses for large images.
- First inference may be slower due to model warmup.

## Verification
- `docker compose ps` shows both services healthy.
- App reachable on port 3000.
- `/api/analyze-photo` returns JSON (may be slow).
