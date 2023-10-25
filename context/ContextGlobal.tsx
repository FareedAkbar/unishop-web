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
  CatogaryList: any // Use the appropriate type for your category data
  setData: Dispatch<SetStateAction<any>>
  setCatogaryList: Dispatch<SetStateAction<any>>
}

export const ContextApiData = createContext<ContextType>({
  data: {},
  CatogaryList: {},
  setData: () => {},
  setCatogaryList: () => {},
})

export const ContextGlobal = ({ children }: any) => {
  const [data, setData] = useState<any>("")
  const [CatogaryList, setCatogaryList] = useState<any>("")

  useEffect(() => {
    // Your Bearer token obtained from authentication
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsb3llZV9pZCI6MjUzLCJvdXRsZXRfaWQiOjE3MywiZmlyc3RfbmFtZSI6IkFkbWluIiwibGFzdF9uYW1lIjoiVXNlciIsInRlbXBsYXRlX2lkIjo1LCJwYXNzcG9ydF9ubyI6bnVsbCwiZGF0ZV9vZl9iaXJ0aCI6bnVsbCwiZ2VuZGVyIjpudWxsLCJkZXNpZ25hdGlvbl9pZCI6WzhdLCJlbWFpbCI6ImFkbWluLmlpdEBnbWFpbC5jb20iLCJwaG9uZV9udW1iZXIiOm51bGwsInNpZ25fdXAiOm51bGwsInByb2ZpbGVfY3JlYXRpb24iOm51bGwsInNhbHQiOm51bGwsImlhdCI6MTY5NzYyNTY2MH0.hMktFh9oDiM3SeYUvuQk3QLWSmLRYnQMmNOcfj9_9v8" // Replace with your token

    // Define the GET and POST API URLs
    const getApiUrl =
      "http://192.168.18.224:3001/api/v1/ipos/items/getItemsByOutlet"
    const categories =
      "http://192.168.18.224:3001/api/v1/ipos/categories/getMobCategories/173"
    const postApiUrl = "http://192.168.18.224:3001/api/v1/orders/calculate"

    // Function to make a GET request
    const fetchData = (url: string) => {
      fetch(url, {
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
          setData(apiData)
        })
        .catch((error) => {
          console.error("GET API Error:", error)
        })
    }

    const fetchDataCategories = (url: string) => {
      fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw Error("Network response was not ok")
          }
          return response.json()
        })
        .then((apiData) => {
          setCatogaryList(apiData)
        })
        .catch((error) => {
          console.error("GET API Error:", error)
        })
    }

    // Function to make the POST request
    const postData = () => {
      fetch(postApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          // Your POST data goes here
          // Example: { key: "value" }
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok")
          }
          return response.json()
        })
        .then((apiData) => {
          // You can handle the POST response here if needed
        })
        .catch((error) => {
          console.error("POST API Error:", error)
        })
    }

    // Call the fetchData function to make the GET requests
    fetchData(getApiUrl)
    fetchDataCategories(categories)

    // Call the postData function to make the POST request
    postData()
  }, []) // The empty dependency array ensures this effect runs only once

  return (
    <ContextApiData.Provider
      value={{ data, setData, CatogaryList, setCatogaryList }}
    >
      {children}
    </ContextApiData.Provider>
  )
}
