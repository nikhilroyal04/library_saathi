'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Library } from '@/lib/store/librarySlice';

interface SeoTabProps {
  formData: Partial<Library>;
}

export default function SeoTab({ formData }: SeoTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>SEO Settings</CardTitle>
        <CardDescription>Optimize your library website for search engines</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="metaTitle">Meta Title</Label>
            <Input
              id="metaTitle"
              name="metaTitle"
              type="text"
              placeholder="Library Name - Your Community Library"
              defaultValue={formData.metaTitle}
            />
            <p className="text-xs text-gray-500">Recommended: 50-60 characters</p>
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="metaDescription">Meta Description</Label>
            <textarea
              id="metaDescription"
              name="metaDescription"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="A brief description of your library..."
              defaultValue={formData.metaDescription}
            />
            <p className="text-xs text-gray-500">Recommended: 150-160 characters</p>
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="metaKeywords">Meta Keywords</Label>
            <Input
              id="metaKeywords"
              name="metaKeywords"
              type="text"
              placeholder="library, books, reading, community"
              defaultValue={formData.metaKeywords}
            />
            <p className="text-xs text-gray-500">Comma-separated keywords</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
