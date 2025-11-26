'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Phone, Calendar, Search, Filter, MessageSquare, Building2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { 
  fetchLeads, 
  selectLeads, 
  selectLoading, 
  selectError,
  updateLead,
  type LibraryLead 
} from '@/lib/store/libraryLeadSlice';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function LeadsOverview() {
  const dispatch = useDispatch();
  const leads = useSelector(selectLeads);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Fetch leads on mount
  useEffect(() => {
    dispatch(fetchLeads() as any);
  }, [dispatch]);

  // Filter leads based on search and status
  const filteredLeads = leads?.filter(lead => {
    const matchesSearch = 
      lead.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.mobileNumber.includes(searchQuery) ||
      lead.library.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.message.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  }) || [];

  const getStatusColor = (status: LibraryLead['status']) => {
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

  const handleStatusChange = async (leadId: string, newStatus: LibraryLead['status']) => {
    try {
      const result = await dispatch(updateLead(leadId, { status: newStatus }) as any);
      if (result.success) {
        toast.success('Lead status updated successfully');
        dispatch(fetchLeads() as any); // Refresh the list
      } else {
        toast.error(result.error || 'Failed to update lead status');
      }
    } catch (error) {
      toast.error('Failed to update lead status');
    }
  };

  if (loading && !leads) {
    return (
      <div className="space-y-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Library Leads</h1>
          <p className="text-sm text-gray-500 mt-2">
            Manage and track your leads from library registrations
          </p>
        </div>
        <Card>
          <CardContent className="p-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
              <p className="mt-4 text-sm text-gray-500">Loading leads...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Library Leads</h1>
          <p className="text-sm text-gray-500 mt-2">
            Manage and track your leads from library registrations
          </p>
        </div>
        <Card>
          <CardContent className="p-12">
            <div className="text-center">
              <p className="text-red-600 mb-4">{error}</p>
              <Button onClick={() => dispatch(fetchLeads() as any)}>
                Retry
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Library Leads</h1>
        <p className="text-sm text-gray-500 mt-2">
          Manage and track your leads from library registrations
        </p>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <CardTitle>All Library Leads ({filteredLeads.length})</CardTitle>
            <div className="flex gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-initial">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search leads..."
                  className="pl-10 w-full sm:w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="qualified">Qualified</SelectItem>
                  <SelectItem value="converted">Converted</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredLeads.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <Mail className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {leads && leads.length > 0 ? 'No leads match your filters' : 'No leads yet'}
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                {leads && leads.length > 0 
                  ? 'Try adjusting your search or filter criteria'
                  : 'Leads from library registrations will appear here'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredLeads.map((lead) => (
                <Card key={lead._id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <h3 className="font-semibold text-gray-900">{lead.fullName}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                            {lead.status}
                          </span>
                        </div>
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            {lead.mobileNumber}
                          </div>
                          <div className="flex items-center gap-2">
                            <Building2 className="w-4 h-4" />
                            {lead.library}
                          </div>
                          {lead.message && (
                            <div className="flex items-start gap-2">
                              <MessageSquare className="w-4 h-4 mt-0.5 flex-shrink-0" />
                              <span className="line-clamp-2">{lead.message}</span>
                            </div>
                          )}
                          {lead.createdAt && (
                            <div className="flex items-center gap-2 text-xs text-gray-400">
                              <Calendar className="w-3 h-3" />
                              {new Date(lead.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Select
                          value={lead.status}
                          onValueChange={(value) => handleStatusChange(lead._id!, value as LibraryLead['status'])}
                        >
                          <SelectTrigger className="w-[140px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="new">New</SelectItem>
                            <SelectItem value="contacted">Contacted</SelectItem>
                            <SelectItem value="qualified">Qualified</SelectItem>
                            <SelectItem value="converted">Converted</SelectItem>
                          </SelectContent>
                        </Select>
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
