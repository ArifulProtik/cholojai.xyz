import { apiSlice } from "./ApiSlice"

const BLOG_URL = "/api"
export const BlogApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: () => ({
        url: `${BLOG_URL}/posts/1`,
        method: "GET",
      }),
    }),
    getSingleBlog: builder.query({
      query: (slug) => ({
        url: `${BLOG_URL}/post/${slug}`,
        method: "GET",
      })
    }),
    postBlog: builder.mutation({
      query: (data) => ({
        url: `${BLOG_URL}/post`,
        method: "POST",
        body: data,
      }),
    }),
  }),
})

export const { useGetBlogsQuery, useGetSingleBlogQuery, usePostBlogMutation } = BlogApiSlice
