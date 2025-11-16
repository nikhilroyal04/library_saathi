import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'


export default function WebsiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen mt-16">
      <Header />
      {children}
      <Footer />
    </div>
  )
}