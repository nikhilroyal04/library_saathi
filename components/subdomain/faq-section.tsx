'use client';

import React, { useState } from 'react';
import { ChevronDown, Clock, UserPlus, Building2, BookOpen, DollarSign, RefreshCw, AlertCircle, Calendar, Sparkles, ArrowRight } from 'lucide-react';

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'What are your library timings?',
      answer: 'Our library is open from 8:00 AM to 8:00 PM, Monday through Saturday. We are closed on Sundays and public holidays. You can also check our shift plans for specific timing details.',
      icon: Clock,
      color: 'blue',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      question: 'How do I become a member?',
      answer: 'Becoming a member is easy! Simply visit our library during operating hours, fill out the membership form, and provide a valid ID proof. Our staff will guide you through the process and issue your membership card.',
      icon: UserPlus,
      color: 'green',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      question: 'What facilities are available?',
      answer: 'We offer a wide range of facilities including reading areas, study zones, computer access, Wi-Fi, printing services, and a dedicated children\'s section. We also have meeting rooms available for booking.',
      icon: Building2,
      color: 'purple',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      question: 'Can I reserve books in advance?',
      answer: 'Yes! You can reserve books through our online catalog system or by visiting the library. Reserved books will be held for you for 3 days. You\'ll receive a notification when your book is ready for pickup.',
      icon: BookOpen,
      color: 'orange',
      gradient: 'from-orange-500 to-amber-500'
    },
    {
      question: 'What is the membership fee?',
      answer: 'Membership fees vary based on the type of membership you choose. We offer annual, half-yearly, and monthly membership plans. Please contact us or visit the library for detailed pricing information.',
      icon: DollarSign,
      color: 'yellow',
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      question: 'Do you offer online book renewal?',
      answer: 'Yes! You can renew your books online through our member portal. Simply log in with your membership credentials and extend your borrowing period. You can also renew books in person or over the phone.',
      icon: RefreshCw,
      color: 'cyan',
      gradient: 'from-cyan-500 to-blue-500'
    },
    {
      question: 'Are there any late fees?',
      answer: 'Yes, we charge a nominal late fee for books returned after the due date. The fee is ₹5 per day per book. We encourage timely returns to avoid these charges and to ensure books are available for other members.',
      icon: AlertCircle,
      color: 'red',
      gradient: 'from-red-500 to-rose-500'
    },
    {
      question: 'Do you organize events or workshops?',
      answer: 'Absolutely! We regularly organize reading sessions, book discussions, workshops, and community events. Follow us on social media or check our notice board for upcoming events. All members are welcome to participate!',
      icon: Calendar,
      color: 'pink',
      gradient: 'from-pink-500 to-rose-500'
    }
  ];

  const colorClasses: Record<string, { bg: string; text: string; border: string; hover: string; bgGradient: string }> = {
    blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200', hover: 'hover:bg-blue-100', bgGradient: 'from-blue-50 to-cyan-50' },
    green: { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-200', hover: 'hover:bg-green-100', bgGradient: 'from-green-50 to-emerald-50' },
    purple: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200', hover: 'hover:bg-purple-100', bgGradient: 'from-purple-50 to-pink-50' },
    orange: { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200', hover: 'hover:bg-orange-100', bgGradient: 'from-orange-50 to-amber-50' },
    yellow: { bg: 'bg-yellow-50', text: 'text-yellow-600', border: 'border-yellow-200', hover: 'hover:bg-yellow-100', bgGradient: 'from-yellow-50 to-orange-50' },
    cyan: { bg: 'bg-cyan-50', text: 'text-cyan-600', border: 'border-cyan-200', hover: 'hover:bg-cyan-100', bgGradient: 'from-cyan-50 to-blue-50' },
    red: { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200', hover: 'hover:bg-red-100', bgGradient: 'from-red-50 to-rose-50' },
    pink: { bg: 'bg-pink-50', text: 'text-pink-600', border: 'border-pink-200', hover: 'hover:bg-pink-100', bgGradient: 'from-pink-50 to-rose-50' }
  };

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 bg-gradient-to-br from-white via-gray-50/50 to-blue-50/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center px-3 py-1.5 mb-3 rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 border-2 border-blue-200">
            <Sparkles className="w-4 h-4 text-blue-600 mr-2" />
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
              ❓ Frequently Asked Questions
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-3">
            Got{' '}
            <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-sky-600 bg-clip-text text-transparent">
              Questions?
            </span>
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto font-medium">
            Find answers to common questions about our library services and facilities
          </p>
        </div>

        {/* FAQ Grid - Two Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {faqs.map((faq, index) => {
            const Icon = faq.icon;
            const colors = colorClasses[faq.color];
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`group relative overflow-hidden bg-gradient-to-br ${colors.bgGradient} rounded-xl border-2 transition-all duration-300 ${
                  isOpen
                    ? `${colors.border} shadow-xl scale-[1.02]`
                    : `${colors.border} hover:shadow-lg hover:scale-[1.01]`
                }`}
              >
                {/* Gradient overlay on hover/open */}
                <div className={`absolute inset-0 bg-gradient-to-br ${faq.gradient} opacity-0 ${isOpen ? 'opacity-5' : 'group-hover:opacity-5'} rounded-xl transition-opacity duration-300`}></div>
                
                {/* Decorative corner */}
                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${faq.gradient} opacity-0 ${isOpen ? 'opacity-10' : 'group-hover:opacity-10'} rounded-bl-full transition-opacity duration-300`}></div>

                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-5 py-4 text-left focus:outline-none relative z-10"
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`flex-shrink-0 p-3 rounded-xl transition-all duration-300 shadow-md ${
                      isOpen 
                        ? `${colors.bg} ${colors.text} scale-110 ring-2 ring-white/50` 
                        : `${colors.bg} ${colors.text} opacity-80 group-hover:scale-105`
                    }`}>
                      <Icon className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-12' : ''}`} />
                    </div>
                    
                    {/* Question */}
                    <div className="flex-1 min-w-0">
                      <h3 className={`text-sm font-extrabold mb-1 transition-colors ${
                        isOpen ? colors.text : 'text-gray-900'
                      }`}>
                        {faq.question}
                      </h3>
                      <div className={`overflow-hidden transition-all duration-300 ${
                        isOpen ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'
                      }`}>
                        <p className="text-xs text-gray-600 leading-relaxed font-medium">
                          {faq.answer}
                        </p>
                      </div>
                    </div>

                    {/* Chevron */}
                    <div className={`flex-shrink-0 p-1.5 rounded-lg transition-all duration-300 ${
                      isOpen ? `${colors.bg} ${colors.text}` : 'text-gray-400 group-hover:bg-gray-100'
                    }`}>
                      <ChevronDown
                        className={`w-4 h-4 transform transition-all duration-300 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  </div>
                </button>

                {/* Bottom accent line */}
                <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${faq.gradient} transform ${isOpen ? 'scale-x-100' : 'scale-x-0'} transition-transform duration-300 origin-left`}></div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-4 text-center">
          <div className="inline-block p-6 ">
            <p className="text-md text-gray-700 font-bold mb-3">
              Still have questions?
            </p>
            <a
              href="#contact"
              className="group inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-sm"
            >
              Contact Us
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;