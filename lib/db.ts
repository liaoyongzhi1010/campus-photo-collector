import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const dbDir = path.join(process.cwd(), 'data');
const dbPath = path.join(dbDir, 'photos.db');

// Ensure data directory exists
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new Database(dbPath);

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

export interface Photo {
  id?: number;
  university: string;
  filename: string;
  original_name: string;
  description?: string;
  file_size: number;
  mime_type: string;
  uploaded_at?: string;
}

export const insertPhoto = (photo: Omit<Photo, 'id' | 'uploaded_at'>) => {
  const stmt = db.prepare(`
    INSERT INTO photos (university, filename, original_name, description, file_size, mime_type)
    VALUES (@university, @filename, @original_name, @description, @file_size, @mime_type)
  `);
  return stmt.run(photo);
};

export const getAllPhotos = () => {
  const stmt = db.prepare('SELECT * FROM photos ORDER BY uploaded_at DESC');
  return stmt.all() as Photo[];
};

export const getPhotosByUniversity = (university: string) => {
  const stmt = db.prepare('SELECT * FROM photos WHERE university = ? ORDER BY uploaded_at DESC');
  return stmt.all(university) as Photo[];
};

export const getPhotoCount = () => {
  const stmt = db.prepare('SELECT COUNT(*) as count FROM photos');
  return (stmt.get() as { count: number }).count;
};

export default db;
