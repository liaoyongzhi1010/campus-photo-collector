# Campus Photo Collector

A bilingual (EN/ZH) web application for collecting campus photos with AI-powered metadata analysis.

## Features

- **Multi-University Support** - Xidian, Xi'an Shiyou, Xi'an Tech, University of Bristol
- **AI Analysis** - GLM-4.6V-Flash vision model for automatic metadata tagging
- **Smart EXIF Extraction** - GPS coordinates and focal length auto-detection
- **Bilingual Interface** - Full English/Chinese support
- **Rich Metadata** - Time, season, weather, location, style tagging

## Quick Start

```bash
# 1. Load Docker image
gunzip -c campus-photo-collector-docker.tar.gz | docker load

# 2. Run container
docker run -d -p 3000:3000 --name campus-photo-collector \
  -e GLM_API_KEY="your_api_key_here" \
  -v photo_data:/app/data \
  -v photo_uploads:/app/public/uploads \
  --restart unless-stopped \
  campus-photo-collector:latest
```

Open [http://localhost:3000](http://localhost:3000)

## License

Research and educational purposes.
