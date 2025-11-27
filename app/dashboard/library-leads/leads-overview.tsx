'use client';

import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Phone, Calendar, Search, MessageSquare, Building2, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { 
  fetchLeads, 
  selectLeads, 
  selectLoading, 
  selectError,
  updateLead,
  type Lead 
} from '@/lib/store/leadSlice';
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

  // Get all unique status values from leads dynamically
  const availableStatuses = useMemo(() => {
    if (!leads || leads.length === 0) return [];
    const statuses = new Set<string>();
    leads.forEach(lead => {
      if (lead.status && typeof lead.status === 'string') {
        statuses.add(lead.status);
      }
    });
    return Array.from(statuses).sort();
  }, [leads]);

  // Helper function to search across all string fields in a lead
  const searchInLead = (lead: Lead, query: string): boolean => {
    if (!query) return true;
    const lowerQuery = query.toLowerCase();
    
    // Search in all string/number fields
    for (const key in lead) {
      if (key === '_id' || key === 'product') continue; // Skip _id and product object
      
      const value = lead[key];
      if (value === null || value === undefined) continue;
      
      // Handle string values
      if (typeof value === 'string' && value.toLowerCase().includes(lowerQuery)) {
        return true;
      }
      
      // Handle number values
      if (typeof value === 'number' && value.toString().includes(lowerQuery)) {
        return true;
      }
      
      // Handle product object
      if (key === 'product' && typeof value === 'object' && value !== null) {
        const product = value as { _id?: string; name?: string };
        if (product.name && product.name.toLowerCase().includes(lowerQuery)) {
          return true;
        }
      }
    }
    
    return false;
  };

  // Filter leads based on search and status
  const filteredLeads = leads?.filter(lead => {
    const matchesSearch = searchInLead(lead, searchQuery);
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  }) || [];

  const getStatusColor = (status: string | undefined) => {
    if (!status) return 'bg-gray-100 text-gray-800';
    
    switch (status.toLowerCase()) {
      case 'new':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'contacted':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'qualified':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'converted':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      case 'lost':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const handleStatusChange = async (leadId: string, newStatus: string) => {
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

  // Helper function to get display value for a field
  const getFieldValue = (value: any): string => {
    if (value === null || value === undefined) return '';
    if (typeof value === 'object') {
      if (value._id && value.name) return value.name;
      return JSON.stringify(value);
    }
    return String(value);
  };

  // Helper function to get field label (human-readable)
  const getFieldLabel = (key: string): string => {
    // Common field mappings
    const labelMap: Record<string, string> = {
      subdomain: 'Subdomain',
      product: 'Product',
      name: 'Name',
      fullName: 'Name',
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email',
      phone: 'Phone',
      mobileNumber: 'Phone',
      message: 'Message',
      subject: 'Subject',
      library: 'Library',
      status: 'Status',
      createdOn: 'Created',
      updatedOn: 'Updated',
      createdAt: 'Created',
      updatedAt: 'Updated',
    };
    
    return labelMap[key] || key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
  };

  // Get fields to display (exclude internal fields)
  const getDisplayFields = (lead: Lead): Array<{ key: string; value: any; label: string }> => {
    const excludeFields = ['_id', 'subdomain', 'product', 'status', 'createdOn', 'updatedOn', 'createdAt', 'updatedAt'];
    const fields: Array<{ key: string; value: any; label: string }> = [];
    
    // Add subdomain and product first (required fields)
    if (lead.subdomain) {
      fields.push({ key: 'subdomain', value: lead.subdomain, label: 'Subdomain' });
    }
    
    if (lead.product) {
      const productName = typeof lead.product === 'object' && lead.product.name 
        ? lead.product.name 
        : typeof lead.product === 'string' 
        ? lead.product 
        : 'Product';
      fields.push({ key: 'product', value: productName, label: 'Product' });
    }
    
    // Add all other fields
    for (const key in lead) {
      if (excludeFields.includes(key)) continue;
      
      const value = lead[key];
      if (value === null || value === undefined || value === '') continue;
      
      // Skip functions and complex objects (except product which we already handled)
      if (typeof value === 'function') continue;
      if (typeof value === 'object' && !Array.isArray(value) && key !== 'product') continue;
      
      fields.push({ 
        key, 
        value, 
        label: getFieldLabel(key) 
      });
    }
    
    return fields;
  };

  if (loading && !leads) {
    return (
      <div className="space-y-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Library Leads</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Manage and track your leads from library registrations
          </p>
        </div>
        <Card>
          <CardContent className="p-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-gray-100 mx-auto"></div>
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">Loading leads...</p>
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Library Leads</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Manage and track your leads from library registrations
          </p>
        </div>
        <Card>
          <CardContent className="p-12">
            <div className="text-center">
              <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
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
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Library Leads</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
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
                  placeholder="Search all fields..."
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
                  {availableStatuses.map(status => (
                    <SelectItem key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredLeads.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <Mail className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                {leads && leads.length > 0 ? 'No leads match your filters' : 'No leads yet'}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                {leads && leads.length > 0 
                  ? 'Try adjusting your search or filter criteria'
                  : 'Leads from library registrations will appear here'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredLeads.map((lead) => {
                const displayFields = getDisplayFields(lead);
                const status = lead.status || 'unknown';
                
                return (
                  <Card key={lead._id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3 flex-wrap">
                            {/* Display name field if available, otherwise use first available field */}
                            {lead.name || lead.fullName || lead.firstName ? (
                              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                                {lead.name || lead.fullName || `${lead.firstName || ''} ${lead.lastName || ''}`.trim()}
                              </h3>
                            ) : displayFields.length > 0 ? (
                              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                                {getFieldValue(displayFields[0].value)}
                              </h3>
                            ) : (
                              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                                Lead #{lead._id?.slice(-6)}
                              </h3>
                            )}
                            {status && (
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                                {status}
                              </span>
                            )}
                          </div>
                          
                          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                            {displayFields.map((field) => {
                              // Skip if already shown in title
                              if (field.key === 'name' || field.key === 'fullName' || field.key === 'firstName') return null;
                              
                              const value = getFieldValue(field.value);
                              if (!value) return null;
                              
                              // Choose icon based on field type
                              let Icon = User;
                              if (field.key.toLowerCase().includes('email') || field.key.toLowerCase().includes('mail')) {
                                Icon = Mail;
                              } else if (field.key.toLowerCase().includes('phone') || field.key.toLowerCase().includes('mobile')) {
                                Icon = Phone;
                              } else if (field.key.toLowerCase().includes('message') || field.key.toLowerCase().includes('comment')) {
                                Icon = MessageSquare;
                              } else if (field.key.toLowerCase().includes('library') || field.key.toLowerCase().includes('building')) {
                                Icon = Building2;
                              } else if (field.key.toLowerCase().includes('date') || field.key.toLowerCase().includes('created') || field.key.toLowerCase().includes('updated')) {
                                Icon = Calendar;
                              }
                              
                              return (
                                <div key={field.key} className="flex items-start gap-2">
                                  <Icon className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-400" />
                                  <div className="flex-1 min-w-0">
                                    <span className="font-medium text-gray-700 dark:text-gray-300">{field.label}:</span>{' '}
                                    <span className="text-gray-600 dark:text-gray-400">
                                      {field.key.toLowerCase().includes('date') || field.key.toLowerCase().includes('created') || field.key.toLowerCase().includes('updated')
                                        ? new Date(value).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                          })
                                        : value.length > 100 
                                        ? `${value.substring(0, 100)}...` 
                                        : value}
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                            
                            {/* Show createdOn/updatedOn if available */}
                            {(lead.createdOn || lead.createdAt) && (
                              <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500 mt-3 pt-2 border-t border-gray-200 dark:border-gray-700">
                                <Calendar className="w-3 h-3" />
                                <span>
                                  Created: {new Date(lead.createdOn || lead.createdAt || '').toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          {status && (
                            <Select
                              value={status}
                              onValueChange={(value) => handleStatusChange(lead._id!, value)}
                            >
                              <SelectTrigger className="w-[140px]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {availableStatuses.map(s => (
                                  <SelectItem key={s} value={s}>
                                    {s.charAt(0).toUpperCase() + s.slice(1)}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
