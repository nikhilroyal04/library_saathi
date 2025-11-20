import React from 'react'
import Header from '@/components/Header'
import Topbar from '@/components/Topbar'
import Footer from '@/components/Footer'


export default function WebsiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Topbar />
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}