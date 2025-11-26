'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2 } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
  icon?: string;
}

interface FaqsTabProps {
  initialFaqs?: FAQ[];
}

export default function FaqsTab({ initialFaqs = [] }: FaqsTabProps) {
  const [faqs, setFaqs] = useState<FAQ[]>(initialFaqs);

  const addFaq = () => {
    setFaqs([...faqs, { question: '', answer: '', icon: '' }]);
  };

  const removeFaq = (index: number) => {
    setFaqs(faqs.filter((_, i) => i !== index));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Frequently Asked Questions</CardTitle>
        <CardDescription>Add common questions and answers</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-end mb-4">
          <Button
            type="button"
            variant="outline"
            onClick={addFaq}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Item
          </Button>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-sm text-gray-700">FAQ {index + 1}</h4>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFaq(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Icon</Label>
                  <Input
                    name={`faqs[${index}][icon]`}
                    defaultValue={faq.icon}
                    placeholder="Clock, UserPlus, BookOpen"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Question *</Label>
                  <Input
                    name={`faqs[${index}][question]`}
                    defaultValue={faq.question}
                    placeholder="What are your opening hours?"
                    required
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Answer *</Label>
                  <textarea
                    name={`faqs[${index}][answer]`}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    defaultValue={faq.answer}
                    required
                  />
                </div>
              </div>
            </div>
          ))}
          {faqs.length === 0 && (
            <div className="text-center py-8 border-2 border-dashed rounded-lg text-gray-500">
              No FAQs added yet. Click "Add Item" to get started.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
