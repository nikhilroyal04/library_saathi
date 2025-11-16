'use client';

import { useState, useActionState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Loader2, Plus, Settings } from 'lucide-react';
import { deleteSubdomainAction } from '@/actions';
import { rootDomain, protocol } from '@/lib/utils';
import { SubdomainForm } from '@/app/subdomain-form';
import Link from 'next/link';

type Tenant = {
  subdomain: string;
  emoji: string;
  createdAt: number;
};

type DeleteState = {
  error?: string;
  success?: string;
};

type SessionData = {
  email: string;
  subdomain?: string;
  isAdmin?: boolean;
  loginTime: number;
};

function TenantGrid({
  tenants,
  action,
  isPending
}: {
  tenants: Tenant[];
  action: (formData: FormData) => void;
  isPending: boolean;
}) {
  if (tenants.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <p className="text-gray-500">No subdomains have been created yet.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {tenants.map((tenant) => (
        <Card key={tenant.subdomain}>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">{tenant.subdomain}</CardTitle>
              <form action={action}>
                <input
                  type="hidden"
                  name="subdomain"
                  value={tenant.subdomain}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  type="submit"
                  disabled={isPending}
                  className="text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                >
                  {isPending ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Trash2 className="h-5 w-5" />
                  )}
                </Button>
              </form>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-4xl">{tenant.emoji}</div>
              <div className="text-sm text-gray-500">
                Created: {new Date(tenant.createdAt).toLocaleDateString()}
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2">
              <a
                href={`${protocol}://${tenant.subdomain}.${rootDomain}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline text-sm"
              >
                Visit Website →
              </a>
              <Link
                href={`/dashboard/subdomains/${tenant.subdomain}`}
                className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Settings className="w-4 h-4" />
                Edit Details
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function AdminDashboard({ tenants }: { tenants: Tenant[]; session: SessionData }) {
  const [state, action, isPending] = useActionState<DeleteState, FormData>(
    deleteSubdomainAction,
    {}
  );
  const [showCreateForm, setShowCreateForm] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Subdomains</h1>
        <p className="text-sm text-gray-500 mt-2">
          Manage your library subdomains and settings
        </p>
      </div>
      
      {/* Create Subdomain Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Create New Subdomain</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              {showCreateForm ? 'Hide' : 'Create'}
            </Button>
          </div>
        </CardHeader>
        {showCreateForm && (
          <CardContent>
            <SubdomainForm />
          </CardContent>
        )}
      </Card>

      {/* Existing Subdomains */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Your Subdomains</h2>
        <TenantGrid tenants={tenants} action={action} isPending={isPending} />
      </div>

      {state.error && (
        <div className="fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded shadow-md z-50">
          {state.error}
        </div>
      )}

      {state.success && (
        <div className="fixed bottom-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded shadow-md z-50">
          {state.success}
        </div>
      )}
    </div>
  );
}
