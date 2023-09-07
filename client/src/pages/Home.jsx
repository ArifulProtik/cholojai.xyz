import React, { useEffect } from 'react'
import { Header } from '../components/Header'
import Hero from '../components/Hero'
import { Blog } from '../components/Blog'
import Footer from '../components/Footer'
import { useGetBlogsQuery } from '../slices/BlogSlice'
import Product from '../components/Product'
import { useGetPackagesQuery } from '../slices/PackageSlice'

const Home = () => {
  const { data } = useGetBlogsQuery()
  const { data: mypack } = useGetPackagesQuery()
  useEffect(() => {
    document.title = 'Home | CholoJai.xyz'
  }, [data, mypack])
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
      <Product title="Latest Packages" mydata={mypack} />
      <Blog data={data} />
      <Footer />
    </>
  )
}

export default Home
