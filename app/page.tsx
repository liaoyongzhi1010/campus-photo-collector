'use client';

import Link from "next/link";
import Image from "next/image";
import { PAGE_TEXT, UNIVERSITY_NAMES, ALLOWED_UNIVERSITIES, UNIVERSITY_COLORS, University } from "@/lib/constants";
import { useLanguage } from "@/lib/LanguageContext";

export default function Home() {
  const { language, toggleLanguage } = useLanguage();
  const text = PAGE_TEXT[language];

  const universities: University[] = [...ALLOWED_UNIVERSITIES];

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50">
      {/* Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-fuchsia-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-violet-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header className="relative backdrop-blur-sm bg-white/70 border-b border-purple-100 sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-fuchsia-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
                {text.appName}
              </h1>
            </div>
            <div className="flex gap-3 text-sm font-medium items-center">
              <Link href="/guidelines" className="px-4 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all">
                {text.guidelines}
              </Link>
              <Link href="/privacy" className="px-4 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all">
                {text.privacy}
              </Link>
              <button
                onClick={toggleLanguage}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white rounded-lg hover:shadow-lg transition-all font-semibold"
                aria-label="Toggle language"
              >
                {language === 'en' ? '中文' : 'English'}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-5xl sm:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
            {text.heroTitle}
            <span className="bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 bg-clip-text text-transparent"> {text.heroHighlight} </span>
            {language === 'en' ? 'Moments' : '时光'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {text.heroSubtitle}
          </p>
        </div>

        {/* University Selection Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {universities.map((university) => {
            const colors = UNIVERSITY_COLORS[university];
            // Map full class names to avoid Tailwind purging
            const borderColorMap = {
              xidian: 'border-purple-400',
              xsyu: 'border-emerald-400',
              xaut: 'border-orange-400',
              bristol: 'border-indigo-400',
            };
            const textColorMap = {
              xidian: 'text-purple-600',
              xsyu: 'text-emerald-600',
              xaut: 'text-orange-600',
              bristol: 'text-indigo-600',
            };
            return (
              <Link key={university} href={`/upload?university=${university}`} className="group h-full">
                <div className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border-2 border-transparent hover:${borderColorMap[university]} overflow-hidden transform hover:-translate-y-2 h-full min-h-[22rem] flex flex-col`}>
                  {/* Background gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

                  <div className="relative text-center flex flex-col">
                    {/* Icon */}
                    <div className="w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300 overflow-hidden">
                      <Image
                        src={`/${university}-logo.png`}
                        alt={`${UNIVERSITY_NAMES[language][university]} Logo`}
                        width={96}
                        height={96}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Title */}
                    <h3 className={`${language === 'zh' ? 'text-xl' : 'text-2xl'} font-bold text-gray-900 mb-3 group-hover:${textColorMap[university]} transition-colors`}>
                      {UNIVERSITY_NAMES[language][university]}
                    </h3>

                    {/* Button */}
                    <div className="mt-6">
                      <div className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${colors.gradient} text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all group-hover:scale-105`}>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        {text.uploadPhotos}
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center border border-purple-100 hover:border-purple-300 transition-colors">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">{text.featureNoLoginTitle}</h4>
            <p className="text-sm text-gray-600">{text.featureNoLoginDesc}</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center border border-purple-100 hover:border-purple-300 transition-colors">
            <div className="w-12 h-12 bg-fuchsia-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-fuchsia-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">{text.featureMultiUploadTitle}</h4>
            <p className="text-sm text-gray-600">{text.featureMultiUploadDesc}</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center border border-purple-100 hover:border-purple-300 transition-colors">
            <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">{text.featureMobileTitle}</h4>
            <p className="text-sm text-gray-600">{text.featureMobileDesc}</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center border border-purple-100 hover:border-purple-300 transition-colors">
            <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">{text.featurePrivacyTitle}</h4>
            <p className="text-sm text-gray-600">{text.featurePrivacyDesc}</p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 rounded-3xl p-6 text-white text-center shadow-2xl">
          <h3 className="text-3xl font-bold mb-2">{text.ctaTitle}</h3>
          <p className="text-lg mb-3 opacity-90 max-w-2xl mx-auto">
            {text.ctaSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/guidelines" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {text.ctaButton}
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative bg-white/50 backdrop-blur-sm border-t border-purple-100 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2 text-sm font-medium flex-wrap">
              <Link href="/guidelines" className="px-4 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all">
                {text.footerGuidelines}
              </Link>
              <Link href="/privacy" className="px-4 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all">
                {text.footerPrivacy}
              </Link>
            </div>
            <p className="text-sm text-gray-500">
              &copy; {text.footerCopyright}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
