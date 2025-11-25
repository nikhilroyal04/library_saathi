'use client';

import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLibraries, selectLibraries } from '@/lib/store/librarySlice';
import { useSubdomainParams } from '@/lib/hooks/useSubdomainParams';
import { Shield, Lock, Eye, FileText, Database, UserCheck } from 'lucide-react';

interface PrivacyPolicyPageProps {
  params: Promise<{ subdomain: string }> | { subdomain: string };
}

export default function PrivacyPolicyPage({ params }: PrivacyPolicyPageProps) {
  const { subdomain } = useSubdomainParams(params);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLibraries() as any);
  }, [dispatch]);

  const libraries = useSelector(selectLibraries);
  const selectedLibrary = useMemo(() => {
    if (!libraries || !Array.isArray(libraries) || !subdomain) return undefined;
    return libraries.find(lib => lib?.subdomain === subdomain);
  }, [libraries, subdomain]);

  const libraryName = selectedLibrary?.name || `${subdomain} Library`;
  const libraryDetails = selectedLibrary;
  
  // Use library privacy policy if available, otherwise use default
  const privacyContent = selectedLibrary?.privacyPolicy?.content;
  const lastUpdated = selectedLibrary?.privacyPolicy?.lastUpdated 
    ? new Date(selectedLibrary.privacyPolicy.lastUpdated).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="bg-white">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-2xl mb-4">
            <Shield className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-base text-gray-600">
            {libraryName}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Last updated: {lastUpdated}
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg border border-gray-200 p-8 md:p-10 space-y-8">
          {privacyContent ? (
            <div className="prose max-w-none">
              <div 
                className="text-gray-600 leading-relaxed whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: privacyContent.replace(/\n/g, '<br />') }}
              />
            </div>
          ) : (
            <>
              {/* Introduction */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-3">
                  <FileText className="w-6 h-6 text-blue-600" />
                  Introduction
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  At {libraryName}, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our library services.
                </p>
              </div>

          {/* Information We Collect */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-3">
              <Database className="w-6 h-6 text-blue-600" />
              Information We Collect
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <h3 className="font-semibold text-gray-900 mb-2">Personal Information</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm">
                  <li>Name and contact information (email, phone number, address)</li>
                  <li>Membership identification number</li>
                  <li>Date of birth and age verification</li>
                  <li>Government-issued ID information for membership verification</li>
                </ul>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                <h3 className="font-semibold text-gray-900 mb-2">Usage Information</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm">
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
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-3">
              <Eye className="w-6 h-6 text-blue-600" />
              How We Use Your Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Service Delivery</h3>
                <p className="text-sm text-gray-600">
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
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-3">
              <Lock className="w-6 h-6 text-blue-600" />
              Data Security
            </h2>
            <p className="text-gray-700 leading-relaxed font-medium mb-4">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. Our library management system uses local database storage, ensuring your data remains secure and under our direct control.
            </p>
            <div className="p-4 bg-cyan-50 rounded-lg border border-cyan-200">
              <p className="text-sm text-gray-600">
                <strong className="text-gray-900">Note:</strong> All data is stored locally on our systems. We do not use cloud storage or third-party data processors, ensuring maximum security and privacy for your information.
              </p>
            </div>
          </div>

          {/* Your Rights */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-3">
              <UserCheck className="w-6 h-6 text-blue-600" />
              Your Rights
            </h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-white border border-gray-200 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                <p className="text-gray-600 text-sm">
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
            <p className="text-gray-600 leading-relaxed">
              We retain your personal information for as long as necessary to provide library services and comply with legal obligations. Membership records are typically retained for the duration of your membership plus a reasonable period thereafter for administrative purposes.
            </p>
          </div>

          {/* Changes to This Policy */}
          <div>
            <h2 className="text-lg font-extrabold text-gray-900 mb-4">Changes to This Policy</h2>
            <p className="text-gray-600 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on this page and updating the "Last updated" date. Your continued use of our services after such changes constitutes acceptance of the updated policy.
            </p>
          </div>

          {/* Contact Information */}
          <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-600 mb-4">
              If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="space-y-2">
              {libraryDetails?.email && (
                <p className="text-sm font-semibold">
                  <strong className="text-gray-900">Email:</strong>{' '}
                  <a href={`mailto:${libraryDetails.email}`} className="text-blue-600 hover:text-blue-700">
                    {libraryDetails.email}
                  </a>
                </p>
              )}
              {libraryDetails?.phone && (
                <p className="text-sm font-semibold">
                  <strong className="text-gray-900">Phone:</strong>{' '}
                  <a href={`tel:${libraryDetails.phone}`} className="text-blue-600 hover:text-blue-700">
                    {libraryDetails.phone}
                  </a>
                </p>
              )}
              {libraryDetails?.address && (
                <p className="text-sm font-semibold">
                  <strong className="text-gray-900">Address:</strong> {libraryDetails.address}
                </p>
              )}
            </div>
          </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}