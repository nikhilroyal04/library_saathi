'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Phone, Calendar, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';

type Lead = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted';
  createdAt: string;
};

export default function LeadsOverview() {
  // Mock data - replace with actual data fetching
  const leads: Lead[] = [];

  const getStatusColor = (status: Lead['status']) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'contacted':
        return 'bg-yellow-100 text-yellow-800';
      case 'qualified':
        return 'bg-green-100 text-green-800';
      case 'converted':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Leads</h1>
        <p className="text-sm text-gray-500 mt-2">
          Manage and track your leads from library registrations
        </p>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <CardTitle>All Leads</CardTitle>
            <div className="flex gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-initial">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search leads..."
                  className="pl-10 w-full sm:w-64"
                />
              </div>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {leads.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <Mail className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No leads yet</h3>
              <p className="text-sm text-gray-500 mb-4">
                Leads from library registrations will appear here
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {leads.map((lead) => (
                <Card key={lead.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-gray-900">{lead.name}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                            {lead.status}
                          </span>
                        </div>
                        <div className="space-y-1 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            {lead.email}
                          </div>
                          {lead.phone && (
                            <div className="flex items-center gap-2">
                              <Phone className="w-4 h-4" />
                              {lead.phone}
                            </div>
                          )}
                          {lead.company && (
                            <div className="text-gray-500">{lead.company}</div>
                          )}
                          <div className="flex items-center gap-2 text-xs text-gray-400">
                            <Calendar className="w-3 h-3" />
                            {new Date(lead.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

