import { notFound } from 'next/navigation';
import { getSubdomainData, getLibraryDetails } from '@/lib/subdomains';
import { Shield, Lock, Eye, FileText, Database, UserCheck } from 'lucide-react';

export default async function PrivacyPolicyPage({
  params
}: {
  params: Promise<{ subdomain: string }>;
}) {
  const { subdomain } = await params;
  const subdomainData = await getSubdomainData(subdomain);
  const libraryDetails = await getLibraryDetails(subdomain);

  if (!subdomainData) {
    notFound();
  }

  const libraryName = libraryDetails?.name || `${subdomain} Library`;
  const lastUpdated = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl mb-4">
            <Shield className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-base md:text-lg text-gray-600 font-medium">
            {libraryName}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Last updated: {lastUpdated}
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 md:p-10 space-y-8">
          {/* Introduction */}
          <div>
            <h2 className="text-lg font-extrabold text-gray-900 mb-4 flex items-center gap-3">
              <FileText className="w-6 h-6 text-blue-600" />
              Introduction
            </h2>
            <p className="text-gray-700 leading-relaxed font-medium">
              At {libraryName}, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our library services.
            </p>
          </div>

          {/* Information We Collect */}
          <div>
            <h2 className="text-lg font-extrabold text-gray-900 mb-4 flex items-center gap-3">
              <Database className="w-6 h-6 text-blue-600" />
              Information We Collect
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <h3 className="font-bold text-gray-900 mb-2">Personal Information</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1 font-medium text-sm">
                  <li>Name and contact information (email, phone number, address)</li>
                  <li>Membership identification number</li>
                  <li>Date of birth and age verification</li>
                  <li>Government-issued ID information for membership verification</li>
                </ul>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                <h3 className="font-bold text-gray-900 mb-2">Usage Information</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1 font-medium text-sm">
                  <li>Books borrowed and return dates</li>
                  <li>Library facility usage (study rooms, computers, etc.)</li>
                  <li>Event registrations and participation</li>
                  <li>Service requests and inquiries</li>
                </ul>
              </div>
            </div>
          </div>

          {/* How We Use Your Information */}
          <div>
            <h2 className="text-lg font-extrabold text-gray-900 mb-4 flex items-center gap-3">
              <Eye className="w-6 h-6 text-blue-600" />
              How We Use Your Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">Service Delivery</h3>
                <p className="text-sm text-gray-700 font-medium">
                  To provide library services, manage memberships, and process book loans and returns.
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">Communication</h3>
                <p className="text-sm text-gray-700 font-medium">
                  To send notifications about due dates, reservations, events, and important library updates.
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">Service Improvement</h3>
                <p className="text-sm text-gray-700 font-medium">
                  To analyze usage patterns and improve our services and facilities.
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">Legal Compliance</h3>
                <p className="text-sm text-gray-700 font-medium">
                  To comply with legal obligations and respond to lawful requests from authorities.
                </p>
              </div>
            </div>
          </div>

          {/* Data Security */}
          <div>
            <h2 className="text-lg font-extrabold text-gray-900 mb-4 flex items-center gap-3">
              <Lock className="w-6 h-6 text-blue-600" />
              Data Security
            </h2>
            <p className="text-gray-700 leading-relaxed font-medium mb-4">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. Our library management system uses local database storage, ensuring your data remains secure and under our direct control.
            </p>
            <div className="p-4 bg-cyan-50 rounded-lg border border-cyan-200">
              <p className="text-sm text-gray-700 font-medium">
                <strong className="text-gray-900">Note:</strong> All data is stored locally on our systems. We do not use cloud storage or third-party data processors, ensuring maximum security and privacy for your information.
              </p>
            </div>
          </div>

          {/* Your Rights */}
          <div>
            <h2 className="text-lg font-extrabold text-gray-900 mb-4 flex items-center gap-3">
              <UserCheck className="w-6 h-6 text-blue-600" />
              Your Rights
            </h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-white border border-gray-200 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                <p className="text-gray-700 font-medium text-sm">
                  <strong className="text-gray-900">Access:</strong> You have the right to access and review your personal information.
                </p>
              </div>
              <div className="flex items-start gap-3 p-3 bg-white border border-gray-200 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                <p className="text-gray-700 font-medium text-sm">
                  <strong className="text-gray-900">Correction:</strong> You can request corrections to inaccurate or incomplete information.
                </p>
              </div>
              <div className="flex items-start gap-3 p-3 bg-white border border-gray-200 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                <p className="text-gray-700 font-medium text-sm">
                  <strong className="text-gray-900">Deletion:</strong> You may request deletion of your personal information, subject to legal retention requirements.
                </p>
              </div>
              <div className="flex items-start gap-3 p-3 bg-white border border-gray-200 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                <p className="text-gray-700 font-medium text-sm">
                  <strong className="text-gray-900">Objection:</strong> You can object to certain processing activities where applicable.
                </p>
              </div>
            </div>
          </div>

          {/* Data Retention */}
          <div>
            <h2 className="text-lg font-extrabold text-gray-900 mb-4">Data Retention</h2>
            <p className="text-gray-700 leading-relaxed font-medium">
              We retain your personal information for as long as necessary to provide library services and comply with legal obligations. Membership records are typically retained for the duration of your membership plus a reasonable period thereafter for administrative purposes.
            </p>
          </div>

          {/* Changes to This Policy */}
          <div>
            <h2 className="text-lg font-extrabold text-gray-900 mb-4">Changes to This Policy</h2>
            <p className="text-gray-700 leading-relaxed font-medium">
              We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on this page and updating the "Last updated" date. Your continued use of our services after such changes constitutes acceptance of the updated policy.
            </p>
          </div>

          {/* Contact Information */}
          <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-100">
            <h2 className="text-lg font-extrabold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-700 font-medium mb-4">
              If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="space-y-2">
              {libraryDetails?.email && (
                <p className="text-sm font-medium">
                  <strong className="text-gray-900">Email:</strong>{' '}
                  <a href={`mailto:${libraryDetails.email}`} className="text-blue-600 hover:text-blue-700">
                    {libraryDetails.email}
                  </a>
                </p>
              )}
              {libraryDetails?.phone && (
                <p className="text-sm font-medium">
                  <strong className="text-gray-900">Phone:</strong>{' '}
                  <a href={`tel:${libraryDetails.phone}`} className="text-blue-600 hover:text-blue-700">
                    {libraryDetails.phone}
                  </a>
                </p>
              )}
              {libraryDetails?.address && (
                <p className="text-sm font-medium">
                  <strong className="text-gray-900">Address:</strong> {libraryDetails.address}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}