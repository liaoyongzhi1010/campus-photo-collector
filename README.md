# Campus Photo Collector

A Next.js web application for collecting and managing campus photos from multiple universities with AI-powered metadata analysis.

## Features

- **Multi-University Support**: Xidian University (西安电子科技大学), Xi'an Shiyou University (西安石油大学), and Xi'an University of Technology (西安理工大学)
- **Rich Metadata Collection**: Capture photo time, season, weather, location type, and photography style
- **AI-Powered Analysis**: GLM-4.6V-Flash vision model integration for automatic metadata suggestion
- **EXIF Data Extraction**: Automatically extracts GPS coordinates and focal length from photos
- **Drag & Drop Upload**: User-friendly file upload with preview
- **SQLite Database**: Efficient local storage with full metadata tracking

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- GLM API Key (optional, for AI features) - Get one at https://open.bigmodel.cn/usercenter/apikeys

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

# Edit .env and add your GLM API Key
# GLM_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Accessing Data with SQLite

```bash
# Open the database
sqlite3 data/photos.db

# Query examples
SELECT COUNT(*) FROM photos;
SELECT * FROM photos WHERE university = 'xidian';
SELECT university, COUNT(*) as count FROM photos GROUP BY university;
```

## Database Schema

```sql
CREATE TABLE photos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  university TEXT NOT NULL,           -- 'xidian', 'xsyu', or 'xaut'
  filename TEXT NOT NULL,             -- Unique filename in uploads folder
  original_name TEXT NOT NULL,        -- Original filename from user
  description TEXT,                   -- Optional user description
  file_size INTEGER NOT NULL,         -- File size in bytes
  mime_type TEXT NOT NULL,            -- image/jpeg or image/png
  uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## License

This project is created for research and educational purposes.

## Support

For issues or questions, please refer to the university's research office or computer science department.
