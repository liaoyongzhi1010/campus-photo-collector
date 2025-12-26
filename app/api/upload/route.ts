import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { randomBytes } from 'crypto';
import { insertPhoto } from '@/lib/db';
import exifr from 'exifr';
import {
  MAX_FILE_SIZE,
  ALLOWED_FILE_TYPES,
  MAX_DESCRIPTION_LENGTH,
  isValidUniversity,
} from '@/lib/constants';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const university = formData.get('university') as string;
    const photos = formData.getAll('photos') as File[];

    // Validate required fields
    if (!university || photos.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate university
    if (!isValidUniversity(university)) {
      return NextResponse.json(
        { error: 'Invalid university' },
        { status: 400 }
      );
    }

    const uploadedPhotos = [];

    for (let i = 0; i < photos.length; i++) {
      const photo = photos[i];
      const description = formData.get(`description_${i}`) as string;
      const photoTime = formData.get(`photo_time_${i}`) as string;
      const photoSeason = formData.get(`photo_season_${i}`) as string;
      const photoWeather = formData.get(`photo_weather_${i}`) as string;
      const photoLocation = formData.get(`photo_location_${i}`) as string;
      const photoStyle = formData.get(`photo_style_${i}`) as string;

      // Validate file type
      if (!ALLOWED_FILE_TYPES.includes(photo.type)) {
        return NextResponse.json(
          { error: `Invalid file type for ${photo.name}. Only JPEG and PNG are allowed.` },
          { status: 400 }
        );
      }

      // Validate file size
      if (photo.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: `File ${photo.name} exceeds 10MB limit` },
          { status: 400 }
        );
      }

      // Validate description length
      if (description && description.length > MAX_DESCRIPTION_LENGTH) {
        return NextResponse.json(
          { error: `Description for ${photo.name} exceeds ${MAX_DESCRIPTION_LENGTH} characters` },
          { status: 400 }
        );
      }

      // Generate unique filename
      const ext = path.extname(photo.name).toLowerCase();
      const timestamp = Date.now();
      const randomString = randomBytes(16).toString('hex');
      const uniqueName = `${university}_${timestamp}_${randomString}${ext}`;

      // Convert file to buffer
      const bytes = await photo.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Read EXIF data to extract GPS coordinates and focal length
      let latitude: number | null = null;
      let longitude: number | null = null;
      let focalLength: number | null = null;

      try {
        // Try to read all GPS and camera-related EXIF data
        const exifData = await exifr.parse(buffer, {
          gps: true,
          exif: true,
        });

        console.log('EXIF data for', photo.name, ':', exifData);

        if (exifData && exifData.latitude && exifData.longitude) {
          latitude = exifData.latitude;
          longitude = exifData.longitude;
          console.log(`✓ Extracted GPS: ${latitude}, ${longitude}`);
        } else {
          console.log('No GPS data found in image.');
        }

        if (exifData && exifData.FocalLength) {
          focalLength = exifData.FocalLength;
          console.log(`✓ Extracted Focal Length: ${focalLength}mm`);
        } else {
          console.log('No Focal Length data found in image.');
        }
      } catch (exifError) {
        console.log('Error reading EXIF data:', exifError);
        // Continue without EXIF data
      }

      // Ensure upload directory exists
      const uploadDir = path.join(process.cwd(), 'public', 'uploads', university);
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
        photo_time: photoTime || undefined,
        photo_season: photoSeason || undefined,
        photo_weather: photoWeather || undefined,
        photo_location: photoLocation || undefined,
        photo_style: photoStyle || undefined,
        latitude: latitude,
        longitude: longitude,
        focal_length: focalLength,
      });

      uploadedPhotos.push({
        filename: uniqueName,
        original_name: photo.name,
        latitude: latitude,
        longitude: longitude,
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
      { error: 'Upload failed. Please try again.' },
      { status: 500 }
    );
  }
}
