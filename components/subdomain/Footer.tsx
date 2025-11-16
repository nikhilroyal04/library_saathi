import Link from 'next/link';
import { protocol, rootDomain } from '@/lib/utils';

type LibraryDetails = {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
};

export default function SubdomainFooter({ 
  libraryDetails,
  subdomain 
}: { 
  libraryDetails?: LibraryDetails;
  subdomain: string;
}) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {libraryDetails?.name || `${subdomain} Library`}
            </h3>
            <p className="text-gray-400 text-sm">
              Your trusted library management solution powered by Library Saathi.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={`${protocol}://${subdomain}.${rootDomain}`} className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href={`${protocol}://${subdomain}.${rootDomain}/about`} className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href={`${protocol}://${subdomain}.${rootDomain}/contact`} className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              {libraryDetails?.email && (
                <li>
                  <a href={`mailto:${libraryDetails.email}`} className="hover:text-white transition-colors">
                    {libraryDetails.email}
                  </a>
                </li>
              )}
              {libraryDetails?.phone && (
                <li>
                  <a href={`tel:${libraryDetails.phone}`} className="hover:text-white transition-colors">
                    {libraryDetails.phone}
                  </a>
                </li>
              )}
              {libraryDetails?.address && (
                <li className="text-gray-400">
                  {libraryDetails.address}
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>© {currentYear} {libraryDetails?.name || `${subdomain} Library`}. All rights reserved.</p>
          <p className="mt-2">Powered by <a href={`${protocol}://${rootDomain}`} className="text-blue-400 hover:text-blue-300">Library Saathi</a></p>
        </div>
      </div>
    </footer>
  );
}

