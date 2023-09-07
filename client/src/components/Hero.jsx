import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const Hero = () => {
  const [search, setSearch] = useState("")
  return (
    <div className="hero h-96" style={{ backgroundImage: 'url(https://wallpapercave.com/dwp1x/wp10812261.jpg)' }}>
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content w-full text-center text-neutral-content">

        <div className="bg-white w-[40%] rounded-3xl p-6 px-8">
          <div className="flex overflow-hidden justify-evenly">
            <input type="text" placeholder="Search" className="searchinput" onChange={e => setSearch(e.target.value)} />
            <Link to={`/search?q=${search}`} >
              <button className="btn btn-secondary btn-outline ml-2 leading-10">Search</button> </Link>
          </div>
        </div>

      </div>
    </div>

  )
}

export default Hero
