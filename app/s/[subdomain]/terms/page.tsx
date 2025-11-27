'use client';

import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLibraries, selectLibraries, findLibraryBySubdomainOrCustomDomain } from '@/lib/store/librarySlice';
import { useSubdomainParams } from '@/lib/hooks/useSubdomainParams';
import { Scale, BookOpen, AlertCircle, CheckCircle, XCircle, FileText } from 'lucide-react';  

interface TermsPageProps {
  params: Promise<{ subdomain: string }> | { subdomain: string };
}

export default function TermsPage({ params }: TermsPageProps) {
  const { subdomain } = useSubdomainParams(params);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLibraries() as any);
  }, [dispatch]);

  const libraries = useSelector(selectLibraries);
  const selectedLibrary = useMemo(() => {
    return findLibraryBySubdomainOrCustomDomain(libraries, subdomain);
  }, [libraries, subdomain]);

  const libraryName = selectedLibrary?.name || `${subdomain} Library`;
  const libraryDetails = selectedLibrary;
  
  // Use library terms if available, otherwise use default
  const termsContent = selectedLibrary?.terms?.content;
  const lastUpdated = selectedLibrary?.terms?.lastUpdated 
    ? new Date(selectedLibrary.terms.lastUpdated).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="bg-white">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-2xl mb-4">
            <Scale className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Terms of Service
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
          {termsContent ? (
            <div className="prose max-w-none">
              <div 
                className="text-gray-600 leading-relaxed whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: termsContent.replace(/\n/g, '<br />') }}
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
                  Welcome to {libraryName}. By accessing and using our library services, you agree to comply with and be bound by the following terms and conditions. Please read these terms carefully before using our services.
                </p>
              </div>

          {/* Membership Terms */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-blue-600" />
              Membership Terms
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                  Eligibility
                </h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm ml-7">
                  <li>Membership is open to all individuals who meet our eligibility criteria</li>
                  <li>Valid government-issued ID is required for membership registration</li>
                  <li>Members must be at least 18 years old, or have parental consent if under 18</li>
                  <li>Membership cards are non-transferable and must be presented when using library services</li>
                </ul>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Membership Responsibilities
                </h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm ml-7">
                  <li>Keep your membership information up to date</li>
                  <li>Report lost or stolen membership cards immediately</li>
                  <li>Comply with all library rules and regulations</li>
                  <li>Respect library property and other members</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Borrowing Terms */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Borrowing Terms</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Loan Periods</h3>
                <p className="text-sm text-gray-600">
                  Books are typically loaned for 14 days. Extended loan periods may be available for certain materials. Renewals are subject to availability.
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">Return Policy</h3>
                <p className="text-sm text-gray-700 font-medium">
                  Books must be returned on or before the due date. Late returns may result in fines as per our fee structure.
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">Renewals</h3>
                <p className="text-sm text-gray-700 font-medium">
                  Books can be renewed online, in person, or by phone, provided they are not reserved by another member.
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">Reservations</h3>
                <p className="text-sm text-gray-700 font-medium">
                  Members can reserve books that are currently on loan. Reserved books will be held for 3 days upon return.
                </p>
              </div>
            </div>
          </div>

          {/* Fees and Charges */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Fees and Charges</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Late Fees</h3>
                  <p className="text-sm text-gray-600">
                    A late fee of ₹5 per day per book applies for items returned after the due date. Maximum late fees may apply as per library policy.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg border border-orange-200">
                <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Lost or Damaged Items</h3>
                  <p className="text-sm text-gray-700 font-medium">
                    Members are responsible for lost or damaged library materials and may be charged replacement costs plus processing fees.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Membership Fees</h3>
                  <p className="text-sm text-gray-700 font-medium">
                    Annual, half-yearly, and monthly membership plans are available. Fees vary based on membership type. Please contact us for detailed pricing.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Code of Conduct */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Code of Conduct</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-white border border-gray-200 rounded-lg">
                <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <p className="text-gray-600 text-sm">
                  <strong className="text-gray-900">Prohibited:</strong> Disruptive behavior, loud conversations, use of mobile phones in quiet zones, eating in restricted areas, and any activity that disturbs other members.
                </p>
              </div>
              <div className="flex items-start gap-3 p-3 bg-white border border-gray-200 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700 font-medium text-sm">
                  <strong className="text-gray-900">Expected:</strong> Respectful behavior, maintaining quiet in designated areas, proper care of library materials, and following staff instructions.
                </p>
              </div>
            </div>
          </div>

          {/* Liability */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Limitation of Liability</h2>
            <p className="text-gray-600 leading-relaxed">
              {libraryName} shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our services. While we strive to provide accurate information and maintain our facilities, we do not guarantee uninterrupted access or error-free service.
            </p>
          </div>

          {/* Changes to Terms */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Changes to Terms</h2>
            <p className="text-gray-600 leading-relaxed">
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on this page. Your continued use of our services after changes are posted constitutes acceptance of the modified terms.
            </p>
          </div>

          {/* Contact Information */}
          <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about these Terms of Service, please contact us:
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