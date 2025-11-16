'use client';

import { useState, useEffect } from 'react';
import { Bell, Search, User, LogOut, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { logoutAction } from '@/actions';
import { rootDomain, protocol } from '@/lib/utils';
import Link from 'next/link';

type SessionData = {
  email: string;
  subdomain?: string;
  isAdmin?: boolean;
  loginTime: number;
};

export default function Header() {
  const [session, setSession] = useState<SessionData | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    // Fetch session data
    fetch('/api/auth/session')
      .then(res => res.json())
      .then(data => {
        if (data.authenticated && data.session) {
          setSession(data.session);
        }
      })
      .catch(() => {});
  }, []);

  const userInitials = session?.email
    ? session.email.substring(0, 2).toUpperCase()
    : 'U';

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Search */}
          <div className="flex-1 flex items-center gap-4">
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center gap-3">
            {/* Notifications */}
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center text-white text-sm font-medium">
                  {userInitials}
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-gray-900">
                    {session?.email || 'User'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {session?.isAdmin ? 'Admin' : 'User'}
                  </p>
                </div>
              </button>

              {/* Dropdown Menu */}
              {showUserMenu && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowUserMenu(false)}
                  />
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                    <div className="px-4 py-3 border-b border-gray-200">
                      <p className="text-sm font-medium text-gray-900">
                        {session?.email || 'User'}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {session?.isAdmin ? 'Administrator' : 'Regular User'}
                      </p>
                    </div>
                    <Link
                      href="/dashboard/settings"
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <Settings className="w-4 h-4" />
                      Settings
                    </Link>
                    <Link
                      href={`${protocol}://${rootDomain}`}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <User className="w-4 h-4" />
                      View Website
                    </Link>
                    <div className="border-t border-gray-200 my-1" />
                    <form action={logoutAction}>
                      <button
                        type="submit"
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </form>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
