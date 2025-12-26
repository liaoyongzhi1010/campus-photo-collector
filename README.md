# Campus Photo Collector

A bilingual (EN/ZH) web application for collecting campus photos with AI-powered metadata analysis.

## Features

- 🎓 **Multi-University Support** - Xidian, Xi'an Shiyou, Xi'an Tech, University of Bristol
- 🤖 **AI Analysis** - GLM-4.6V-Flash vision model for automatic metadata tagging
- 📸 **Smart EXIF Extraction** - GPS coordinates and focal length auto-detection
- 🌐 **Bilingual Interface** - Full English/Chinese support
- 🎨 **Rich Metadata** - Time, season, weather, location, style tagging

## Quick Start

```bash
# Install dependencies
npm install

# Set up environment (optional - for AI features)
cp .env.example .env
# Edit .env and add your GLM API key from https://open.bigmodel.cn/usercenter/apikeys

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Docker Deployment

```bash
# Build image
docker build -t campus-photo-collector .

# Run container
docker run -p 3000:3000 -v $(pwd)/data:/app/data -v $(pwd)/public/uploads:/app/public/uploads campus-photo-collector
```

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS 4
- **Backend**: Next.js API Routes, SQLite with better-sqlite3
- **AI**: GLM-4.6V-Flash vision model
- **Deployment**: Docker, Node.js 20

## License

Research and educational purposes.
