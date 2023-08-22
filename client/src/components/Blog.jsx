import React from 'react'

export const Blog = () => {
  return (
    <div class="flex flex-col w-full">
      <div className='container mt-8 p-2'>
        <h1 className="text-sm md:text-xl font-bold font-sans text-primary">Latest Attraction</h1>
      </div>
      <div class="divider"></div>
      <div className="container p-2">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6 sm:p-10 md:p-0">
          <div class="card w-full bg-white shadow-xl">
            <figure><img className='w-full h-64' src="https://images.pexels.com/photos/122107/pexels-photo-122107.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Shoes" /></figure>
            <div class="card-body">
              <h2 class="card-title text-primary">
                Cox's Bazar The City of Sea
              </h2>
              <div className='flex items-start mt-1'>
                <div className="avatar">
                  <div className="w-6 rounded-xl">
                    <img src="https://i.pravatar.cc/300" />
                  </div>
                </div>
                <div className=''> <span className="text-sm font-medium text-neutral-900 ml-1">Md Ariful Islam</span></div>
              </div>
              <div className="text-sm text-neutral font-thin space-x-1 mb-2">
                2 days ago
              </div>

              <div class="card-actions justify-start">
                <div class="badge badge-outline">Fashion</div>
                <div class="badge badge-outline">Products</div>
                <div class="badge badge-outline">Fashion</div>
                <div class="badge badge-outline">Products</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}
