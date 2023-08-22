import React, { useEffect } from 'react'
import { Header } from '../components/Header'
import Hero from '../components/Hero'
import { Blog } from '../components/Blog'
import Footer from '../components/Footer'

const Home = () => {
  useEffect(() => {
    document.title = 'Home | CholoJai.xyz'
  }, [])
  return (
    <>
      <div className="bg-white">
        <div className="container">
          <Header />
        </div>
      </div>
      <div className="bg-white">
        <Hero />
      </div>
      <Blog />
      <Footer />
    </>
  )
}

export default Home
