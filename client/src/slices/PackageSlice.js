
import { apiSlice } from "./ApiSlice"

const PACKAGES_URL = "/api/package"

export const PackageApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPackages: builder.query({
      query: () => ({
        url: PACKAGES_URL,
        method: "GET",
      })
    })
  })
})

export const { useGetPackagesQuery } = PackageApiSlice;
