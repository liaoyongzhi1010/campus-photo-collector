import Link from 'next/link';

export default function PrivacyPage() {
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
              <Link href="/privacy" className="text-gray-900 font-semibold">
                Privacy
              </Link>
              <Link href="/terms" className="text-gray-600 hover:text-gray-900">
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-600">Last updated: November 28, 2025</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Introduction</h2>
            <p className="text-gray-700 leading-relaxed">
              Welcome to Campus Photo Collector. We respect your privacy and are committed to protecting it.
              This Privacy Policy explains how we collect, use, and safeguard information when you use our
              photo collection service.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information We Collect</h2>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">Photos You Upload</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              When you upload photos through our service, we collect and store:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>The photo files themselves</li>
              <li>The university you selected (Xidian University or Xi&apos;an Shiyou University)</li>
              <li>Optional descriptions you provide for each photo</li>
              <li>Technical metadata such as file size, file type, and upload timestamp</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">Information We Do NOT Collect</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              We want to be clear about what we do not collect:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>We do not require or collect personal information such as names, email addresses, or phone numbers</li>
              <li>We do not use cookies or tracking technologies</li>
              <li>We do not collect IP addresses or device information</li>
              <li>We do not create user accounts or profiles</li>
            </ul>
          </section>

          {/* How We Use Information */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">How We Use Your Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              The photos and associated information you provide are used exclusively for:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Building a comprehensive dataset of campus images</li>
              <li>Research and educational purposes</li>
              <li>Improving computer vision and machine learning algorithms</li>
              <li>Academic publications and presentations (photos may be used in aggregated form)</li>
            </ul>
          </section>

          {/* Data Storage */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Storage and Security</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We take reasonable measures to protect your uploaded content:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Photos are stored on secure local servers</li>
              <li>We implement standard security practices to prevent unauthorized access</li>
              <li>Files are stored with unique identifiers to prevent naming conflicts</li>
              <li>We maintain backups to prevent data loss</li>
            </ul>
          </section>

          {/* Privacy in Photos */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Privacy Considerations for Photos</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              While we encourage contributions to our dataset, please be mindful of privacy:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Avoid uploading photos where individuals&apos; faces are clearly visible or identifiable</li>
              <li>Do not upload photos containing personal information (IDs, documents, screens with private data)</li>
              <li>Only photograph public spaces that are accessible to the general campus community</li>
              <li>Respect posted photography restrictions on campus</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              By uploading photos, you confirm that you have taken appropriate steps to respect the privacy
              of others and have the right to share the images.
            </p>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Retention</h2>
            <p className="text-gray-700 leading-relaxed">
              Uploaded photos are retained indefinitely as part of our research dataset. Once uploaded,
              photos become part of the permanent collection. Since we do not collect personal information,
              we cannot link uploads to specific individuals for removal requests.
            </p>
          </section>

          {/* Third-Party Sharing */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Third-Party Sharing</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We do not sell or rent your uploaded content to third parties. However, we may share the
              dataset in the following contexts:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>With academic researchers for educational and research purposes</li>
              <li>As part of published research papers or datasets</li>
              <li>With collaborating institutions under research agreements</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              Any sharing is done with the understanding that the photos are for research and educational
              purposes only.
            </p>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Rights and Choices</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Since our service is anonymous and does not collect personal information:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>You can choose to use or not use our service at any time</li>
              <li>You decide what photos to upload and what descriptions to provide</li>
              <li>You can review our guidelines before contributing</li>
              <li>No personal data means no personal profiles to access, correct, or delete</li>
            </ul>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Children&apos;s Privacy</h2>
            <p className="text-gray-700 leading-relaxed">
              Our service is intended for use by individuals associated with the universities (students,
              faculty, staff, and visitors). We do not knowingly collect photos from children under 13.
              If you are under 13, please do not use this service.
            </p>
          </section>

          {/* Changes to Policy */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Changes to This Privacy Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this Privacy Policy from time to time. Any changes will be posted on this page
              with an updated &quot;Last updated&quot; date. We encourage you to review this policy periodically.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have questions or concerns about this Privacy Policy or our practices, please contact
              the research team through your university&apos;s research office.
            </p>
          </section>

          {/* Consent */}
          <section className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Your Consent</h2>
            <p className="text-gray-700 leading-relaxed">
              By using our photo upload service, you acknowledge that you have read and understood this
              Privacy Policy and agree to its terms. If you do not agree with this policy, please do not
              use our service.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
