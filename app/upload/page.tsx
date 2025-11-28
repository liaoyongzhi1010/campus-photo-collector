'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

interface PhotoItem {
  file: File;
  preview: string;
  description: string;
}

const UNIVERSITY_NAMES = {
  xidian: 'Xidian University (西安电子科技大学)',
  xsyu: "Xi'an Shiyou University (西安石油大学)",
};

const UNIVERSITY_COLORS = {
  xidian: {
    gradient: 'from-purple-600 to-blue-600',
    bg: 'from-purple-50 to-blue-50',
    text: 'text-purple-600',
    border: 'border-purple-200',
    hoverBorder: 'hover:border-purple-400',
  },
  xsyu: {
    gradient: 'from-emerald-600 to-teal-600',
    bg: 'from-emerald-50 to-teal-50',
    text: 'text-emerald-600',
    border: 'border-emerald-200',
    hoverBorder: 'hover:border-emerald-400',
  },
};

export default function UploadPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const university = searchParams.get('university') as keyof typeof UNIVERSITY_NAMES;

  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  if (!university || !UNIVERSITY_NAMES[university]) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-50 flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl shadow-xl p-12">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Invalid University</h1>
          <p className="text-gray-600 mb-8">The selected university was not found.</p>
          <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Go back to home
          </Link>
        </div>
      </div>
    );
  }

  const colors = UNIVERSITY_COLORS[university];

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newPhotos = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      description: '',
    }));
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

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files);
      const newPhotos = files.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
        description: '',
      }));
      setPhotos((prev) => [...prev, ...newPhotos]);
    }
  };

  const handleDescriptionChange = (index: number, description: string) => {
    setPhotos((prev) =>
      prev.map((photo, i) => (i === index ? { ...photo, description } : photo))
    );
  };

  const handleRemovePhoto = (index: number) => {
    setPhotos((prev) => {
      URL.revokeObjectURL(prev[index].preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (photos.length === 0) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('university', university);

    photos.forEach((photo, index) => {
      formData.append('photos', photo.file);
      formData.append(`description_${index}`, photo.description);
    });

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setUploadSuccess(true);
        setPhotos([]);
        setTimeout(() => {
          router.push('/');
        }, 2000);
      } else {
        alert('Upload failed. Please try again.');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed. Please try again.');
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
              <div className={`w-10 h-10 bg-gradient-to-br ${colors.gradient} rounded-xl flex items-center justify-center`}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
                Campus Collector
              </h1>
            </Link>
            <div className="flex gap-6 text-sm font-medium">
              <Link href="/guidelines" className="text-gray-600 hover:text-purple-600 transition-colors">
                Guidelines
              </Link>
              <Link href="/privacy" className="text-gray-600 hover:text-purple-600 transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-gray-600 hover:text-purple-600 transition-colors">
                Terms
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
            Back to Home
          </Link>
          <div className={`bg-gradient-to-br ${colors.bg} rounded-2xl p-8 border ${colors.border}`}>
            <div className="flex items-center gap-4 mb-3">
              <div className={`w-16 h-16 bg-gradient-to-br ${colors.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Upload Photos</h1>
                <p className="text-lg text-gray-700 font-medium mt-1">{UNIVERSITY_NAMES[university]}</p>
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
                <p className="font-bold text-green-900 text-lg">Success!</p>
                <p className="text-green-700">Your photos have been uploaded successfully. Redirecting...</p>
              </div>
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
                  <span className={colors.text}>Click to upload</span> or drag and drop
                </p>
                <p className="text-sm text-gray-500 mb-1">PNG, JPG, JPEG (MAX. 10MB each)</p>
                <p className="text-xs text-gray-400">Select multiple files at once</p>
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
                  Selected Photo{photos.length > 1 ? 's' : ''}
                </h2>
              </div>
              <div className="space-y-6">
                {photos.map((photo, index) => (
                  <div key={index} className={`border-2 ${colors.border} ${colors.hoverBorder} rounded-xl p-4 transition-all hover:shadow-md`}>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-shrink-0">
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
                            <p className="text-xs text-gray-500 flex items-center gap-2">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                              </svg>
                              {(photo.file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemovePhoto(index)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
                            disabled={uploading}
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
                          <span className="text-sm font-medium text-gray-700 mb-2 block">
                            Description (optional)
                          </span>
                          <textarea
                            value={photo.description}
                            onChange={(e) => handleDescriptionChange(index, e.target.value)}
                            placeholder="e.g., Main library entrance during autumn..."
                            className="w-full rounded-lg border-2 border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 p-3 text-sm transition-colors resize-none"
                            rows={2}
                            disabled={uploading}
                          />
                        </label>
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
