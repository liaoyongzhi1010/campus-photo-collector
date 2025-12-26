'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';
import { PAGE_TEXT } from '@/lib/constants';

export default function GuidelinesPage() {
  const { language } = useLanguage();
  const pageText = PAGE_TEXT[language];

  const content = {
    zh: {
      backToHome: '返回首页',
      title: '拍摄指南',
      subtitle: '遵循这些指南帮助我们构建高质量的校园照片数据集。',

      photoQuality: '照片质量',
      photoQualityItems: [
        { good: true, bold: '清晰且对焦准确：', text: '确保照片清晰，没有模糊' },
        { good: true, bold: '良好的光线：', text: '尽可能在自然光下拍摄，避免过暗或过度曝光的图像' },
        { good: true, bold: '高分辨率：', text: '使用设备的最高质量相机设置' },
        { good: false, bold: '避免滤镜：', text: '不要应用 Instagram 风格的滤镜或大量编辑' },
      ],

      whatToPhoto: '拍摄内容',
      goodSubjects: '建议拍摄：',
      goodSubjectsList: [
        '教学楼和学术建筑',
        '图书馆内外景',
        '校园景观和花园',
        '体育设施',
        '学生活动区域',
        '标志性建筑和雕塑',
      ],
      avoidSubjects: '避免拍摄：',
      avoidSubjectsList: [
        '可识别的个人面部特写',
        '车牌号码',
        '私人信息（身份证、成绩单等）',
        '敏感区域（宿舍内部）',
      ],

      privacy: '隐私保护',
      privacyItems: [
        '拍摄公共区域的照片',
        '如果照片中有人，请确保他们不是主要焦点',
        '不要上传包含个人信息的照片',
        '尊重他人隐私，避免拍摄私密空间',
      ],

      diversity: '多样性',
      diversityText: '我们鼓励拍摄各种类型的照片以构建全面的数据集：',
      diversityItems: [
        '不同时段（早晨、中午、傍晚、夜晚）',
        '不同季节（春、夏、秋、冬）',
        '不同天气条件（晴天、多云、雨天、雪天）',
        '不同角度和视角',
        '不同的建筑和地点类型',
      ],

      metadata: '元数据',
      metadataText: '请尽可能提供准确的元数据：',
      metadataItems: [
        '拍摄时间（黎明、上午、中午等）',
        '季节',
        '天气情况',
        '地点类型',
        '照片风格（风景、建筑、夜景等）',
        '可选：简短描述（最多 500 字）',
      ],

      technical: '技术要求',
      technicalItems: [
        { bold: '文件格式：', text: 'JPG、JPEG 或 PNG' },
        { bold: '文件大小：', text: '每张最大 10MB' },
        { bold: '方向：', text: '横向或竖向均可' },
        { bold: 'GPS 数据：', text: '如果可用，将自动提取 GPS 坐标' },
      ],

      thankYouTitle: '感谢您！',
      thankYouText: '您的贡献帮助我们创建了一个有价值的研究和教育数据集。我们感谢您花时间遵循这些指南。',
      startUploading: '开始上传照片',
    },
    en: {
      backToHome: 'Back to Home',
      title: 'Photography Guidelines',
      subtitle: 'Follow these guidelines to help us build a high-quality campus photo dataset.',

      photoQuality: 'Photo Quality',
      photoQualityItems: [
        { good: true, bold: 'Clear and well-focused:', text: 'Ensure your photos are sharp and not blurry' },
        { good: true, bold: 'Good lighting:', text: 'Take photos in natural daylight when possible, avoid overly dark or overexposed images' },
        { good: true, bold: 'High resolution:', text: 'Use your device\'s highest quality camera settings' },
        { good: false, bold: 'Avoid filters:', text: 'Do not apply Instagram-style filters or heavy editing' },
      ],

      whatToPhoto: 'What to Photograph',
      goodSubjects: 'Good Subjects:',
      goodSubjectsList: [
        'Academic buildings and classrooms',
        'Libraries (interior and exterior)',
        'Campus landscapes and gardens',
        'Sports facilities',
        'Student common areas',
        'Iconic buildings and sculptures',
      ],
      avoidSubjects: 'Avoid:',
      avoidSubjectsList: [
        'Identifiable individuals\' faces in close-up',
        'License plate numbers',
        'Private information (IDs, transcripts, etc.)',
        'Sensitive areas (dormitory interiors)',
      ],

      privacy: 'Privacy',
      privacyItems: [
        'Take photos in public areas',
        'If people are in the photo, ensure they are not the main focus',
        'Do not upload photos containing personal information',
        'Respect others\' privacy and avoid private spaces',
      ],

      diversity: 'Diversity',
      diversityText: 'We encourage capturing a variety of photos to build a comprehensive dataset:',
      diversityItems: [
        'Different times of day (morning, noon, evening, night)',
        'Different seasons (spring, summer, autumn, winter)',
        'Different weather conditions (sunny, cloudy, rainy, snowy)',
        'Different angles and perspectives',
        'Various building and location types',
      ],

      metadata: 'Metadata',
      metadataText: 'Please provide accurate metadata when possible:',
      metadataItems: [
        'Time of day (dawn, morning, noon, etc.)',
        'Season',
        'Weather conditions',
        'Location type',
        'Photo style (landscape, architecture, night, etc.)',
        'Optional: Brief description (max 500 characters)',
      ],

      technical: 'Technical Requirements',
      technicalItems: [
        { bold: 'File Format:', text: 'JPG, JPEG, or PNG' },
        { bold: 'File Size:', text: 'Maximum 10MB per image' },
        { bold: 'Orientation:', text: 'Landscape or portrait both acceptable' },
        { bold: 'GPS Data:', text: 'GPS coordinates will be automatically extracted if available' },
      ],

      thankYouTitle: 'Thank You!',
      thankYouText: 'Your contributions help create a valuable dataset for research and education. We appreciate your time and effort in following these guidelines.',
      startUploading: 'Start Uploading Photos',
    },
  };

  const t = content[language];
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-gray-700">
              {pageText.appName}
            </Link>
            <div className="flex gap-4 text-sm">
              <Link href="/guidelines" className="text-gray-900 font-semibold">
                {pageText.guidelines}
              </Link>
              <Link href="/privacy" className="text-gray-600 hover:text-gray-900">
                {pageText.privacy}
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link href="/" className="text-blue-600 hover:underline flex items-center mb-4">
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t.backToHome}
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t.title}</h1>
          <p className="text-lg text-gray-600">
            {t.subtitle}
          </p>
        </div>

        <div className="space-y-6">
          {/* Photo Quality */}
          <section className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <svg className="w-7 h-7 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {t.photoQuality}
            </h2>
            <ul className="space-y-3 text-gray-700">
              {t.photoQualityItems.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className={`${item.good ? 'text-green-500' : 'text-red-500'} mr-2 mt-1`}>
                    {item.good ? '✓' : '✗'}
                  </span>
                  <span><strong>{item.bold}</strong> {item.text}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* What to Photograph */}
          <section className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <svg className="w-7 h-7 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              {t.whatToPhoto}
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">{t.goodSubjects}</h3>
                <ul className="space-y-2 text-gray-700">
                  {t.goodSubjectsList.map((subject, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>{subject}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">{t.avoidSubjects}</h3>
                <ul className="space-y-2 text-gray-700">
                  {t.avoidSubjectsList.map((subject, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-red-500 mr-2">✗</span>
                      <span>{subject}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Privacy and Ethics */}
          <section className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <svg className="w-7 h-7 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              {t.privacy}
            </h2>
            <ul className="space-y-3 text-gray-700">
              {t.privacyItems.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-500 mr-2 mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Diversity */}
          <section className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <svg className="w-7 h-7 text-orange-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              {t.diversity}
            </h2>
            <p className="text-gray-700 mb-4">{t.diversityText}</p>
            <ul className="space-y-3 text-gray-700">
              {t.diversityItems.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-orange-500 mr-2 mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Metadata */}
          <section className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <svg className="w-7 h-7 text-indigo-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              {t.metadata}
            </h2>
            <p className="text-gray-700 mb-4">{t.metadataText}</p>
            <ul className="space-y-3 text-gray-700">
              {t.metadataItems.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-indigo-500 mr-2 mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Technical Requirements */}
          <section className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <svg className="w-7 h-7 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {t.technical}
            </h2>
            <ul className="space-y-3 text-gray-700">
              {t.technicalItems.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-gray-500 mr-2 mt-1">•</span>
                  <span><strong>{item.bold}</strong> {item.text}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Thank You */}
          <section className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-md p-8 text-white text-center">
            <h2 className="text-2xl font-semibold mb-4">{t.thankYouTitle}</h2>
            <p className="text-lg mb-6">
              {t.thankYouText}
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              {t.startUploading}
            </Link>
          </section>
        </div>
      </main>
    </div>
  );
}
