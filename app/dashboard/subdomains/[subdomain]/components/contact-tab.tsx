'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Library } from '@/lib/store/librarySlice';

interface ContactTabProps {
  formData: Partial<Library>;
}

export default function ContactTab({ formData }: ContactTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
        <CardDescription>How visitors can reach you</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="library@example.com"
              defaultValue={formData.email}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+91 1234567890"
              defaultValue={formData.phone}
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="address">Address</Label>
            <textarea
              id="address"
              name="address"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Full address of your library"
              defaultValue={formData.address}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              name="website"
              type="url"
              placeholder="https://example.com"
              defaultValue={formData.website}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="timings">Opening Hours</Label>
            <Input
              id="timings"
              name="timings"
              type="text"
              placeholder="Mon-Fri: 9 AM - 6 PM, Sat: 10 AM - 4 PM"
              defaultValue={formData.timings}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
