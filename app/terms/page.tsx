import Link from 'next/link';

export default function TermsPage() {
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
              <Link href="/guidelines" className="text-gray-600 hover:text-gray-900">
                Guidelines
              </Link>
              <Link href="/privacy" className="text-gray-600 hover:text-gray-900">
                Privacy
              </Link>
              <Link href="/terms" className="text-gray-900 font-semibold">
                Terms
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-gray-600">Last updated: November 28, 2025</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Agreement to Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              By accessing and using the Campus Photo Collector service, you agree to be bound by these
              Terms of Service. If you do not agree with any part of these terms, you may not use our service.
            </p>
          </section>

          {/* Service Description */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Service Description</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Campus Photo Collector is a web-based platform designed to collect photographs of campus
              facilities and environments from:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Xidian University (西安电子科技大学)</li>
              <li>Xi&apos;an Shiyou University (西安石油大学)</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              The collected photos will be used to create a dataset for research, educational purposes,
              and machine learning applications.
            </p>
          </section>

          {/* User Eligibility */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">User Eligibility</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              By using this service, you represent that:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>You are at least 13 years of age</li>
              <li>You have the legal capacity to enter into these Terms</li>
              <li>You have access to one of the specified universities</li>
              <li>You will comply with all applicable laws and regulations</li>
            </ul>
          </section>

          {/* License and Rights */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">License and Rights to Uploaded Content</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              When you upload photos to our service, you grant us the following rights:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>A non-exclusive, worldwide, royalty-free, perpetual license to use, reproduce, modify,
                and distribute the uploaded photos</li>
              <li>The right to include the photos in research datasets</li>
              <li>The right to use the photos in academic publications, presentations, and research materials</li>
              <li>The right to share the dataset with research partners and collaborating institutions</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              You retain any ownership rights you have in the photos you upload. However, by uploading,
              you acknowledge that the photos will become part of a research dataset and may be difficult
              or impossible to remove later.
            </p>
          </section>

          {/* User Responsibilities */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Responsibilities</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              When using our service, you agree to:
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">Content Requirements</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Only upload photos that you have taken yourself or have permission to share</li>
              <li>Ensure photos are of appropriate quality and relevant to campus environments</li>
              <li>Follow our <Link href="/guidelines" className="text-blue-600 hover:underline">Photography Guidelines</Link></li>
              <li>Provide accurate information when selecting your university</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">Privacy and Ethics</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Respect the privacy of others and avoid uploading photos where individuals are clearly identifiable</li>
              <li>Do not upload photos containing personal information, documents, or sensitive data</li>
              <li>Only photograph public spaces and respect any posted photography restrictions</li>
              <li>Obtain necessary permissions when photographing in restricted or semi-private areas</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">Prohibited Content</h3>
            <p className="text-gray-700 leading-relaxed mb-2">You must NOT upload photos that contain:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Close-up images of people&apos;s faces without their consent</li>
              <li>Offensive, inappropriate, or explicit content</li>
              <li>Copyrighted material you do not have rights to share</li>
              <li>Personal identification information (IDs, passports, etc.)</li>
              <li>Content that violates any law or regulation</li>
              <li>Misleading or fraudulent information</li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Intellectual Property</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You represent and warrant that:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>You own the photos you upload or have the necessary permissions to share them</li>
              <li>Your uploaded content does not infringe on any third-party intellectual property rights</li>
              <li>You have obtained any necessary releases or permissions from individuals who may appear in photos</li>
              <li>Your content does not violate any contractual obligations or confidentiality agreements</li>
            </ul>
          </section>

          {/* Service Availability */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Service Availability and Modifications</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We strive to keep the service available, but we do not guarantee:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Continuous, uninterrupted, or error-free service</li>
              <li>That the service will meet all your requirements</li>
              <li>That any defects will be corrected</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              We reserve the right to modify, suspend, or discontinue the service at any time without
              prior notice.
            </p>
          </section>

          {/* Data Usage */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Usage and Research</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              The photos you upload will be used for:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Creating a campus photo dataset for research purposes</li>
              <li>Training and testing machine learning and computer vision algorithms</li>
              <li>Academic research, publications, and presentations</li>
              <li>Educational purposes in academic settings</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              The dataset may be shared with academic researchers, institutions, and research partners
              under appropriate research agreements.
            </p>
          </section>

          {/* Disclaimers */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Disclaimers</h2>
            <div className="bg-yellow-50 border-l-4 border-yellow-600 p-6 rounded mb-4">
              <p className="text-gray-700 leading-relaxed font-semibold mb-2">
                THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We disclaim all warranties, express or implied, including warranties of merchantability,
                fitness for a particular purpose, and non-infringement. We do not warrant that the service
                will be error-free, secure, or that data loss will not occur.
              </p>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed">
              To the maximum extent permitted by law, we shall not be liable for any indirect, incidental,
              special, consequential, or punitive damages arising from your use of the service, including
              but not limited to loss of data, loss of profits, or any other commercial damages or losses.
            </p>
          </section>

          {/* Indemnification */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Indemnification</h2>
            <p className="text-gray-700 leading-relaxed">
              You agree to indemnify and hold harmless Campus Photo Collector, its operators, and affiliated
              institutions from any claims, damages, losses, liabilities, and expenses (including legal fees)
              arising from:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 mt-4">
              <li>Your violation of these Terms of Service</li>
              <li>Your uploaded content</li>
              <li>Your violation of any third-party rights</li>
              <li>Your violation of applicable laws or regulations</li>
            </ul>
          </section>

          {/* Content Removal */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Content Removal</h2>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right, but not the obligation, to review, monitor, and remove any uploaded
              content that we determine, in our sole discretion, violates these Terms or is otherwise
              objectionable. However, we are under no obligation to monitor user content.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Governing Law</h2>
            <p className="text-gray-700 leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of the People&apos;s
              Republic of China, without regard to its conflict of law provisions.
            </p>
          </section>

          {/* Changes to Terms */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Changes to These Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to modify these Terms at any time. Changes will be effective immediately
              upon posting to this page with an updated &quot;Last updated&quot; date. Your continued use of the
              service after any changes constitutes acceptance of the new Terms.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Information</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have questions about these Terms of Service, please contact the research team through
              your university&apos;s research office or computer science department.
            </p>
          </section>

          {/* Acceptance */}
          <section className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Acceptance of Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              By clicking to upload photos or otherwise using our service, you acknowledge that you have
              read, understood, and agree to be bound by these Terms of Service and our{' '}
              <Link href="/privacy" className="text-blue-600 hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
