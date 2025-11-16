import Link from 'next/link';
import { protocol, rootDomain } from '@/lib/utils';

export default function SubdomainNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Subdomain Not Found</h1>
        <p className="text-lg text-gray-600 mb-8">
          This subdomain doesn&apos;t exist or hasn&apos;t been created yet.
        </p>
        <div className="space-y-4">
          <Link
            href={`${protocol}://${rootDomain}`}
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}

