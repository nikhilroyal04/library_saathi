import Link from 'next/link';
import Image from 'next/image';
import { protocol, rootDomain } from '@/lib/utils';

type LibraryDetails = {
  name?: string;
  logo?: string;
  email?: string;
  phone?: string;
  address?: string;
};

export default function SubdomainHeader({ 
  libraryDetails,
  subdomain 
}: { 
  libraryDetails?: LibraryDetails;
  subdomain: string;
}) {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Name */}
          <Link href={`${protocol}://${subdomain}.${rootDomain}`} className="flex items-center gap-3">
            {libraryDetails?.logo ? (
              <Image 
                src={libraryDetails.logo} 
                alt={libraryDetails.name || 'Library'} 
                width={40}
                height={40}
                className="h-10 w-10 rounded-lg object-cover"
              />
            ) : (
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center">
                <span className="text-xl">🏛️</span>
              </div>
            )}
            <div>
              <h1 className="text-lg font-bold text-gray-900">
                {libraryDetails?.name || `${subdomain} Library`}
              </h1>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href={`${protocol}://${subdomain}.${rootDomain}`} className="text-gray-700 hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link href={`${protocol}://${subdomain}.${rootDomain}/about`} className="text-gray-700 hover:text-blue-600 transition-colors">
              About
            </Link>
            <Link href={`${protocol}://${subdomain}.${rootDomain}/contact`} className="text-gray-700 hover:text-blue-600 transition-colors">
              Contact
            </Link>
            {libraryDetails?.phone && (
              <a 
                href={`tel:${libraryDetails.phone}`}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Call Us
              </a>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

