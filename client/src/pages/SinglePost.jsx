import React from 'react'
import { Header } from '../components/Header'
import Footer from '../components/Footer'
import { useParams } from 'react-router-dom'
import { useGetSingleBlogQuery } from '../slices/BlogSlice'
import ReactTimeAgo from 'react-time-ago'

const SinglePost = () => {

  const { slug } = useParams()
  const { data, isError } = useGetSingleBlogQuery(slug)
  const likes = data?._count?.Like || 0
  const comments = data?._count?.Comment || 0
  document.title = `${data?.title} | CholoJai.xyz`
  return (
    <>
      <div className="bg-white">
        <div className="container">
          <Header />
        </div>
      </div>
      <div className="bg-white h-auto">
        <div className="container mx-auto px-48 py-16">
          {isError && <h1 className="text-4xl font-bold text-center">404 Not Found</h1>}
          {data &&
            <div className='font-content'>
              <h1 className='text-4xl font-bold'>{data.title}</h1>
              <div className="flex mt-4 justify-start">
                <div className="avatar">
                  <div className="w-10 rounded-full">
                    <img src="https://i.pravatar.cc/300" />
                  </div>
                </div>
                <div className='align-middle leading-3'> <span className="leading-8 font-content font-bold text-neutral-500 ml-2">{data.author.name} - </span></div>
                <div className='align-middle leading-3'> <span className="leading-8 font-content font-bold text-neutral-500 ml-2">

                  <ReactTimeAgo date={Date.parse(data.createdAt)} locale="en-US" />

                </span></div>

              </div>
              <img src={data.feature_image} alt="Blog Image" className='w-full h-96 object-cover mt-4' />
              <div className='font-content mt-6 text-xl' dangerouslySetInnerHTML={{ __html: data.content }} />
            </div>
          }
          <div className="divider"></div>

          <div className="flex items-center justify-between">
            <button className="btn">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>

              <div className="badge"> {likes}</div>
            </button>
            <button className="btn">
              Comments
              <div className="badge badge-secondary">{comments}</div>
            </button>

          </div>
          <div className="divider"></div>
          <div className="flex">
            <textarea className="textarea textarea-bordered grow" placeholder="Bio"></textarea>
            <button className="btn btn-primary ml-2 leading-10">Comment</button>
          </div>

        </div>
      </div>

      <Footer />

    </>
  )
}

export default SinglePost
