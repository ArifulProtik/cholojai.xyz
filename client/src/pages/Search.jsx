import React from 'react'
import { Header } from '../components/Header'
import { useSearchParams } from 'react-router-dom'

import Hero from '../components/Hero'
import Product from '../components/Product'
import { useSearchPackagesQuery } from '../slices/PackageSlice'
import Footer from '../components/Footer'


export const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q')
  const { data } = useSearchPackagesQuery(query)
  console.log(query)
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
      <Product title="Your Search Result" mydata={data} />
      <Footer />

    </>
  )
}
