'use client'

import Link from 'next/link'
import { Headphones } from 'lucide-react'

const MESSAGE = "📢 New library features launched! Try book tracking, student management & more – Book a demo today. 📚";

const Topbar = () => {
  return (
    <div className="w-full bg-gradient-to-r from-blue-600 to-cyan-400 text-white h-7 flex items-center px-2 shadow-md z-50 relative overflow-hidden">
      <div className="flex-1 overflow-hidden">
        <div className="animate-scroll-left font-semibold text-xs md:text-sm whitespace-nowrap inline-block">
          {MESSAGE}
        </div>
      </div>
    </div>
  );
};

export default Topbar