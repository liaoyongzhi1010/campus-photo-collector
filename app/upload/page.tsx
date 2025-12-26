'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import exifr from 'exifr';
import {
  UNIVERSITY_NAMES,
  UNIVERSITY_LOGOS,
  UNIVERSITY_COLORS,
  MAX_DESCRIPTION_LENGTH,
  isValidUniversity,
  PHOTO_TIME_OPTIONS,
  PHOTO_TIME_NAMES,
  PHOTO_SEASON_OPTIONS,
  PHOTO_SEASON_NAMES,
  PHOTO_WEATHER_OPTIONS,
  PHOTO_WEATHER_NAMES,
  PHOTO_LOCATION_OPTIONS,
  PHOTO_LOCATION_NAMES,
  PHOTO_STYLE_OPTIONS,
  PHOTO_STYLE_NAMES,
  UPLOAD_PAGE_TEXT,
  PAGE_TEXT,
  PhotoTime,
  PhotoSeason,
  PhotoWeather,
  PhotoLocation,
  PhotoStyle,
} from '@/lib/constants';
import { useLanguage } from '@/lib/LanguageContext';

interface AIAnalysisResult {
  photo_time: string;
  photo_season: string;
  photo_weather: string;
  photo_location: string;
  photo_style: string;
  confidence: number;
  reasoning: string;
}

interface PhotoItem {
  file: File;
  preview: string;
  description: string;
  photoTime: PhotoTime | '';
  photoSeason: PhotoSeason | '';
  photoWeather: PhotoWeather | '';
  photoLocation: PhotoLocation | '';
  photoStyle: PhotoStyle | '';
  latitude?: number | null;
  longitude?: number | null;
  focalLength?: number | null;
  aiAnalysis?: AIAnalysisResult | null;
  analyzing?: boolean;
}

function UploadPageContent() {
  const searchParams = useSearchParams();
  const universityParam = searchParams.get('university');
  const { language, toggleLanguage } = useLanguage();
  const text = UPLOAD_PAGE_TEXT[language];
  const pageText = PAGE_TEXT[language];

  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  if (!isValidUniversity(universityParam)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-50 flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl shadow-xl p-12">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{text.invalidUniversity}</h1>
          <p className="text-gray-600 mb-8">{text.invalidUniversityDesc}</p>
          <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {text.goBackHome}
          </Link>
        </div>
      </div>
    );
  }

  const university = universityParam;
  const colors = UNIVERSITY_COLORS[university];

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newPhotos = await Promise.all(
      files.map(async (file) => {
        let latitude: number | null = null;
        let longitude: number | null = null;
        let focalLength: number | null = null;

        try {
          const exifData = await exifr.parse(file, {
            gps: true,
            exif: true,
          });

          console.log('Frontend EXIF for', file.name, ':', exifData);

          if (exifData && exifData.latitude && exifData.longitude) {
            latitude = exifData.latitude;
            longitude = exifData.longitude;
            console.log(`✓ Frontend GPS: ${latitude}, ${longitude}`);
          } else {
            console.log('Frontend: No GPS data. Keys:', exifData ? Object.keys(exifData) : 'null');
          }

          if (exifData && exifData.FocalLength) {
            focalLength = exifData.FocalLength;
            console.log(`✓ Frontend Focal Length: ${focalLength}mm`);
          }
        } catch (error) {
          console.log('Error reading EXIF from file:', error);
        }

        return {
          file,
          preview: URL.createObjectURL(file),
          description: '',
          photoTime: '' as const,
          photoSeason: '' as const,
          photoWeather: '' as const,
          photoLocation: '' as const,
          photoStyle: '' as const,
          latitude,
          longitude,
          focalLength,
          analyzing: false,
        };
      })
    );

    setPhotos((prev) => [...prev, ...newPhotos]);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files);
      const newPhotos = await Promise.all(
        files.map(async (file) => {
          let latitude: number | null = null;
          let longitude: number | null = null;
          let focalLength: number | null = null;

          try {
            const exifData = await exifr.parse(file, {
              gps: true,
              exif: true,
            });

            console.log('Frontend EXIF for', file.name, ':', exifData);

            if (exifData && exifData.latitude && exifData.longitude) {
              latitude = exifData.latitude;
              longitude = exifData.longitude;
              console.log(`✓ Frontend GPS: ${latitude}, ${longitude}`);
            } else {
              console.log('Frontend: No GPS data. Keys:', exifData ? Object.keys(exifData) : 'null');
            }

            if (exifData && exifData.FocalLength) {
              focalLength = exifData.FocalLength;
              console.log(`✓ Frontend Focal Length: ${focalLength}mm`);
            }
          } catch (error) {
            console.log('Error reading EXIF from file:', error);
          }

          return {
            file,
            preview: URL.createObjectURL(file),
            description: '',
            photoTime: '' as const,
            photoSeason: '' as const,
            photoWeather: '' as const,
            photoLocation: '' as const,
            photoStyle: '' as const,
            latitude,
            longitude,
            focalLength,
            analyzing: false,
          };
        })
      );

      setPhotos((prev) => [...prev, ...newPhotos]);
    }
  };

  const handleDescriptionChange = (index: number, description: string) => {
    // Limit description length
    const truncatedDescription = description.slice(0, MAX_DESCRIPTION_LENGTH);
    setPhotos((prev) =>
      prev.map((photo, i) => (i === index ? { ...photo, description: truncatedDescription } : photo))
    );
  };

  const handleMetadataChange = (
    index: number,
    field: 'photoTime' | 'photoSeason' | 'photoWeather' | 'photoLocation' | 'photoStyle',
    value: string
  ) => {
    setPhotos((prev) =>
      prev.map((photo, i) => (i === index ? { ...photo, [field]: value } : photo))
    );
  };

  const handleRemovePhoto = (index: number) => {
    setPhotos((prev) => {
      URL.revokeObjectURL(prev[index].preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleAutoAnalyze = async (index: number, file: File) => {
    // 立即设置 analyzing 状态，防止重复点击
    setPhotos((prev) =>
      prev.map((p, i) => (i === index ? { ...p, analyzing: true, aiAnalysis: null } : p))
    );

    try {
      // Convert image to base64
      const reader = new FileReader();
      reader.readAsDataURL(file);

      const base64Image = await new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
      });

      // Call AI analysis API
      const response = await fetch('/api/analyze-photo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageBase64: base64Image,
          language: language, // 传递当前语言
        }),
      });

      const result = await response.json();

      if (response.ok) {
        // 自动填充 AI 分析的结果
        setPhotos((prev) =>
          prev.map((p, i) =>
            i === index
              ? {
                  ...p,
                  photoTime: result.photo_time as PhotoTime,
                  photoSeason: result.photo_season as PhotoSeason,
                  photoWeather: result.photo_weather as PhotoWeather,
                  photoLocation: result.photo_location as PhotoLocation,
                  photoStyle: result.photo_style as PhotoStyle,
                  analyzing: false,
                  aiAnalysis: result,
                }
              : p
          )
        );
      } else {
        console.error('AI 分析失败:', result.error);
        setPhotos((prev) =>
          prev.map((p, i) => (i === index ? { ...p, analyzing: false } : p))
        );
      }
    } catch (error) {
      console.error('AI 分析错误:', error);
      setPhotos((prev) =>
        prev.map((p, i) => (i === index ? { ...p, analyzing: false } : p))
      );
    }
  };

  const handleReAnalyze = (index: number) => {
    const photo = photos[index];
    setPhotos((prev) =>
      prev.map((p, i) => (i === index ? { ...p, analyzing: true, aiAnalysis: null } : p))
    );
    handleAutoAnalyze(index, photo.file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (photos.length === 0) return;

    setUploading(true);
    setUploadError(null);

    const formData = new FormData();
    formData.append('university', university);

    photos.forEach((photo, index) => {
      formData.append('photos', photo.file);
      formData.append(`description_${index}`, photo.description);
      formData.append(`photo_time_${index}`, photo.photoTime);
      formData.append(`photo_season_${index}`, photo.photoSeason);
      formData.append(`photo_weather_${index}`, photo.photoWeather);
      formData.append(`photo_location_${index}`, photo.photoLocation);
      formData.append(`photo_style_${index}`, photo.photoStyle);
    });

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setUploadSuccess(true);
        setPhotos([]);
        // Clear success message after 3 seconds
        setTimeout(() => {
          setUploadSuccess(false);
        }, 3000);
      } else {
        setUploadError(data.error || 'Upload failed. Please try again.');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setUploadError('Network error. Please check your connection and try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50">
      {/* Header */}
      <header className="backdrop-blur-sm bg-white/70 border-b border-purple-100 sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden">
                <Image
                  src={UNIVERSITY_LOGOS[university]}
                  alt={`${UNIVERSITY_NAMES[university]} Logo`}
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
                {pageText.appName}
              </h1>
            </Link>
            <div className="flex gap-3 text-sm font-medium">
              <Link href="/guidelines" className="px-4 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all">
                {pageText.guidelines}
              </Link>
              <Link href="/privacy" className="px-4 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all">
                {pageText.privacy}
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button and Title */}
        <div className="mb-8">
          <Link href="/" className={`inline-flex items-center gap-2 ${colors.text} hover:underline font-medium mb-6`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {text.backToHome}
          </Link>
          <div className={`bg-gradient-to-br ${colors.bg} rounded-2xl p-8 border ${colors.border}`}>
            <div className="flex items-center gap-4 mb-3">
              <div className="w-16 h-16 rounded-xl flex items-center justify-center shadow-lg overflow-hidden">
                <Image
                  src={UNIVERSITY_LOGOS[university]}
                  alt={`${UNIVERSITY_NAMES[university]} Logo`}
                  width={64}
                  height={64}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{text.uploadPhotos}</h1>
                <p className="text-lg text-gray-700 font-medium mt-1">{UNIVERSITY_NAMES[language][university]}</p>
              </div>
            </div>
          </div>
        </div>

        {uploadSuccess && (
          <div className="bg-green-50 border-2 border-green-400 rounded-2xl p-6 mb-8 animate-pulse">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="font-bold text-green-900 text-lg">{text.successTitle}</p>
                <p className="text-green-700">{text.successMessage}</p>
              </div>
            </div>
          </div>
        )}

        {uploadError && (
          <div className="bg-red-50 border-2 border-red-400 rounded-2xl p-6 mb-8">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <div className="flex-grow">
                <p className="font-bold text-red-900 text-lg">{text.uploadFailedTitle}</p>
                <p className="text-red-700">{uploadError}</p>
              </div>
              <button
                onClick={() => setUploadError(null)}
                className="text-red-500 hover:text-red-700 p-1 flex-shrink-0"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* File Upload Area */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-dashed border-gray-200 hover:border-purple-300 transition-colors">
            <label
              htmlFor="file-upload"
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`flex flex-col items-center justify-center w-full min-h-[300px] cursor-pointer rounded-xl transition-all ${
                dragActive ? 'bg-purple-50 scale-105' : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex flex-col items-center justify-center py-8">
                <div className={`w-20 h-20 bg-gradient-to-br ${colors.gradient} rounded-2xl flex items-center justify-center mb-6 ${dragActive ? 'scale-110' : ''} transition-transform`}>
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                </div>
                <p className="mb-2 text-lg font-semibold text-gray-700">
                  <span className={colors.text}>{text.clickToUpload}</span> {text.orDragAndDrop}
                </p>
                <p className="text-sm text-gray-500 mb-1">{text.fileTypes}</p>
                <p className="text-xs text-gray-400">{text.selectMultiple}</p>
              </div>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                multiple
                accept="image/png,image/jpeg,image/jpg"
                onChange={handleFileSelect}
                disabled={uploading}
              />
            </label>
          </div>

          {/* Selected Photos */}
          {photos.length > 0 && (
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${colors.text} bg-purple-100 text-sm font-bold`}>
                    {photos.length}
                  </span>
                  {photos.length > 1 ? text.selectedPhotos : text.selectedPhoto}
                </h2>
              </div>
              <div className="space-y-6">
                {photos.map((photo, index) => (
                  <div key={index} className={`border-2 ${colors.border} ${colors.hoverBorder} rounded-xl p-4 transition-all hover:shadow-md`}>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={photo.preview}
                          alt={`Preview ${index + 1}`}
                          className="w-full sm:w-40 h-40 object-cover rounded-lg shadow-md"
                        />
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <p className="text-sm font-semibold text-gray-900 mb-1 truncate">
                              {photo.file.name}
                            </p>
                            <p className="text-xs text-gray-500 flex items-center gap-2 mb-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                              </svg>
                              {(photo.file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                            <div className="flex items-center gap-4 text-xs">
                              {photo.latitude && photo.longitude ? (
                                <p className="text-green-600 flex items-center gap-1">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                  </svg>
                                  {text.gps}: {photo.latitude.toFixed(6)}, {photo.longitude.toFixed(6)}
                                </p>
                              ) : (
                                <p className="text-gray-400 flex items-center gap-1">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                  </svg>
                                  {text.noGPS}
                                </p>
                              )}
                              {photo.focalLength ? (
                                <p className="text-blue-600 flex items-center gap-1">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                  </svg>
                                  {text.focalLength}: {photo.focalLength}mm
                                </p>
                              ) : (
                                <p className="text-gray-400 flex items-center gap-1">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                  </svg>
                                  {text.noFocalLength}
                                </p>
                              )}
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemovePhoto(index)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
                            disabled={uploading}
                            aria-label="Remove photo"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                        <label className="block">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700">
                              {text.descriptionOptional}
                            </span>
                            <span className="text-xs text-gray-500">
                              {photo.description.length}/{MAX_DESCRIPTION_LENGTH}
                            </span>
                          </div>
                          <textarea
                            value={photo.description}
                            onChange={(e) => handleDescriptionChange(index, e.target.value)}
                            placeholder={text.descriptionPlaceholder}
                            className="w-full rounded-lg border-2 border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 p-3 text-sm text-gray-900 placeholder-gray-400 transition-colors resize-none"
                            rows={2}
                            disabled={uploading}
                            maxLength={MAX_DESCRIPTION_LENGTH}
                          />
                        </label>

                        {/* AI Smart Fill Button - Only show if not analyzed yet and not analyzing */}
                        {!photo.aiAnalysis && !photo.analyzing && (
                          <div className="mt-6">
                            <button
                              type="button"
                              onClick={() => handleAutoAnalyze(index, photo.file)}
                              disabled={uploading}
                              className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 disabled:hover:scale-100"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                              </svg>
                              {text.aiSmartFill}
                            </button>
                            <p className="text-xs text-gray-500 text-center mt-2">{text.aiSmartFillHint}</p>
                          </div>
                        )}

                        {/* AI Analysis Status */}
                        {photo.analyzing && (
                          <div className="mt-6 bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-xl p-5">
                            <div className="flex items-center gap-3">
                              <svg className="animate-spin w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              <div>
                                <p className="font-semibold text-indigo-900">{text.analyzingTitle}</p>
                                <p className="text-sm text-indigo-600">{text.analyzingDesc}</p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* AI Analysis Result */}
                        {photo.aiAnalysis && !photo.analyzing && (
                          <div className="mt-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-5">
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                              </div>
                              <div className="flex-grow">
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="font-bold text-lg text-blue-900">{text.aiAutoFilled}</h4>
                                  <button
                                    type="button"
                                    onClick={() => handleReAnalyze(index)}
                                    className="text-sm text-blue-600 hover:text-blue-800 underline"
                                  >
                                    {text.reanalyze}
                                  </button>
                                </div>
                                <p className="text-sm text-blue-700 mb-2">
                                  <span className="font-medium">{text.aiAnalysis}：</span>
                                  {photo.aiAnalysis.reasoning}
                                </p>
                                <p className="text-xs text-blue-600 mb-3">
                                  {text.aiConfidence}：{photo.aiAnalysis.confidence}%
                                </p>
                                <div className="bg-white rounded-lg p-3 border border-blue-200">
                                  <p className="text-xs text-gray-500 mb-2">{text.aiAutoSelected}</p>
                                  <div className="grid grid-cols-2 gap-2 text-sm">
                                    <div>
                                      <span className="text-gray-600">{text.aiTimeLabel}</span>
                                      <span className="font-medium text-blue-700">
                                        {PHOTO_TIME_NAMES[language][photo.photoTime as PhotoTime]}
                                      </span>
                                    </div>
                                    <div>
                                      <span className="text-gray-600">{text.aiSeasonLabel}</span>
                                      <span className="font-medium text-green-700">
                                        {PHOTO_SEASON_NAMES[language][photo.photoSeason as PhotoSeason]}
                                      </span>
                                    </div>
                                    <div>
                                      <span className="text-gray-600">{text.aiWeatherLabel}</span>
                                      <span className="font-medium text-sky-700">
                                        {PHOTO_WEATHER_NAMES[language][photo.photoWeather as PhotoWeather]}
                                      </span>
                                    </div>
                                    <div>
                                      <span className="text-gray-600">{text.aiLocationLabel}</span>
                                      <span className="font-medium text-orange-700">
                                        {PHOTO_LOCATION_NAMES[language][photo.photoLocation as PhotoLocation]}
                                      </span>
                                    </div>
                                    <div className="col-span-2">
                                      <span className="text-gray-600">{text.aiStyleLabel}</span>
                                      <span className="font-medium text-purple-700">
                                        {PHOTO_STYLE_NAMES[language][photo.photoStyle as PhotoStyle]}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Photo Metadata */}
                        <div className="space-y-4 mt-6">
                          {/* Time */}
                          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-100">
                            <div className="flex items-center gap-2 mb-3">
                              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              </div>
                              <span className="text-sm font-semibold text-blue-900">
                                Time
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {PHOTO_TIME_OPTIONS.map((time) => (
                                <button
                                  key={time}
                                  type="button"
                                  onClick={() => handleMetadataChange(index, 'photoTime', time)}
                                  disabled={uploading}
                                  className={`px-4 py-2 text-sm font-medium rounded-lg border-2 transition-all duration-200 ${
                                    photo.photoTime === time
                                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-transparent shadow-lg scale-105'
                                      : 'bg-white text-gray-700 border-blue-200 hover:border-blue-400 hover:bg-blue-50 hover:shadow-md'
                                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                                >
                                  {PHOTO_TIME_NAMES[language][time]}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Season */}
                          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
                            <div className="flex items-center gap-2 mb-3">
                              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                                </svg>
                              </div>
                              <span className="text-sm font-semibold text-green-900">
                                Season
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {PHOTO_SEASON_OPTIONS.map((season) => (
                                <button
                                  key={season}
                                  type="button"
                                  onClick={() => handleMetadataChange(index, 'photoSeason', season)}
                                  disabled={uploading}
                                  className={`px-4 py-2 text-sm font-medium rounded-lg border-2 transition-all duration-200 ${
                                    photo.photoSeason === season
                                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white border-transparent shadow-lg scale-105'
                                      : 'bg-white text-gray-700 border-green-200 hover:border-green-400 hover:bg-green-50 hover:shadow-md'
                                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                                >
                                  {PHOTO_SEASON_NAMES[language][season]}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Weather */}
                          <div className="bg-gradient-to-br from-sky-50 to-indigo-50 rounded-xl p-4 border border-sky-100">
                            <div className="flex items-center gap-2 mb-3">
                              <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                                </svg>
                              </div>
                              <span className="text-sm font-semibold text-sky-900">
                                Weather
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {PHOTO_WEATHER_OPTIONS.map((weather) => (
                                <button
                                  key={weather}
                                  type="button"
                                  onClick={() => handleMetadataChange(index, 'photoWeather', weather)}
                                  disabled={uploading}
                                  className={`px-4 py-2 text-sm font-medium rounded-lg border-2 transition-all duration-200 ${
                                    photo.photoWeather === weather
                                      ? 'bg-gradient-to-r from-sky-500 to-indigo-500 text-white border-transparent shadow-lg scale-105'
                                      : 'bg-white text-gray-700 border-sky-200 hover:border-sky-400 hover:bg-sky-50 hover:shadow-md'
                                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                                >
                                  {PHOTO_WEATHER_NAMES[language][weather]}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Location */}
                          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-4 border border-orange-100">
                            <div className="flex items-center gap-2 mb-3">
                              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                              </div>
                              <span className="text-sm font-semibold text-orange-900">
                                Location
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {PHOTO_LOCATION_OPTIONS.map((location) => (
                                <button
                                  key={location}
                                  type="button"
                                  onClick={() => handleMetadataChange(index, 'photoLocation', location)}
                                  disabled={uploading}
                                  className={`px-4 py-2 text-sm font-medium rounded-lg border-2 transition-all duration-200 ${
                                    photo.photoLocation === location
                                      ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white border-transparent shadow-lg scale-105'
                                      : 'bg-white text-gray-700 border-orange-200 hover:border-orange-400 hover:bg-orange-50 hover:shadow-md'
                                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                                >
                                  {PHOTO_LOCATION_NAMES[language][location]}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Style */}
                          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
                            <div className="flex items-center gap-2 mb-3">
                              <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </div>
                              <span className="text-sm font-semibold text-purple-900">
                                Style
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {PHOTO_STYLE_OPTIONS.map((style) => (
                                <button
                                  key={style}
                                  type="button"
                                  onClick={() => handleMetadataChange(index, 'photoStyle', style)}
                                  disabled={uploading}
                                  className={`px-4 py-2 text-sm font-medium rounded-lg border-2 transition-all duration-200 ${
                                    photo.photoStyle === style
                                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-transparent shadow-lg scale-105'
                                      : 'bg-white text-gray-700 border-purple-200 hover:border-purple-400 hover:bg-purple-50 hover:shadow-md'
                                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                                >
                                  {PHOTO_STYLE_NAMES[language][style]}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Submit Button */}
          {photos.length > 0 && (
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={uploading}
                className={`group px-8 py-4 bg-gradient-to-r ${colors.gradient} text-white font-bold rounded-xl shadow-lg hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 disabled:hover:scale-100 flex items-center gap-3`}
              >
                {uploading ? (
                  <>
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Uploading...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    Upload {photos.length} Photo{photos.length > 1 ? 's' : ''}
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          )}
        </form>
      </main>
    </div>
  );
}

export default function UploadPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <UploadPageContent />
    </Suspense>
  );
}
