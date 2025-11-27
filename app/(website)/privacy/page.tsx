import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | Library Saathi",
  description: "Privacy Policy for Library Saathi",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-cyan-600 to-sky-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-blue-50 max-w-3xl mx-auto">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 sm:p-12 shadow-lg">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                1. Introduction
              </h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                Welcome to Library Saathi. We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our library management system.
              </p>

              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4 mt-8">
                2. Local Database & Data Storage
              </h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                Library Saathi uses a local database system, which means:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                <li>All your data is stored locally on your system or server</li>
                <li>We do not store your data on cloud servers</li>
                <li>You have complete control over your data</li>
                <li>No third-party has access to your library data</li>
                <li>Zero risk of data breaches from external sources</li>
              </ul>

              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4 mt-8">
                3. Information We Collect
              </h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                When you register your library or contact us, we may collect:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                <li>Library name and contact information</li>
                <li>Owner/Manager name and email address</li>
                <li>Phone number and address</li>
                <li>Library type and member information</li>
                <li>Any other information you provide to us</li>
              </ul>

              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4 mt-8">
                4. How We Use Your Information
              </h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                <li>Provide and maintain our services</li>
                <li>Respond to your inquiries and support requests</li>
                <li>Send you important updates and notifications</li>
                <li>Improve our services and user experience</li>
                <li>Comply with legal obligations</li>
              </ul>

              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4 mt-8">
                5. Data Security
              </h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                Since Library Saathi uses local database storage, your data security is primarily your responsibility. We recommend:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                <li>Regular backups of your database</li>
                <li>Secure access controls to your system</li>
                <li>Regular software updates</li>
                <li>Strong password policies</li>
                <li>Network security measures</li>
              </ul>

              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4 mt-8">
                6. Your Rights
              </h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Export your data at any time</li>
                <li>Opt-out of marketing communications</li>
              </ul>

              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4 mt-8">
                7. Contact Us
              </h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-2">
                Email: privacy@librarysaathi.in
              </p>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                Phone: +91 1234567890
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

