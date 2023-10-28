"use client"

import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react"

interface ContextType {
  data: any
  CatogaryList: any
  AllCampus: any
  AllProfile: any
  setData: Dispatch<SetStateAction<any>>
  setCatogaryList: Dispatch<SetStateAction<any>>
  setAllCampus: Dispatch<SetStateAction<any>>
  setAllProfile: Dispatch<SetStateAction<any>>
}

export const ContextApiData = createContext<ContextType>({
  data: {},
  CatogaryList: {},
  AllCampus: {},
  AllProfile: {},
  setData: () => {},
  setCatogaryList: () => {},
  setAllCampus: () => {},
  setAllProfile: () => {},
})

export const ContextGlobal = ({ children }: any) => {
  const [data, setData] = useState<any>("")
  const [CatogaryList, setCatogaryList] = useState<any>("")
  const [AllCampus, setAllCampus] = useState<any>("")
  const [AllProfile, setAllProfile] = useState<any>("")

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsb3llZV9pZCI6MjUzLCJvdXRsZXRfaWQiOjE3MywiZmlyc3RfbmFtZSI6IkFkbWluIiwibGFzdF9uYW1lIjoiVXNlciIsInRlbXBsYXRlX2lkIjo1LCJwYXNzcG9ydF9ubyI6bnVsbCwiZGF0ZV9vZl9iaXJ0aCI6bnVsbCwiZ2VuZGVyIjpudWxsLCJkZXNpZ25hdGlvbl9pZCI6WzhdLCJlbWFpbCI6ImFkbWluLmlpdEBnbWFpbC5jb20iLCJwaG9uZV9udW1iZXIiOm51bGwsInNpZ25fdXAiOm51bGwsInByb2ZpbGVfY3JlYXRpb24iOm51bGwsInNhbHQiOm51bGwsImlhdCI6MTY5NzYyNTY2MH0.hMktFh9oDiM3SeYUvuQk3QLWSmLRYnQMmNOcfj9_9v8" // Replace with your token
  // Define the GET and POST API URLs
  const getApiUrl =
    "http://192.168.18.225:3001/api/v1/ipos/items/getItemsByOutlet"
  const categories =
    "http://192.168.18.225:3001/api/v1/ipos/categories/getMobCategories/173"
  // const postApiUrl = "http://192.168.18.225:3001/api/v1/orders/calculate"
  const getAllCampuses =
    "http://192.168.18.225:3001/api/v1/student/auth/campuses"
  const getAllProfiles =
    "http://192.168.18.225:3001/api/v1/student/auth/customer-profiles"
  // Function to make a GET request
  useEffect(() => {
    // Your Bearer token obtained from authentication

    // Call the fetchData function to make the GET requests
    fetchData(getApiUrl)
    fetchDataCategories(categories)
    fetchAllCampus(getAllCampuses)
    fetchAllProfiles(getAllProfiles)

    // Call the postData function to make the POST request
  }, []) // The empty dependency array ensures this effect runs only once
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

  const fetchAllCampus = (url: string) => {
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
        setAllCampus(apiData)
      })
      .catch((error) => {
        console.error("GET API Error:", error)
      })
  }
  const fetchAllProfiles = (url: string) => {
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
        setAllProfile(apiData)
      })
      .catch((error) => {
        console.error("GET API Error:", error)
      })
  }
  return (
    <ContextApiData.Provider
      value={{
        data,
        setData,
        CatogaryList,
        setCatogaryList,
        AllCampus,
        setAllCampus,
        AllProfile,
        setAllProfile,
      }}
    >
      {children}
    </ContextApiData.Provider>
  )
}
