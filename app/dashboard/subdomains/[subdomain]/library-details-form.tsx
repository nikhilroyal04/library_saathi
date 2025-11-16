'use client';

import { useActionState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { saveLibraryDetailsAction } from '@/actions';
import { ArrowLeft, Save, Globe } from 'lucide-react';
import Link from 'next/link';
import { protocol, rootDomain } from '@/lib/utils';
import type { LibraryDetails } from '@/lib/subdomains';

export default function LibraryDetailsForm({
  subdomain,
  initialData
}: {
  subdomain: string;
  initialData: LibraryDetails;
}) {
  const [state, action, isPending] = useActionState(saveLibraryDetailsAction, { success: false, error: '' });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/dashboard/subdomains"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Subdomains
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Edit Library Details</h1>
        <p className="text-sm text-gray-500 mt-2">
          Update your library information for <span className="font-medium">{subdomain}.{rootDomain}</span>
        </p>
      </div>

      {/* Preview Link */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">Preview your website</p>
                <p className="text-xs text-gray-600">See how your library website looks</p>
              </div>
            </div>
            <a
              href={`${protocol}://${subdomain}.${rootDomain}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              Visit Website →
            </a>
          </div>
        </CardContent>
      </Card>

      {/* Form */}
      <form action={action} className="space-y-6">
        <input type="hidden" name="subdomain" value={subdomain} />

        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Essential details about your library</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Library Name *</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="e.g., Central Library"
                defaultValue={initialData.name}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                name="description"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Tell visitors about your library..."
                defaultValue={initialData.description}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="logo">Logo URL</Label>
              <Input
                id="logo"
                name="logo"
                type="url"
                placeholder="https://example.com/logo.png"
                defaultValue={initialData.logo}
              />
              <p className="text-xs text-gray-500">URL to your library logo image</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>How visitors can reach you</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="library@example.com"
                defaultValue={initialData.email}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+91 1234567890"
                defaultValue={initialData.phone}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <textarea
                id="address"
                name="address"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Full address of your library"
                defaultValue={initialData.address}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                name="website"
                type="url"
                placeholder="https://example.com"
                defaultValue={initialData.website}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="timings">Opening Hours</Label>
              <Input
                id="timings"
                name="timings"
                type="text"
                placeholder="Mon-Fri: 9 AM - 6 PM, Sat: 10 AM - 4 PM"
                defaultValue={initialData.timings}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-600" />
              Custom Domain
            </CardTitle>
            <CardDescription>
              Connect your own domain (e.g., tenant.vikrantrathi.com). This will point to your subdomain.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="customDomain">Custom Domain</Label>
              <Input
                id="customDomain"
                name="customDomain"
                type="text"
                placeholder="tenant.vikrantrathi.com"
                defaultValue={initialData.customDomain}
              />
              <div className="space-y-2 text-xs text-gray-600">
                <p className="font-medium">Steps to setup custom domain:</p>
                <ol className="list-decimal list-inside space-y-1 ml-2">
                  <li>Enter your custom domain above (without http:// or https://)</li>
                  <li>Save this form</li>
                  <li>Add CNAME record in your DNS provider:
                    <br />
                    <code className="text-xs bg-white px-2 py-1 rounded border mt-1 inline-block">
                      {initialData.customDomain || 'tenant.vikrantrathi.com'} → CNAME → {subdomain}.{rootDomain}
                    </code>
                  </li>
                  <li>If using Vercel, also add this domain in Vercel Dashboard → Settings → Domains</li>
                  <li>Wait 5-60 minutes for DNS propagation</li>
                </ol>
                <p className="text-xs text-gray-500 mt-2">
                  Example: If your custom domain is <code>tenant.vikrantrathi.com</code> and subdomain is <code>rathi.jyotilok.com</code>, 
                  add CNAME: <code>tenant.vikrantrathi.com → rathi.jyotilok.com</code>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {state?.error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {state.error}
          </div>
        )}

        {state?.success && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
            {state.message || 'Library details saved successfully!'}
          </div>
        )}

        <div className="flex justify-end gap-4">
          <Link href="/dashboard/subdomains">
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </Link>
          <Button type="submit" disabled={isPending} className="flex items-center gap-2">
            <Save className="w-4 h-4" />
            {isPending ? 'Saving...' : 'Save Details'}
          </Button>
        </div>
      </form>
    </div>
  );
}

