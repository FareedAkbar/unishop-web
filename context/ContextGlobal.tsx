"use client"

import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react"

interface ContextType {
  data: any // Use the appropriate type for your API response data
  setData: Dispatch<SetStateAction<any>>
}

export const ContextApiData = createContext<ContextType>({
  data: {},
  setData: () => {},
})

export const ContextGlobal = ({ children }: any) => {
  const [data, setData] = useState<any>("")

  useEffect(() => {
    // Your Bearer token obtained from authentication
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsb3llZV9pZCI6MjUzLCJvdXRsZXRfaWQiOjE3MywiZmlyc3RfbmFtZSI6IkFkbWluIiwibGFzdF9uYW1lIjoiVXNlciIsInRlbXBsYXRlX2lkIjo1LCJwYXNzcG9ydF9ubyI6bnVsbCwiZGF0ZV9vZl9iaXJ0aCI6bnVsbCwiZ2VuZGVyIjpudWxsLCJkZXNpZ25hdGlvbl9pZCI6WzhdLCJlbWFpbCI6ImFkbWluLmlpdEBnbWFpbC5jb20iLCJwaG9uZV9udW1iZXIiOm51bGwsInNpZ25fdXAiOm51bGwsInByb2ZpbGVfY3JlYXRpb24iOm51bGwsInNhbHQiOm51bGwsImlhdCI6MTY5NzYyNTY2MH0.hMktFh9oDiM3SeYUvuQk3QLWSmLRYnQMmNOcfj9_9v8"

    // Define the API URL
    const apiUrl =
      "http://192.168.18.224:3001/api/v1/ipos/items/getItemsByOutlet"

    fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }
        return response.json()
      })
      .then((apiData) => {
        setData(apiData) // Update the state with the API data
      })
      .catch((error) => {
        console.error("API Error:", error) // Log the error
      })
  }, [])

  return (
    <ContextApiData.Provider value={{ data, setData }}>
      {children}
    </ContextApiData.Provider>
  )
}
