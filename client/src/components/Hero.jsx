import React from 'react'

const Hero = () => {
  return (
    <div className="hero h-96" style={{ backgroundImage: 'url(https://wallpapercave.com/dwp1x/wp10812261.jpg)' }}>
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold text-white">Hey Welcome!</h1>
          <p className="mb-5 text-white">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
          <button className="btn btn-secondary">Get Started</button>
        </div>
      </div>
    </div>

  )
}

export default Hero
