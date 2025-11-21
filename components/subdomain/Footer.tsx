import Link from 'next/link';
import { protocol, rootDomain } from '@/lib/utils';
import { Mail, Phone, MapPin, Home, Info, MessageCircle, BookOpen, Calendar, Image as ImageIcon, FileText } from 'lucide-react';

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
  const baseUrl = `${protocol}://${subdomain}.${rootDomain}`;

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white mt-auto relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-600/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <h3 className="text-xl font-extrabold mb-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {libraryDetails?.name || `${subdomain} Library`}
              </h3>
              <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mb-4"></div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed font-medium">
              Your trusted library management solution powered by Library Saathi. Empowering libraries with modern technology.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-extrabold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href={baseUrl} 
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-all duration-200 group text-sm font-medium"
                >
                  <Home className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  <span className="group-hover:translate-x-1 transition-transform">Home</span>
                </Link>
              </li>
              <li>
                <Link 
                  href={`${baseUrl}/about`} 
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-all duration-200 group text-sm font-medium"
                >
                  <Info className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  <span className="group-hover:translate-x-1 transition-transform">About Us</span>
                </Link>
              </li>
              <li>
                <Link 
                  href={`${baseUrl}/contact`} 
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-all duration-200 group text-sm font-medium"
                >
                  <MessageCircle className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  <span className="group-hover:translate-x-1 transition-transform">Contact</span>
                </Link>
              </li>
              <li>
                <Link 
                  href={`${baseUrl}/gallery`} 
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-all duration-200 group text-sm font-medium"
                >
                  <ImageIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  <span className="group-hover:translate-x-1 transition-transform">Gallery</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-extrabold mb-4 text-white">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href={`${baseUrl}/shift-plans`} 
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-all duration-200 group text-sm font-medium"
                >
                  <Calendar className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  <span className="group-hover:translate-x-1 transition-transform">Shift Plans</span>
                </Link>
              </li>
              <li>
                <Link 
                  href={`${baseUrl}/facilities`} 
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-all duration-200 group text-sm font-medium"
                >
                  <BookOpen className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  <span className="group-hover:translate-x-1 transition-transform">Facilities</span>
                </Link>
              </li>
              <li>
                <Link 
                  href={`${baseUrl}/book-now`} 
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-all duration-200 group text-sm font-medium"
                >
                  <Calendar className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  <span className="group-hover:translate-x-1 transition-transform">Book Now</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-extrabold mb-4 text-white">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href={`${baseUrl}/privacy-policy`} 
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-all duration-200 group text-sm font-medium"
                >
                  <FileText className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  <span className="group-hover:translate-x-1 transition-transform">Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link 
                  href={`${baseUrl}/terms`} 
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-all duration-200 group text-sm font-medium"
                >
                  <FileText className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  <span className="group-hover:translate-x-1 transition-transform">Terms of Service</span>
                </Link>
              </li>
              {libraryDetails?.email && (
                <li>
                  <a 
                    href={`mailto:${libraryDetails.email}`} 
                    className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition-all duration-200 group text-sm font-medium"
                  >
                    <div className="p-1.5 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors">
                      <Mail className="w-4 h-4 text-blue-400" />
                    </div>
                    <span className="group-hover:translate-x-1 transition-transform">{libraryDetails.email}</span>
                  </a>
                </li>
              )}
              {libraryDetails?.phone && (
                <li>
                  <a 
                    href={`tel:${libraryDetails.phone}`} 
                    className="flex items-center gap-2 text-gray-300 hover:text-green-400 transition-all duration-200 group text-sm font-medium"
                  >
                    <div className="p-1.5 bg-green-500/20 rounded-lg group-hover:bg-green-500/30 transition-colors">
                      <Phone className="w-4 h-4 text-green-400" />
                    </div>
                    <span className="group-hover:translate-x-1 transition-transform">{libraryDetails.phone}</span>
                  </a>
                </li>
              )}
              {libraryDetails?.address && (
                <li className="flex items-start gap-2 text-gray-300 text-sm font-medium">
                  <div className="p-1.5 bg-purple-500/20 rounded-lg mt-0.5">
                    <MapPin className="w-4 h-4 text-purple-400" />
                  </div>
                  <span>{libraryDetails.address}</span>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700/50 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-400 font-medium">
              <p>© {currentYear} <span className="text-white font-bold">{libraryDetails?.name || `${subdomain} Library`}</span>. All rights reserved.</p>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-400 font-medium">Powered by</span>
              <a 
                href={`${protocol}://${rootDomain}`} 
                className="font-extrabold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent hover:from-blue-300 hover:to-cyan-300 transition-all duration-200"
              >
                Library Saathi
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

