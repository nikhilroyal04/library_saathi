'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, TrendingUp, Users, Activity } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

type SessionData = {
  email: string;
  subdomain?: string;
  isAdmin?: boolean;
  loginTime: number;
};

export default function DashboardOverview({ 
  session, 
  totalSubdomains 
}: { 
  session: SessionData; 
  totalSubdomains: number;
}) {
  const stats = [
    {
      name: 'Total Subdomains',
      value: totalSubdomains,
      icon: Globe,
      href: '/dashboard/subdomains',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      name: 'Leads',
      value: 0,
      icon: TrendingUp,
      href: '/dashboard/leads',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      name: 'Total Users',
      value: 1,
      icon: Users,
      href: '/dashboard/users',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      name: 'Active Sessions',
      value: 1,
      icon: Activity,
      href: '#',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-2">
          Welcome back, {session.email}! Here&apos;s an overview of your platform.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.name} href={stat.href}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    {stat.name}
                  </CardTitle>
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Link href="/dashboard/subdomains">
              <Button variant="outline" className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Manage Subdomains
              </Button>
            </Link>
            <Link href="/dashboard/leads">
              <Button variant="outline" className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                View Leads
              </Button>
            </Link>
            <Link href="/dashboard/settings">
              <Button variant="outline" className="flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Settings
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <p>No recent activity to display</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

