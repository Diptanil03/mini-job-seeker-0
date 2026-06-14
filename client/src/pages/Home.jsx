import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import PdfScan from '../features/pdf-scanner/components/PdfScan'

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <PdfScan />
    </div>
  )
}

export default Home