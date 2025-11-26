'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import type { Library } from '@/lib/store/librarySlice';

interface AboutTabProps {
  formData: Partial<Library>;
}

export default function AboutTab({ formData }: AboutTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>About Section</CardTitle>
        <CardDescription>Mission, vision, and why choose us</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="mission">Mission</Label>
            <textarea
              id="mission"
              name="mission"
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Our mission statement..."
              defaultValue={formData.about?.mission}
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="vision">Vision</Label>
            <textarea
              id="vision"
              name="vision"
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Our vision statement..."
              defaultValue={formData.about?.vision}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
