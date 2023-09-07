import React, { useState } from 'react'
import { Header } from '../components/Header'
import Footer from '../components/Footer'
import { Link, useParams } from 'react-router-dom'
import { useGetPackageBySlugQuery } from '../slices/PackageSlice'
import ReactTimeAgo from 'react-time-ago'

export const Packages = () => {
  const { slug } = useParams()
  const { data, isError } = useGetPackageBySlugQuery(slug)
  const [selected, setSelected] = useState(1)
  console.log(selected)
  return (
    <>
      <div className="bg-white">
        <div className="container">
          <Header />
        </div>
      </div>
      <div className="bg-white">
        <div className='container p-8'>
          {isError && <h1 className="text-4xl font-bold text-center">404 Not Found</h1>}
          <div className="flex flex-row">
            <div className='w-[50%] mx-auto font-content grow'>
              <h1 className='text-4xl font-content font-bold'>{data?.title}</h1>
              <div className="flex mt-4 justify-start">
                <div className="avatar">
                  <div className="w-10 rounded-full">
                    <img src="https://i.pravatar.cc/300" />
                  </div>
                </div>
                <div className='align-middle leading-3'> <span className="leading-8 font-content font-bold text-neutral-500 ml-2">{data?.author?.name} - </span></div>
                <div className='align-middle leading-3'> <span className="leading-8 font-content font-bold text-neutral-500 ml-2">
                  {data?.createdAt && <ReactTimeAgo date={Date.parse(data?.createdAt)} locale="en-US" />}
                </span>
                </div>

              </div>
              <img src={data?.feature_image} alt="Blog Image" className='w-full h-96 object-cover mt-4' />
              <div className='font-content mt-6 text-xl' dangerouslySetInnerHTML={{ __html: data?.content }} />
              <div className="divider"></div>
              <div className="flex items-center justify-between">
                <button className="btn">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>

                  <div className="badge">  Rating: 4.9</div>
                </button>

              </div>
              <div className="divider"></div>
              <div className="flex">
                <textarea className="textarea textarea-bordered grow" placeholder="Write Your Review"></textarea>
                <button className="btn btn-primary ml-2 leading-10">Post</button>
              </div>
            </div>

            <div className="mx-3 mt-6 w-auto flex flex-col rounded-lg bg-white sm:shrink-0 sm:grow sm:basis-0 h-auto">
              <div className="p-6">
                <div className="flex justify-between">
                  <p className="text-sm text-neutral-500 mb-2">{data?.location}</p>
                  <p className="text-sm text-neutral-500 mb-2 ml-2">{data?.duration} Day</p>
                </div>
                <div className='divider'></div>
                <div className="flex justify-between mt-4">
                  <span className="text-sm text-neutral-500">From</span>
                  <span className="text-sm text-neutral-500">{data?.from_place}</span>
                </div>
                <div className="flex justify-between mt-4">
                  <span className="text-sm text-neutral-500">Departure Time</span>
                  <span className="text-sm text-neutral-500">{data?.departure}</span>
                </div>
                <div className='divider'></div>
                <div className="flex justify-between mt-4">
                  <span className="text-sm text-neutral-500">Price</span>
                  <span className="text-sm text-neutral-500">BDT {data?.price}</span>
                </div>
                <div className="flex justify-between mt-4">
                  <span className="text-sm text-neutral-500">Available</span>
                  <span className="text-sm text-neutral-500">For {data?.aivable_seats} Person</span>
                </div>
                <div className='divider'></div>
                <input type="range" min={1} max={data?.aivable_seats} className="range range-info" value={selected} onChange={e => setSelected(e.target.value)} />
                <div className="flex justify-center mt-4">
                  <span className="text-sm text-neutral-500"> {selected}</span>
                </div>

                <div className="flex justify-between mt-4">
                  <Link className='w-full' to={`/pack/${data?.slug}`}>
                    <button className="btn btn-block btn-outline btn-secondary">Book Now</button>
                  </Link>

                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <Footer />

    </>
  )
}
