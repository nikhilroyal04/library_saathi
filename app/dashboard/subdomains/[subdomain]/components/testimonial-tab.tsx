'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2 } from 'lucide-react';

interface Testimonial {
  name: string;
  role?: string;
  rating?: number;
  image?: string;
  text?: string;
}

interface TestimonialTabProps {
  initialTestimonials?: Testimonial[];
}

export default function TestimonialTab({ initialTestimonials = [] }: TestimonialTabProps) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);

  const addTestimonial = () => {
    setTestimonials([...testimonials, { name: '', role: '', rating: 5, image: '', text: '' }]);
  };

  const removeTestimonial = (index: number) => {
    setTestimonials(testimonials.filter((_, i) => i !== index));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Testimonials</CardTitle>
        <CardDescription>Customer testimonials and reviews</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-end mb-4">
          <Button
            type="button"
            variant="outline"
            onClick={addTestimonial}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Item
          </Button>
        </div>
        <div className="space-y-4">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-sm text-gray-700">Testimonial {index + 1}</h4>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeTestimonial(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Name *</Label>
                  <Input
                    name={`testimonials[${index}][name]`}
                    defaultValue={testimonial.name}
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Role</Label>
                  <Input
                    name={`testimonials[${index}][role]`}
                    defaultValue={testimonial.role}
                    placeholder="Student"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Rating (1-5)</Label>
                  <Input
                    name={`testimonials[${index}][rating]`}
                    type="number"
                    min="1"
                    max="5"
                    defaultValue={testimonial.rating}
                    placeholder="5"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Image URL</Label>
                  <Input
                    name={`testimonials[${index}][image]`}
                    type="url"
                    defaultValue={testimonial.image}
                    placeholder="https://example.com/photo.jpg"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Testimonial Text *</Label>
                  <textarea
                    name={`testimonials[${index}][text]`}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    defaultValue={testimonial.text}
                    required
                  />
                </div>
              </div>
            </div>
          ))}
          {testimonials.length === 0 && (
            <div className="text-center py-8 border-2 border-dashed rounded-lg text-gray-500">
              No testimonials added yet. Click "Add Item" to get started.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
