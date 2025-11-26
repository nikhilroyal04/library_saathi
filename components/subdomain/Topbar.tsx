'use client';

import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLibraries, selectLibraries } from '@/lib/store/librarySlice';
import { usePathname } from 'next/navigation';


const Topbar = () => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  
  // Extract subdomain from pathname (e.g., /s/vikrant/...)
  const subdomain = useMemo(() => {
    const pathParts = pathname?.split('/') || [];
    const subdomainIndex = pathParts.indexOf('s');
    return subdomainIndex >= 0 && pathParts[subdomainIndex + 1] 
      ? pathParts[subdomainIndex + 1] 
      : null;
  }, [pathname]);

  useEffect(() => {
    if (subdomain) {
      dispatch(fetchLibraries() as any);
    }
  }, [dispatch, subdomain]);

  const libraries = useSelector(selectLibraries);
  const selectedLibrary = useMemo(() => {
    if (!libraries || !Array.isArray(libraries) || !subdomain) return undefined;
    return libraries.find(lib => lib?.subdomain === subdomain);
  }, [libraries, subdomain]);

  // Use library topbar message if available, otherwise use default
  const message = selectedLibrary?.topbar || '';

  // Don't render if no message
  if (!message) return null;

  return (
    <div className="w-full bg-gradient-to-r from-blue-600 to-cyan-400 text-white h-7 flex items-center px-2 shadow-md z-50 relative overflow-hidden">
      <div className="flex-1 overflow-hidden">
        <div className="animate-scroll-left font-semibold text-xs md:text-sm whitespace-nowrap inline-block">
          {message}
        </div>
      </div>
    </div>
  );
};

export default Topbar;