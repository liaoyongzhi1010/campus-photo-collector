'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';
import { PAGE_TEXT } from '@/lib/constants';

export default function PrivacyPage() {
  const { language } = useLanguage();
  const pageText = PAGE_TEXT[language];

  const content = {
    zh: {
      backToHome: '返回首页',
      title: '隐私政策',
      lastUpdated: '最后更新：2025 年 11 月 28 日',

      introTitle: '简介',
      introText: '欢迎使用校园照片收集平台。我们尊重您的隐私并致力于保护它。本隐私政策说明我们如何在您使用我们的照片收集服务时收集、使用和保护信息。',

      collectTitle: '我们收集的信息',
      photosUploadTitle: '您上传的照片',
      photosUploadText: '当您通过我们的服务上传照片时，我们会收集并存储：',
      photosUploadItems: [
        '照片文件本身',
        '您选择的大学',
        '您为每张照片提供的可选描述',
        '技术元数据，如文件大小、文件类型和上传时间戳',
      ],
      notCollectTitle: '我们不收集的信息',
      notCollectText: '我们想明确说明我们不收集的内容：',
      notCollectItems: [
        '我们不要求或收集个人信息，如姓名、电子邮件地址或电话号码',
        '我们不使用 cookies 或跟踪技术',
        '我们不收集 IP 地址或设备信息',
        '我们不创建用户账户或个人资料',
      ],

      useTitle: '我们如何使用您的信息',
      useText: '您提供的照片和相关信息仅用于：',
      useItems: [
        '构建综合的校园图像数据集',
        '研究和教育目的',
        '改进计算机视觉和机器学习算法',
        '学术出版物和演示（照片可能以聚合形式使用）',
      ],

      storageTitle: '数据存储和安全',
      storageText: '我们采取合理措施保护您上传的内容：',
      storageItems: [
        '照片存储在安全的本地服务器上',
        '我们实施标准安全措施以防止未经授权的访问',
        '文件使用唯一标识符存储，以防止命名冲突',
        '我们维护备份以防止数据丢失',
      ],

      privacyTitle: '照片的隐私注意事项',
      privacyText: '虽然我们鼓励为我们的数据集做出贡献，但请注意隐私：',
      privacyItems: [
        '避免上传个人面部清晰可见或可识别的照片',
        '不要上传包含个人信息的照片（身份证、文件、带有私人数据的屏幕）',
        '仅拍摄校园社区可访问的公共空间',
        '尊重校园内张贴的摄影限制',
      ],
      privacyConfirm: '通过上传照片，您确认已采取适当步骤尊重他人的隐私，并有权分享这些图像。',

      contactTitle: '联系我们',
      contactText: '如果您对本隐私政策或我们的做法有疑问或顾虑，请通过您所在大学的研究办公室联系研究团队。',

      consentTitle: '您的同意',
      consentText: '使用我们的照片上传服务，即表示您已阅读并理解本隐私政策并同意其条款。如果您不同意本政策，请不要使用我们的服务。',
    },
    en: {
      backToHome: 'Back to Home',
      title: 'Privacy Policy',
      lastUpdated: 'Last updated: November 28, 2025',

      introTitle: 'Introduction',
      introText: 'Welcome to Campus Photo Collector. We respect your privacy and are committed to protecting it. This Privacy Policy explains how we collect, use, and safeguard information when you use our photo collection service.',

      collectTitle: 'Information We Collect',
      photosUploadTitle: 'Photos You Upload',
      photosUploadText: 'When you upload photos through our service, we collect and store:',
      photosUploadItems: [
        'The photo files themselves',
        'The university you selected',
        'Optional descriptions you provide for each photo',
        'Technical metadata such as file size, file type, and upload timestamp',
      ],
      notCollectTitle: 'Information We Do NOT Collect',
      notCollectText: 'We want to be clear about what we do not collect:',
      notCollectItems: [
        'We do not require or collect personal information such as names, email addresses, or phone numbers',
        'We do not use cookies or tracking technologies',
        'We do not collect IP addresses or device information',
        'We do not create user accounts or profiles',
      ],

      useTitle: 'How We Use Your Information',
      useText: 'The photos and associated information you provide are used exclusively for:',
      useItems: [
        'Building a comprehensive dataset of campus images',
        'Research and educational purposes',
        'Improving computer vision and machine learning algorithms',
        'Academic publications and presentations (photos may be used in aggregated form)',
      ],

      storageTitle: 'Data Storage and Security',
      storageText: 'We take reasonable measures to protect your uploaded content:',
      storageItems: [
        'Photos are stored on secure local servers',
        'We implement standard security practices to prevent unauthorized access',
        'Files are stored with unique identifiers to prevent naming conflicts',
        'We maintain backups to prevent data loss',
      ],

      privacyTitle: 'Privacy Considerations for Photos',
      privacyText: 'While we encourage contributions to our dataset, please be mindful of privacy:',
      privacyItems: [
        'Avoid uploading photos where individuals\' faces are clearly visible or identifiable',
        'Do not upload photos containing personal information (IDs, documents, screens with private data)',
        'Only photograph public spaces that are accessible to the general campus community',
        'Respect posted photography restrictions on campus',
      ],
      privacyConfirm: 'By uploading photos, you confirm that you have taken appropriate steps to respect the privacy of others and have the right to share the images.',

      contactTitle: 'Contact Us',
      contactText: 'If you have questions or concerns about this Privacy Policy or our practices, please contact the research team through your university\'s research office.',

      consentTitle: 'Your Consent',
      consentText: 'By using our photo upload service, you acknowledge that you have read and understood this Privacy Policy and agree to its terms. If you do not agree with this policy, please do not use our service.',
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
              <Link href="/guidelines" className="text-gray-600 hover:text-gray-900">
                {pageText.guidelines}
              </Link>
              <Link href="/privacy" className="text-gray-900 font-semibold">
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
          <p className="text-gray-600">{t.lastUpdated}</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t.introTitle}</h2>
            <p className="text-gray-700 leading-relaxed">
              {t.introText}
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t.collectTitle}</h2>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">{t.photosUploadTitle}</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t.photosUploadText}
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              {t.photosUploadItems.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">{t.notCollectTitle}</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t.notCollectText}
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              {t.notCollectItems.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          {/* How We Use Information */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t.useTitle}</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t.useText}
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              {t.useItems.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          {/* Data Storage */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t.storageTitle}</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t.storageText}
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              {t.storageItems.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          {/* Privacy in Photos */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t.privacyTitle}</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t.privacyText}
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              {t.privacyItems.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              {t.privacyConfirm}
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t.contactTitle}</h2>
            <p className="text-gray-700 leading-relaxed">
              {t.contactText}
            </p>
          </section>

          {/* Consent */}
          <section className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">{t.consentTitle}</h2>
            <p className="text-gray-700 leading-relaxed">
              {t.consentText}
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
