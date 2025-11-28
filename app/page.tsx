import Link from "next/link";
import Image from "next/image";

export default function Home() {
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
                Campus Collector
              </h1>
            </div>
            <div className="flex gap-3 text-sm font-medium">
              <Link href="/guidelines" className="px-4 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all">
                Guidelines
              </Link>
              <Link href="/privacy" className="px-4 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all">
                Privacy
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-5xl sm:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
            Share Your
            <span className="bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 bg-clip-text text-transparent"> Campus </span>
            Moments
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Help us create a comprehensive photo dataset that powers research and innovation.
          </p>
        </div>

        {/* University Selection Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Xidian University */}
          <Link href="/upload?university=xidian" className="group">
            <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border-2 border-transparent hover:border-purple-400 overflow-hidden transform hover:-translate-y-2">
              {/* Background gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative text-center">
                {/* Icon */}
                <div className="w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300 overflow-hidden">
                  <Image
                    src="/xidian-logo.png"
                    alt="Xidian University Logo"
                    width={96}
                    height={96}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Title */}
                <h3 className="text-3xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                  Xidian University
                </h3>
                <p className="text-lg text-gray-600 mb-6 font-medium">
                  西安电子科技大学
                </p>

                {/* Button */}
                <div className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all group-hover:scale-105">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  Upload Photos
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>

          {/* Xi'an Shiyou University */}
          <Link href="/upload?university=xsyu" className="group">
            <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border-2 border-transparent hover:border-emerald-400 overflow-hidden transform hover:-translate-y-2">
              {/* Background gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-teal-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative text-center">
                {/* Icon */}
                <div className="w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300 overflow-hidden">
                  <Image
                    src="/xsyu-logo.png"
                    alt="Xi'an Shiyou University Logo"
                    width={96}
                    height={96}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Title */}
                <h3 className="text-3xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">
                  Xi&apos;an Shiyou University
                </h3>
                <p className="text-lg text-gray-600 mb-6 font-medium">
                  西安石油大学
                </p>

                {/* Button */}
                <div className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all group-hover:scale-105">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  Upload Photos
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center border border-purple-100 hover:border-purple-300 transition-colors">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">No Login Required</h4>
            <p className="text-sm text-gray-600">Upload anonymously without creating an account</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center border border-purple-100 hover:border-purple-300 transition-colors">
            <div className="w-12 h-12 bg-fuchsia-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-fuchsia-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Multi-Upload</h4>
            <p className="text-sm text-gray-600">Select and upload multiple photos at once</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center border border-purple-100 hover:border-purple-300 transition-colors">
            <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Mobile Friendly</h4>
            <p className="text-sm text-gray-600">Fully responsive design for all devices</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center border border-purple-100 hover:border-purple-300 transition-colors">
            <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Privacy First</h4>
            <p className="text-sm text-gray-600">Your privacy is our top priority</p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 rounded-3xl p-6 text-white text-center shadow-2xl">
          <h3 className="text-3xl font-bold mb-2">Ready to Contribute?</h3>
          <p className="text-lg mb-3 opacity-90 max-w-2xl mx-auto">
            Join researchers and students in building a valuable dataset for academic innovation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/guidelines" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Read Guidelines
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
                Photography Guidelines
              </Link>
              <Link href="/privacy" className="px-4 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all">
                Privacy Policy
              </Link>
            </div>
            <p className="text-sm text-gray-500">
              &copy; 2025 Campus Photo Collector.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
