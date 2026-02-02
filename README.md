# Campus Photo Collector

A Next.js web application for collecting and managing campus photos from multiple universities with AI-powered metadata analysis.

## Features

- **Multi-University Support**: Xidian University (西安电子科技大学), Xi'an Shiyou University (西安石油大学), Xi'an University of Technology (西安理工大学), and University of Bristol (布里斯托大学)
- **Rich Metadata Collection**: Capture photo time, season, weather, location type, and photography style
- **AI-Powered Analysis**: Local Ollama vision model integration for automatic metadata suggestion
- **EXIF Data Extraction**: Automatically extracts GPS coordinates and focal length from photos
- **Drag & Drop Upload**: User-friendly file upload with preview
- **SQLite Database**: Efficient local storage with full metadata tracking

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Ollama (optional, for AI features)

### Installation

1. Clone or navigate to the project directory:
```bash
cd campus-photo-collector
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables (optional):
```bash
# Copy the example file
cp .env.example .env

# Edit .env and set Ollama parameters if needed
# OLLAMA_API_URL=http://localhost:11434/api/chat
# OLLAMA_MODEL=qwen2.5vl:3b
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Docker Deployment (amd64 image for x86_64 Ubuntu)

Build the amd64 image on this machine (arm64) and export it:
```bash
docker buildx build --platform linux/amd64 -t campus-photo-collector:amd64 --load .
docker save campus-photo-collector:amd64 | gzip > campus-photo-collector-amd64.tar.gz
```

Copy `campus-photo-collector-amd64.tar.gz` and `docker-compose.yml` to your Ubuntu server, then:
```bash
docker load -i campus-photo-collector-amd64.tar.gz
docker compose up -d
docker compose exec ollama ollama pull qwen2.5vl:3b
```

Open [http://localhost:3000](http://localhost:3000) in your browser

## License

Research and educational purposes.
