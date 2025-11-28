import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { randomBytes } from 'crypto';
import { insertPhoto } from '@/lib/db';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const university = formData.get('university') as string;
    const photos = formData.getAll('photos') as File[];

    if (!university || photos.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate university
    const universityFolder = university === 'xidian' ? 'xdu' : 'xsyu';
    if (!['xidian', 'xsyu'].includes(university)) {
      return NextResponse.json(
        { error: 'Invalid university' },
        { status: 400 }
      );
    }

    const uploadedPhotos = [];

    for (let i = 0; i < photos.length; i++) {
      const photo = photos[i];
      const description = formData.get(`description_${i}`) as string;

      // Validate file
      if (!ALLOWED_TYPES.includes(photo.type)) {
        return NextResponse.json(
          { error: `Invalid file type for ${photo.name}. Only JPEG and PNG are allowed.` },
          { status: 400 }
        );
      }

      if (photo.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: `File ${photo.name} exceeds 10MB limit` },
          { status: 400 }
        );
      }

      // Generate unique filename
      const ext = path.extname(photo.name);
      const uniqueName = `${university}_${Date.now()}_${randomBytes(8).toString('hex')}${ext}`;

      // Convert file to buffer
      const bytes = await photo.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Ensure upload directory exists (with university-specific subfolder)
      const uploadDir = path.join(process.cwd(), 'public', 'uploads', universityFolder);
      await mkdir(uploadDir, { recursive: true });

      // Save file
      const filePath = path.join(uploadDir, uniqueName);
      await writeFile(filePath, buffer);

      // Save to database
      insertPhoto({
        university,
        filename: uniqueName,
        original_name: photo.name,
        description: description || '',
        file_size: photo.size,
        mime_type: photo.type,
      });

      uploadedPhotos.push({
        filename: uniqueName,
        original_name: photo.name,
      });
    }

    return NextResponse.json({
      success: true,
      count: uploadedPhotos.length,
      photos: uploadedPhotos,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    );
  }
}
