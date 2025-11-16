import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms and Conditions | Library Saathi",
  description: "Terms and Conditions for Library Saathi",
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-cyan-600 to-sky-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-4">
            Terms and Conditions
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
                1. Acceptance of Terms
              </h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                By accessing and using Library Saathi, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>

              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4 mt-8">
                2. Use License
              </h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                Permission is granted to temporarily use Library Saathi for personal or commercial library management purposes. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                <li>Modify or copy the software</li>
                <li>Use the software for any commercial purpose without proper licensing</li>
                <li>Attempt to reverse engineer or decompile the software</li>
                <li>Remove any copyright or proprietary notations</li>
                <li>Transfer the software to another person or entity</li>
              </ul>

              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4 mt-8">
                3. Local Database Responsibility
              </h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                Since Library Saathi uses local database storage:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                <li>You are responsible for maintaining and backing up your data</li>
                <li>We are not responsible for data loss due to system failures</li>
                <li>You must ensure proper security measures for your system</li>
                <li>Regular backups are highly recommended</li>
                <li>We provide tools for data export and backup</li>
              </ul>

              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4 mt-8">
                4. User Account
              </h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                When you create an account with us, you must provide accurate, complete, and current information. You are responsible for:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                <li>Maintaining the security of your account and password</li>
                <li>All activities that occur under your account</li>
                <li>Notifying us immediately of any unauthorized use</li>
                <li>Ensuring you exit from your account at the end of each session</li>
              </ul>

              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4 mt-8">
                5. Service Availability
              </h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                We strive to provide reliable service, but we do not guarantee that the service will be available at all times. The service may be unavailable due to maintenance, updates, or unforeseen circumstances. Since the system uses local database, service availability depends on your system&apos;s availability.
              </p>

              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4 mt-8">
                6. Limitation of Liability
              </h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                In no event shall Library Saathi or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Library Saathi, even if we or an authorized representative has been notified orally or in writing of the possibility of such damage.
              </p>

              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4 mt-8">
                7. Modifications
              </h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                Library Saathi may revise these terms of service at any time without notice. By using this service you are agreeing to be bound by the then current version of these terms of service.
              </p>

              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4 mt-8">
                8. Contact Information
              </h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                If you have any questions about these Terms and Conditions, please contact us at:
              </p>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-2">
                Email: legal@librarysaathi.com
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

