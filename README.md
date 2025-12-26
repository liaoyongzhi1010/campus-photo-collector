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

## Database

SQLite database at `data/photos.db`:

```sql
-- Schema
CREATE TABLE photos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  university TEXT NOT NULL,           -- 'xidian', 'xsyu', 'xaut', 'bristol'
  filename TEXT NOT NULL,             -- Server-side filename
  original_name TEXT NOT NULL,        -- User's original filename
  description TEXT,                   -- Optional description
  file_size INTEGER NOT NULL,         -- Bytes
  mime_type TEXT NOT NULL,            -- image/jpeg or image/png
  photo_time TEXT,                    -- dawn, morning, noon, afternoon, dusk, night
  photo_season TEXT,                  -- spring, summer, autumn, winter
  photo_weather TEXT,                 -- sunny, cloudy, overcast, rainy, snowy
  photo_location TEXT,                -- teaching, library, sports, dorm, cafeteria, etc.
  photo_style TEXT,                   -- landscape, architecture, night, aerial, etc.
  latitude REAL,                      -- GPS latitude from EXIF
  longitude REAL,                     -- GPS longitude from EXIF
  focal_length REAL,                  -- Camera focal length (mm)
  uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Query examples
SELECT COUNT(*) FROM photos;
SELECT * FROM photos WHERE university = 'xidian';
SELECT university, COUNT(*) FROM photos GROUP BY university;
```

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
