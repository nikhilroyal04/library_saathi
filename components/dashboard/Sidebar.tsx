'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Globe, 
  Settings, 
  TrendingUp
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Subdomains', href: '/dashboard/subdomains', icon: Globe },
  { name: 'Leads', href: '/dashboard/leads', icon: TrendingUp },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center">
            <span className="text-xl">🏛️</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">Library Saathi</h1>
            <p className="text-xs text-gray-500">Dashboard</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              <item.icon className={cn(
                'w-5 h-5',
                isActive ? 'text-blue-600' : 'text-gray-400'
              )} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="px-3 py-2 text-xs text-gray-500">
          <p className="font-medium text-gray-700 mb-1">Library Saathi</p>
          <p>Version 1.0.0</p>
        </div>
      </div>
    </aside>
  );
}
