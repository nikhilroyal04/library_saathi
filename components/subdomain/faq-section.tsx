'use client';

import React, { useState } from 'react';
import { ChevronDown, Clock, UserPlus, Building2, BookOpen, DollarSign, RefreshCw, AlertCircle, Calendar, ArrowRight } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
  icon?: string;
}

interface FaqSectionProps {
  faqs?: FAQ[];
}

const FaqSection = ({ faqs: propFaqs }: FaqSectionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Icon mapping for string icon names
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Clock,
    UserPlus,
    Building2,
    BookOpen,
    DollarSign,
    RefreshCw,
    AlertCircle,
    Calendar
  };

  // Default FAQs if no data provided
  const defaultFaqs = [
    {
      question: 'What are your library timings?',
      answer: 'Our library is open from 8:00 AM to 8:00 PM, Monday through Saturday. We are closed on Sundays and public holidays. You can also check our shift plans for specific timing details.',
      icon: 'Clock'
    },
    {
      question: 'How do I become a member?',
      answer: 'Becoming a member is easy! Simply visit our library during operating hours, fill out the membership form, and provide a valid ID proof. Our staff will guide you through the process and issue your membership card.',
      icon: 'UserPlus'
    },
    {
      question: 'What facilities are available?',
      answer: 'We offer a wide range of facilities including reading areas, study zones, computer access, Wi-Fi, printing services, and a dedicated children\'s section. We also have meeting rooms available for booking.',
      icon: 'Building2'
    },
    {
      question: 'Can I reserve books in advance?',
      answer: 'Yes! You can reserve books through our online catalog system or by visiting the library. Reserved books will be held for you for 3 days. You\'ll receive a notification when your book is ready for pickup.',
      icon: 'BookOpen'
    },
    {
      question: 'What is the membership fee?',
      answer: 'Membership fees vary based on the type of membership you choose. We offer annual, half-yearly, and monthly membership plans. Please contact us or visit the library for detailed pricing information.',
      icon: 'DollarSign'
    },
    {
      question: 'Do you offer online book renewal?',
      answer: 'Yes! You can renew your books online through our member portal. Simply log in with your membership credentials and extend your borrowing period. You can also renew books in person or over the phone.',
      icon: 'RefreshCw'
    },
    {
      question: 'Are there any late fees?',
      answer: 'Yes, we charge a nominal late fee for books returned after the due date. The fee is ₹5 per day per book. We encourage timely returns to avoid these charges and to ensure books are available for other members.',
      icon: 'AlertCircle'
    },
    {
      question: 'Do you organize events or workshops?',
      answer: 'Absolutely! We regularly organize reading sessions, book discussions, workshops, and community events. Follow us on social media or check our notice board for upcoming events. All members are welcome to participate!',
      icon: 'Calendar'
    }
  ];

  const faqs = propFaqs && propFaqs.length > 0 ? propFaqs : defaultFaqs;

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Got <span className="text-blue-600">Questions?</span>
          </h2>
          <p className="text-base text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about our library services and facilities
          </p>
        </div>

        {/* FAQ Grid - Two Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {faqs.map((faq, index) => {
            const iconName = typeof faq.icon === 'string' ? faq.icon : 'Clock';
            const Icon = iconMap[iconName] || Clock;
            const isOpen = openIndex === index;
            const colors = [
              { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' },
              { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-200' },
              { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200' },
              { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200' },
              { bg: 'bg-cyan-50', text: 'text-cyan-600', border: 'border-cyan-200' },
              { bg: 'bg-pink-50', text: 'text-pink-600', border: 'border-pink-200' },
              { bg: 'bg-yellow-50', text: 'text-yellow-600', border: 'border-yellow-200' },
              { bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-200' }
            ];
            const color = colors[index % colors.length];

            return (
              <div
                key={index}
                className={`bg-white rounded-lg border transition-all duration-200 ${
                  isOpen
                    ? `${color.border} shadow-md`
                    : `border-gray-200 hover:border-blue-200`
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-5 py-4 text-left focus:outline-none"
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`flex-shrink-0 p-2 rounded-lg transition-colors ${
                      isOpen 
                        ? `${color.bg} ${color.text}` 
                        : 'bg-gray-50 text-gray-600'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    
                    {/* Question */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-gray-900 mb-1">
                        {faq.question}
                      </h3>
                      <div className={`overflow-hidden transition-all duration-300 ${
                        isOpen ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'
                      }`}>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>

                    {/* Chevron */}
                    <div className="flex-shrink-0">
                      <ChevronDown
                        className={`w-4 h-4 text-gray-400 transform transition-transform duration-300 ${
                          isOpen ? `rotate-180 ${color.text}` : ''
                        }`}
                      />
                    </div>
                  </div>
                </button>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-4 text-center">
          <div className="inline-block p-6">
            <p className="text-base text-gray-700 font-semibold mb-3">
              Still have questions?
            </p>
            <a
              href="#contact"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm"
            >
              Contact Us
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;