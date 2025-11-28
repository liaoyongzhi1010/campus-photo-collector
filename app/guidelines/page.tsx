import Link from 'next/link';

export default function GuidelinesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-gray-700">
              Campus Photo Collector
            </Link>
            <div className="flex gap-4 text-sm">
              <Link href="/guidelines" className="text-gray-900 font-semibold">
                Guidelines
              </Link>
              <Link href="/privacy" className="text-gray-600 hover:text-gray-900">
                Privacy
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
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Photography Guidelines</h1>
          <p className="text-lg text-gray-600">
            Follow these guidelines to help us build a high-quality campus photo dataset.
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
              Photo Quality
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-green-500 mr-2 mt-1">✓</span>
                <span><strong>Clear and well-focused:</strong> Ensure your photos are sharp and not blurry</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2 mt-1">✓</span>
                <span><strong>Good lighting:</strong> Take photos in natural daylight when possible, avoid overly dark or overexposed images</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2 mt-1">✓</span>
                <span><strong>High resolution:</strong> Use your device&apos;s highest quality camera settings</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2 mt-1">✗</span>
                <span><strong>Avoid filters:</strong> Do not apply Instagram-style filters or heavy editing</span>
              </li>
            </ul>
          </section>

          {/* What to Photograph */}
          <section className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <svg className="w-7 h-7 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              What to Photograph
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Good Subjects:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Campus buildings and architecture</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Libraries, classrooms, and labs</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Outdoor spaces, gardens, and paths</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Sports facilities and stadiums</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Cafeterias and common areas</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Campus landmarks and sculptures</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">What to Avoid:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">✗</span>
                    <span>Close-up photos of people&apos;s faces</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">✗</span>
                    <span>Personal information (IDs, documents)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">✗</span>
                    <span>Restricted or private areas</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">✗</span>
                    <span>Photos taken without permission</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">✗</span>
                    <span>Offensive or inappropriate content</span>
                  </li>
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
              Privacy and Ethics
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2 mt-1">•</span>
                <span><strong>Respect privacy:</strong> If people are in your photos, ensure they are not the main subject and faces are not clearly visible or identifiable</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2 mt-1">•</span>
                <span><strong>Public spaces only:</strong> Only photograph areas that are accessible to the general public</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2 mt-1">•</span>
                <span><strong>Follow campus rules:</strong> Respect any photography restrictions on campus</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2 mt-1">•</span>
                <span><strong>Be respectful:</strong> Be mindful of ongoing classes, events, or private moments</span>
              </li>
            </ul>
          </section>

          {/* Technical Tips */}
          <section className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <svg className="w-7 h-7 text-orange-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Technical Tips
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-orange-500 mr-2 mt-1">💡</span>
                <span><strong>Composition:</strong> Try to capture the full structure or scene, use the rule of thirds when appropriate</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2 mt-1">💡</span>
                <span><strong>Variety:</strong> Take photos from different angles and distances of the same subject</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2 mt-1">💡</span>
                <span><strong>Weather:</strong> Different weather conditions (sunny, cloudy, rainy) provide valuable variety</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2 mt-1">💡</span>
                <span><strong>Time of day:</strong> Photos at different times create a diverse dataset</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2 mt-1">💡</span>
                <span><strong>Steady hands:</strong> Hold your device steady or use a stable surface to avoid blur</span>
              </li>
            </ul>
          </section>

          {/* Descriptions */}
          <section className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <svg className="w-7 h-7 text-indigo-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Adding Descriptions
            </h2>
            <p className="text-gray-700 mb-4">
              While optional, descriptions help us understand and categorize your photos better. Good descriptions include:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-indigo-500 mr-2 mt-1">•</span>
                <span><strong>Location:</strong> Building name, area, or landmark (e.g., &quot;Main Library entrance&quot;)</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-500 mr-2 mt-1">•</span>
                <span><strong>Features:</strong> Notable elements in the photo (e.g., &quot;Cherry blossoms in spring&quot;)</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-500 mr-2 mt-1">•</span>
                <span><strong>Context:</strong> Time of day or season if relevant (e.g., &quot;Evening view of campus plaza&quot;)</span>
              </li>
            </ul>
            <div className="mt-4 p-4 bg-gray-50 rounded border border-gray-200">
              <p className="text-sm text-gray-600">
                <strong>Example:</strong> &quot;South Gate of the campus with autumn trees&quot;
              </p>
            </div>
          </section>

          {/* Thank You */}
          <section className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-md p-8 text-white text-center">
            <h2 className="text-2xl font-semibold mb-4">Thank You!</h2>
            <p className="text-lg mb-6">
              Your contributions help create a valuable dataset for research and education.
              We appreciate your time and effort in following these guidelines.
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Start Uploading Photos
            </Link>
          </section>
        </div>
      </main>
    </div>
  );
}
