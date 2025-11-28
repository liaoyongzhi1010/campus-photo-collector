# Campus Photo Collector

An English web application for collecting campus photos from Xidian University (西安电子科技大学) and Xi'an Shiyou University (西安石油大学).

## Features

- **No Login Required**: Anonymous photo upload - no user accounts needed
- **Multi-Upload Support**: Upload multiple photos at once
- **Optional Descriptions**: Add descriptions to photos (optional)
- **Mobile Responsive**: Fully functional on mobile devices
- **Two Universities**: Support for Xidian University and Xi'an Shiyou University
- **Complete Legal Pages**: Includes Privacy Policy, Terms of Service, and Photography Guidelines
- **Local Storage**: All data stored locally (SQLite database + local file system)

## Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Styling**: Tailwind CSS
- **Database**: SQLite (better-sqlite3)
- **Language**: TypeScript
- **Storage**: Local file system

## Project Structure

```
campus-photo-collector/
├── app/
│   ├── api/
│   │   └── upload/
│   │       └── route.ts          # API endpoint for photo uploads
│   ├── guidelines/
│   │   └── page.tsx               # Photography guidelines page
│   ├── privacy/
│   │   └── page.tsx               # Privacy policy page
│   ├── terms/
│   │   └── page.tsx               # Terms of service page
│   ├── upload/
│   │   └── page.tsx               # Photo upload page
│   ├── layout.tsx
│   └── page.tsx                   # Home page
├── lib/
│   └── db.ts                      # SQLite database configuration
├── data/
│   └── photos.db                  # SQLite database (created automatically)
├── public/
│   └── uploads/                   # Uploaded photos storage
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone or navigate to the project directory:
```bash
cd campus-photo-collector
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
# Build the application
npm run build

# Start the production server
npm start
```

## Usage

### For Users

1. **Select University**: On the home page, choose either Xidian University or Xi'an Shiyou University
2. **Upload Photos**:
   - Click or drag-and-drop to select multiple photos (PNG, JPG, JPEG)
   - Maximum file size: 10MB per photo
   - Add optional descriptions for each photo
3. **Submit**: Click "Upload" to submit your photos
4. **Review Guidelines**: Check the Photography Guidelines page for best practices

### For Administrators

Since there's no admin panel, you can access the data directly:

1. **Database**: Located at `data/photos.db`
   - Use SQLite tools to query and manage photo metadata
   - Schema: `photos` table with fields: id, university, filename, original_name, description, file_size, mime_type, uploaded_at

2. **Photos**: Located in `public/uploads/`
   - Photos are stored with unique filenames: `{university}_{timestamp}_{random}.{ext}`

### Accessing Data with SQLite

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
  university TEXT NOT NULL,           -- 'xidian' or 'xsyu'
  filename TEXT NOT NULL,             -- Unique filename in uploads folder
  original_name TEXT NOT NULL,        -- Original filename from user
  description TEXT,                   -- Optional user description
  file_size INTEGER NOT NULL,         -- File size in bytes
  mime_type TEXT NOT NULL,            -- image/jpeg or image/png
  uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## Configuration

### File Upload Limits

Edit `app/api/upload/route.ts` to change:
- `MAX_FILE_SIZE`: Default 10MB (10 * 1024 * 1024)
- `ALLOWED_TYPES`: Default ['image/jpeg', 'image/jpg', 'image/png']

### Universities

To add or modify universities, edit:
- `app/page.tsx`: University cards on home page
- `app/upload/page.tsx`: `UNIVERSITY_NAMES` constant
- `app/api/upload/route.ts`: University validation

## Mobile Support

The application is fully responsive and optimized for mobile devices:
- Touch-friendly upload interface
- Responsive navigation
- Mobile-optimized layouts
- Works on iOS and Android browsers

## Security Considerations

1. **No User Authentication**: This is by design - no login required means no personal data collected
2. **File Validation**: Only accepts image files (PNG, JPG, JPEG) up to 10MB
3. **Privacy**: No IP addresses, cookies, or tracking
4. **Local Storage**: All data stays on your server

## Backup

Regularly backup:
1. Database: `data/photos.db`
2. Photos: `public/uploads/` directory

Example backup script:
```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
tar -czf backup_$DATE.tar.gz data/ public/uploads/
```

## Troubleshooting

### Database Permission Issues
```bash
chmod 755 data/
chmod 644 data/photos.db
```

### Upload Directory Issues
```bash
mkdir -p public/uploads
chmod 755 public/uploads
```

### Port Already in Use
Change the port in `package.json`:
```json
"dev": "next dev -p 3001"
```

## License

This project is created for research and educational purposes.

## Support

For issues or questions, please refer to the university's research office or computer science department.
