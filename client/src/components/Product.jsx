import React from 'react'
import { Link } from 'react-router-dom'

const Product = (props) => {
  const data = props.mydata
  console.log(data)
  return (
    <>
      <div class="flex flex-col w-full">
        <div className='container mt-8 p-2'>
          <h1 className="text-sm md:text-xl font-bold font-sans text-primary">Latest Tour Packages</h1>
        </div>
        <div class="divider"></div>
        <div className="container">
          <div className="grid-cols-1 sm:grid md:grid-cols-3 ">
            {data?.map((pack) =>

              <div key={pack.id} className="mx-3 mt-6 flex flex-col rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] sm:shrink-0 sm:grow sm:basis-0">
                <a href="#!">
                  <img
                    className="rounded-t-lg"
                    src={pack.feature_image}
                    alt="Hollywood Sign on The Hill"
                  />
                </a>
                <div className="p-6">
                  <div className="flex justify-between">
                    <p className="text-sm text-neutral-500 mb-2">{pack.location}</p>
                    <p className="text-sm text-neutral-500 mb-2 ml-2">{pack.duration} Day</p>
                  </div>
                  <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800">
                    {pack.title}
                  </h5>
                  <div className='divider'></div>
                  <div className="flex justify-between mt-4">
                    <span className="text-sm text-neutral-500">From</span>
                    <span className="text-sm text-neutral-500">{pack.from_place}</span>
                  </div>
                  <div className="flex justify-between mt-4">
                    <span className="text-sm text-neutral-500">Departure Time</span>
                    <span className="text-sm text-neutral-500">{pack.departure}</span>
                  </div>
                  <div className='divider'></div>
                  <div className="flex justify-between mt-4">
                    <span className="text-sm text-neutral-500">Price</span>
                    <span className="text-sm text-neutral-500">BDT {pack.price}</span>
                  </div>
                  <div className='divider'></div>
                  <div className="flex justify-between mt-4">
                    <Link className='w-full' to={`/package/${pack.id}`}>
                      <button className="btn btn-block btn-outline btn-secondary">View Details</button>
                    </Link>

                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Product
