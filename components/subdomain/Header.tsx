'use client';

import { useState } from 'react';
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

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/facilities', label: 'Facilities' },
  { href: '/shift-plans', label: 'Shift & Plans' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function SubdomainHeader({ 
  libraryDetails,
  subdomain 
}: { 
  libraryDetails?: LibraryDetails;
  subdomain: string;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Base URL for links in the subdomain
  const baseUrl = `${protocol}://${subdomain}.${rootDomain}`;

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b-2 border-gray-200 backdrop-blur-sm bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Name */}
          <Link href={baseUrl} className="flex items-center gap-3 group">
            {libraryDetails?.logo ? (
              <div className="relative">
                <Image 
                  src={libraryDetails.logo} 
                  alt={libraryDetails.name || 'Library'} 
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-lg object-cover ring-2 ring-gray-100 group-hover:ring-blue-500 transition-all duration-300 shadow-md"
                />
              </div>
            ) : (
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 flex items-center justify-center shadow-lg ring-2 ring-blue-100 group-hover:ring-blue-300 transition-all duration-300">
                <span className="text-xl">🏛️</span>
              </div>
            )}
            <div>
              <h1 className="text-xl font-extrabold text-gray-900 tracking-tight leading-tight">
                {libraryDetails?.name || `${subdomain} Library`}
              </h1>
            </div>
          </Link>

          {/* Navigation Links and CTA */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map(item => (
              <Link 
                key={item.href}
                href={`${baseUrl}${item.href === '/' ? '' : item.href}`}
                className="text-gray-800 font-bold text-md hover:text-blue-600 transition-all duration-200 relative group py-2"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
            <Link
              href={`${baseUrl}/book-now`}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-2 rounded-lg font-bold text-sm hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 ml-3 border border-blue-500/20"
            >
              Book Now
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-800 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-gray-100" 
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t-2 border-gray-200 py-3 space-y-2 bg-gradient-to-b from-white to-gray-50">
            {navItems.map(item => (
              <Link 
                key={item.href}
                href={`${baseUrl}${item.href === '/' ? '' : item.href}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-gray-800 font-bold text-sm hover:text-blue-600 transition-colors py-2 px-2 rounded-lg hover:bg-blue-50"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={`${baseUrl}/book-now`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-2.5 rounded-lg font-bold text-center hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md mt-3 text-sm"
            >
              Book Now
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
