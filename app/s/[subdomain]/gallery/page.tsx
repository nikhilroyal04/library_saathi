import { notFound } from 'next/navigation';
import { getSubdomainData, getLibraryDetails } from '@/lib/subdomains';
import TestimonialSection from '@/components/subdomain/testimonial-section';
import FaqSection from '@/components/subdomain/faq-section';

export default async function GalleryPage({
  params
}: {
  params: Promise<{ subdomain: string }>;
}) {
  const { subdomain } = await params;
  const subdomainData = await getSubdomainData(subdomain);
  const libraryDetails = await getLibraryDetails(subdomain);

  if (!subdomainData) {
    notFound();
  }

  const galleryItems = [
    {
      id: 1,
      title: 'Modern Reading Space',
      description: 'Spacious reading areas with comfortable seating and natural lighting',
      gradient: 'from-blue-500 to-cyan-500',
      icon: '📚'
    },
    {
      id: 2,
      title: 'Digital Catalog',
      description: 'Easy book search and browsing interface for members',
      gradient: 'from-purple-500 to-pink-500',
      icon: '💻'
    },
    {
      id: 3,
      title: 'Member Services Desk',
      description: 'Dedicated help desk for member assistance and support',
      gradient: 'from-green-500 to-emerald-500',
      icon: '🛎️'
    },
    {
      id: 4,
      title: 'Quiet Study Zones',
      description: 'Peaceful study areas designed for focused learning',
      gradient: 'from-orange-500 to-amber-500',
      icon: '📖'
    },
    {
      id: 5,
      title: 'Modern Facilities',
      description: 'State-of-the-art facilities for enhanced reading experience',
      gradient: 'from-indigo-500 to-blue-500',
      icon: '⚡'
    },
    {
      id: 6,
      title: 'Community Events',
      description: 'Regular workshops and community gatherings',
      gradient: 'from-rose-500 to-pink-500',
      icon: '🎉'
    },
    {
      id: 7,
      title: 'Children\'s Section',
      description: 'Dedicated space for young readers with colorful and engaging environment',
      gradient: 'from-yellow-500 to-orange-500',
      icon: '🧸'
    },
    {
      id: 8,
      title: 'Computer Lab',
      description: 'Fully equipped computer lab with internet access for research',
      gradient: 'from-cyan-500 to-blue-500',
      icon: '🖥️'
    },
    {
      id: 9,
      title: 'Meeting Rooms',
      description: 'Private meeting rooms available for group study and events',
      gradient: 'from-violet-500 to-purple-500',
      icon: '🚪'
    }
  ];

  return (
    <div className="bg-white">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Explore Our <span className="text-blue-600">Library Spaces</span>
          </h1>
          <p className="text-base text-gray-600 max-w-3xl mx-auto">
            Take a virtual tour of our modern library facilities and see how we create the perfect learning environment
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item) => {
            const colors = [
              { bg: 'bg-blue-50', border: 'border-blue-200' },
              { bg: 'bg-purple-50', border: 'border-purple-200' },
              { bg: 'bg-green-50', border: 'border-green-200' },
              { bg: 'bg-orange-50', border: 'border-orange-200' },
              { bg: 'bg-indigo-50', border: 'border-indigo-200' },
              { bg: 'bg-pink-50', border: 'border-pink-200' },
              { bg: 'bg-yellow-50', border: 'border-yellow-200' },
              { bg: 'bg-cyan-50', border: 'border-cyan-200' },
              { bg: 'bg-violet-50', border: 'border-violet-200' }
            ];
            const color = colors[(item.id - 1) % colors.length];
            return (
            <div
              key={item.id}
              className={`group relative overflow-hidden rounded-lg aspect-[4/3] ${color.bg} border ${color.border} hover:border-blue-300 hover:shadow-lg transition-all duration-200 cursor-pointer`}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-6xl">{item.icon}</div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-base font-semibold text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-200 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
            );
          })}
        </div>
      </section>

      {/* Testimonial Section */}
      <TestimonialSection />

      {/* FAQ Section */}
      <FaqSection />
    </div>
  );
}