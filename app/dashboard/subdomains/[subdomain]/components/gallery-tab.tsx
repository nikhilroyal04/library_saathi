'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

interface GalleryItem {
  title: string;
  description?: string;
  image?: string;
  icon?: string;
  color?: string;
}

interface GalleryTabProps {
  initialItems?: GalleryItem[];
}

export default function GalleryTab({ initialItems = [] }: GalleryTabProps) {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(initialItems);
  const galleryInputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const handleGalleryImageChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const updatedItems = [...galleryItems];
      updatedItems[index] = {
        ...updatedItems[index],
        image: reader.result as string,
        title: updatedItems[index].title || file.name.split('.')[0] || 'Gallery Image'
      };
      setGalleryItems(updatedItems);
    };
    reader.readAsDataURL(file);
  };

  const removeGalleryItem = (index: number) => {
    setGalleryItems(galleryItems.filter((_, i) => i !== index));
    galleryInputRefs.current = galleryInputRefs.current.filter((_, i) => i !== index);
  };

  const addGalleryItem = () => {
    if (galleryItems.length < 50) {
      setGalleryItems([...galleryItems, { title: '', description: '', icon: '📷', color: 'blue' }]);
      galleryInputRefs.current.push(null);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gallery</CardTitle>
        <CardDescription>Upload up to 50 images for your library gallery</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            {galleryItems.length} / 50 images
          </p>
          <Button
            type="button"
            variant="outline"
            onClick={addGalleryItem}
            disabled={galleryItems.length >= 50}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Item
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryItems.map((item, index) => {
            if (!galleryInputRefs.current[index]) {
              galleryInputRefs.current[index] = null;
            }
            return (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <input
                  ref={(el) => {
                    galleryInputRefs.current[index] = el;
                  }}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleGalleryImageChange(index, e)}
                  className="hidden"
                  id={`gallery-upload-${index}`}
                />
                <div 
                  className="relative w-full aspect-video bg-gray-100 rounded overflow-hidden cursor-pointer hover:bg-gray-200 transition-colors"
                  onClick={() => galleryInputRefs.current[index]?.click()}
                >
                  {item.image ? (
                    <>
                      <Image
                        src={item.image}
                        alt={item.title || `Gallery ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeGalleryItem(index);
                        }}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 z-10"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-4xl text-gray-400">
                      <ImageIcon className="w-12 h-12 mb-2" />
                      <span className="text-xs text-gray-500">Click to upload</span>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Input
                    name={`gallery[${index}][title]`}
                    placeholder="Title"
                    defaultValue={item.title}
                  />
                  <textarea
                    name={`gallery[${index}][description]`}
                    placeholder="Description"
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    defaultValue={item.description}
                  />
                  <input type="hidden" name={`gallery[${index}][image]`} value={item.image || ''} />
                  <input type="hidden" name={`gallery[${index}][icon]`} value={item.icon || '📷'} />
                  <input type="hidden" name={`gallery[${index}][color]`} value={item.color || 'blue'} />
                </div>
              </div>
            );
          })}
        </div>

        {galleryItems.length === 0 && (
          <div className="text-center py-12 border-2 border-dashed rounded-lg">
            <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No gallery items yet. Upload images to get started.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
