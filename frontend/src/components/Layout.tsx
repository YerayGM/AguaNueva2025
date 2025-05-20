import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

interface LayoutProps {
  children?: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 mt-24">
        <div className="fade-in">
          {children || <Outlet />}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Layout