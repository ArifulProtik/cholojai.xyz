
import { apiSlice } from "./ApiSlice"

const PACKAGES_URL = "/api/package"

export const PackageApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPackages: builder.query({
      query: () => ({
        url: PACKAGES_URL,
        method: "GET",
      })
    }),
    getPackageBySlug: builder.query({
      query: (slug) => ({
        url: `${PACKAGES_URL}/${slug}`,
        method: "GET",
      })
    }),
    CreatePackage: builder.mutation({
      query: (data) => ({
        url: PACKAGES_URL,
        method: "POST",
        body: data,
      })
    }),
    SearchPackages: builder.query({
      query: (search) => ({
        url: `/api/search?searchq=${search}`,
        method: "GET",
      })
    }),
  })
})

export const { useGetPackagesQuery, useGetPackageBySlugQuery, useCreatePackageMutation, useSearchPackagesQuery } = PackageApiSlice;
