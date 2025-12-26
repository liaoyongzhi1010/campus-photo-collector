import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const dbDir = path.join(process.cwd(), 'data');
const dbPath = path.join(dbDir, 'photos.db');

// Ensure data directory exists
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// Singleton database instance
let db: Database.Database | null = null;

const getDatabase = (): Database.Database => {
  if (!db) {
    db = new Database(dbPath);
    // Enable WAL mode for better concurrent access
    db.pragma('journal_mode = WAL');

    // Initialize database schema
    db.exec(`
      CREATE TABLE IF NOT EXISTS photos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        university TEXT NOT NULL,
        filename TEXT NOT NULL,
        original_name TEXT NOT NULL,
        description TEXT,
        file_size INTEGER NOT NULL,
        mime_type TEXT NOT NULL,
        uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Migration: Add new columns if they don't exist
    const columns = (db.pragma('table_info(photos)') as Array<{ name: string }>).map((col) => col.name);

    if (!columns.includes('photo_time')) {
      db.exec('ALTER TABLE photos ADD COLUMN photo_time TEXT');
    }
    if (!columns.includes('photo_season')) {
      db.exec('ALTER TABLE photos ADD COLUMN photo_season TEXT');
    }
    if (!columns.includes('photo_weather')) {
      db.exec('ALTER TABLE photos ADD COLUMN photo_weather TEXT');
    }
    if (!columns.includes('photo_location')) {
      db.exec('ALTER TABLE photos ADD COLUMN photo_location TEXT');
    }
    if (!columns.includes('photo_style')) {
      db.exec('ALTER TABLE photos ADD COLUMN photo_style TEXT');
    }
    if (!columns.includes('latitude')) {
      db.exec('ALTER TABLE photos ADD COLUMN latitude REAL');
    }
    if (!columns.includes('longitude')) {
      db.exec('ALTER TABLE photos ADD COLUMN longitude REAL');
    }
    if (!columns.includes('focal_length')) {
      db.exec('ALTER TABLE photos ADD COLUMN focal_length REAL');
    }
  }
  return db;
};

export interface Photo {
  id?: number;
  university: string;
  filename: string;
  original_name: string;
  description?: string;
  file_size: number;
  mime_type: string;
  photo_time?: string;
  photo_season?: string;
  photo_weather?: string;
  photo_location?: string;
  photo_style?: string;
  latitude?: number | null;
  longitude?: number | null;
  focal_length?: number | null;
  uploaded_at?: string;
}

export const insertPhoto = (photo: Omit<Photo, 'id' | 'uploaded_at'>) => {
  const database = getDatabase();
  const stmt = database.prepare(`
    INSERT INTO photos (university, filename, original_name, description, file_size, mime_type, photo_time, photo_season, photo_weather, photo_location, photo_style, latitude, longitude, focal_length)
    VALUES (@university, @filename, @original_name, @description, @file_size, @mime_type, @photo_time, @photo_season, @photo_weather, @photo_location, @photo_style, @latitude, @longitude, @focal_length)
  `);
  return stmt.run(photo);
};

// Graceful shutdown
process.on('exit', () => {
  if (db) {
    db.close();
  }
});

export default getDatabase();
