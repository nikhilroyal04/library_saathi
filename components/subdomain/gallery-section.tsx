'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

interface GalleryItem {
  id?: number;
  title: string;
  description?: string;
  image?: string;
  icon?: string;
  color?: string;
}

interface GallerySectionProps {
  galleryItems?: GalleryItem[];
}

const GallerySection = ({ galleryItems: propGalleryItems }: GallerySectionProps) => {
  // Default gallery items if no data provided
  const defaultGalleryItems: Array<{
    id: number;
    title: string;
    description: string;
    icon: string;
    image: string | null;
    color: string;
  }> = [
    {
      id: 1,
      title: 'Modern Reading Space',
      description: 'Spacious reading areas with comfortable seating and natural lighting',
      icon: '📚',
      image: null as string | null,
      color: 'orange'
    },
    {
      id: 2,
      title: 'Digital Catalog',
      description: 'Search and browse our extensive collection of books easily',
      icon: '💻',
      image: null as string | null,
      color: 'blue'
    },
    {
      id: 3,
      title: 'Member Services Desk',
      description: 'Dedicated help desk for member assistance and support',
      icon: '🛎️',
      image: null as string | null,
      color: 'green'
    },
    {
      id: 4,
      title: 'Quiet Study Zones',
      description: 'Peaceful study areas designed for focused learning',
      icon: '📖',
      image: null as string | null,
      color: 'purple'
    },
    {
      id: 5,
      title: 'Modern Facilities',
      description: 'State-of-the-art facilities for an enhanced reading experience',
      icon: '⚡',
      image: null as string | null,
      color: 'indigo'
    },
    {
      id: 6,
      title: 'Community Events',
      description: 'Regular workshops and community gatherings',
      icon: '🎉',
      image: null as string | null,
      color: 'pink'
    }
  ];

  const validColors = ['orange', 'blue', 'green', 'purple', 'indigo', 'pink'];
  
  const galleryItems: Array<{
    id: number;
    title: string;
    description: string;
    icon: string;
    image: string | null;
    color: string;
  }> = propGalleryItems && propGalleryItems.length > 0 
    ? propGalleryItems.map((item, index) => {
        const itemColor = item.color?.toLowerCase() || '';
        const validColor = validColors.includes(itemColor) ? itemColor : validColors[index % validColors.length];
        return {
          id: index + 1,
          title: item.title,
          description: item.description || '',
          icon: item.icon || '📚',
          image: item.image || null,
          color: validColor
        };
      })
    : defaultGalleryItems;

  const colorClasses: Record<string, { bg: string; border: string; icon: string }> = {
    orange: { bg: 'bg-orange-50', border: 'border-orange-200', icon: 'text-orange-600' },
    blue: { bg: 'bg-blue-50', border: 'border-blue-200', icon: 'text-blue-600' },
    green: { bg: 'bg-green-50', border: 'border-green-200', icon: 'text-green-600' },
    purple: { bg: 'bg-purple-50', border: 'border-purple-200', icon: 'text-purple-600' },
    indigo: { bg: 'bg-indigo-50', border: 'border-indigo-200', icon: 'text-indigo-600' },
    pink: { bg: 'bg-pink-50', border: 'border-pink-200', icon: 'text-pink-600' }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Explore Our <span className="text-blue-600">Library Spaces</span>
          </h2>
          <p className="text-base text-gray-600 max-w-3xl mx-auto">
            Take a virtual tour of our modern library facilities and see how we create the perfect learning environment
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, index) => {
            const colorKey = item.color || 'orange';
            const colors = colorClasses[colorKey] || colorClasses['orange'];
            return (
            <div
              key={item.id || index}
              className={`group bg-white rounded-lg border ${colors.border} hover:border-blue-300 hover:shadow-lg transition-all duration-200 overflow-hidden cursor-pointer`}
            >
              {item.image ? (
                <div className="relative w-full h-48 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                    </div>
              ) : (
                <div className={`w-full h-48 ${colors.bg} flex items-center justify-center`}>
                  <span className="text-6xl">{item.icon || '📚'}</span>
                </div>
              )}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                {item.description && (
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <a
            href="#gallery"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm"
          >
            View Full Gallery
            <ArrowRight className="w-4 h-4 ml-2" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;

