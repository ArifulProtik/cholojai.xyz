import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import ReactTimeAgo from 'react-time-ago'

export const Blog = (props) => {
  const data = props.data
  const posts = data?.posts
  console.log(posts)


  const navigate = useNavigate();
  return (
    <div class="flex flex-col w-full">
      <div className='container mt-8 p-2'>
        <h1 className="text-sm md:text-xl font-bold font-sans text-primary">Latest Attraction</h1>
      </div>
      <div class="divider"></div>
      <div className="container p-2">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 md:gap-6 sm:p-10 md:p-0">
          {
            posts?.map((post) =>
              <Link to={`/${post.slug}`}>
                <div key={post.id} class="card w-full bg-white shadow-xl cursor-pointer">
                  <figure><img className='w-full h-64' src={post.feature_image} alt="Shoes" /></figure>
                  <div className="card-body">
                    <h2 className="card-title text-primary">
                      {post.title}
                    </h2>
                    <div className='flex items-start mt-1'>
                      <div className="avatar">
                        <div className="w-6 rounded-xl">
                          <img src={post.author.profile_photo} />
                        </div>
                      </div>
                      <div className=''> <span className="text-sm font-medium text-neutral-900 ml-1">{post.author.name}</span></div>
                    </div>
                    <div className="text-sm text-neutral font-thin space-x-1 mb-2">
                      <ReactTimeAgo date={Date.parse(post.createdAt)} locale="en-US" />
                    </div>

                    <div className="card-actions justify-start">
                      {post.tags?.map((tag) =>
                        <div key={tag} class="badge badge-outline">{tag}</div>
                      )}

                    </div>
                  </div>
                </div>
              </Link>
            )}


        </div>
      </div>
    </div>

  )
}
