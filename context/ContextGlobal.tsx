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
  AllOutlets: any
  OutletGetById: any
  setData: Dispatch<SetStateAction<any>>
  setCatogaryList: Dispatch<SetStateAction<any>>
  setAllCampus: Dispatch<SetStateAction<any>>
  setAllProfile: Dispatch<SetStateAction<any>>
  setOutlets: Dispatch<SetStateAction<any>>
  setOutletGetById: Dispatch<SetStateAction<any>>
  setOutletId: Dispatch<SetStateAction<any>>
}

export const ContextApiData = createContext<ContextType>({
  data: {},
  CatogaryList: {},
  AllCampus: {},
  AllProfile: {},
  AllOutlets: {},
  OutletGetById: {},
  setData: () => {},
  setCatogaryList: () => {},
  setAllCampus: () => {},
  setAllProfile: () => {},
  setOutlets: () => {},
  setOutletGetById: () => {},
  setOutletId: () => {},
})

export const ContextGlobal = ({ children }: any) => {
  const [CatogaryList, setCatogaryList] = useState<any>("")
  const [AllCampus, setAllCampus] = useState<any>("")
  const [AllOutlets, setOutlets] = useState<any>("")
  const [AllProfile, setAllProfile] = useState<any>("")
  const [OutletGetById, setOutletGetById] = useState<any>("")
  const [OutletId, setOutletId] = useState<any>("")
  const [data, setData] = useState<any>(OutletGetById?.data)

  console.log("OutletGetById  ...........", OutletGetById)
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsb3llZV9pZCI6MjUzLCJvdXRsZXRfaWQiOjE3MywiZmlyc3RfbmFtZSI6IkFkbWluIiwibGFzdF9uYW1lIjoiVXNlciIsInRlbXBsYXRlX2lkIjo1LCJwYXNzcG9ydF9ubyI6bnVsbCwiZGF0ZV9vZl9iaXJ0aCI6bnVsbCwiZ2VuZGVyIjpudWxsLCJkZXNpZ25hdGlvbl9pZCI6WzhdLCJlbWFpbCI6ImFkbWluLmlpdEBnbWFpbC5jb20iLCJwaG9uZV9udW1iZXIiOm51bGwsInNpZ25fdXAiOm51bGwsInByb2ZpbGVfY3JlYXRpb24iOm51bGwsInNhbHQiOm51bGwsImlhdCI6MTY5NzYyNTY2MH0.hMktFh9oDiM3SeYUvuQk3QLWSmLRYnQMmNOcfj9_9v8" // Replace with your token
  // const getApiUrl =
  //   "http://192.168.18.225:3001/api/v1/ipos/items/getItemsByOutlet"
  const categories = ` http://192.168.18.225:3001/api/v1/student/order/readMenusByOutlet/${OutletId}`
  const getAllCampuses =
    "http://192.168.18.225:3001/api/v1/student/auth/campuses"
  const getAllProfiles =
    "http://192.168.18.225:3001/api/v1/student/auth/customer-profiles"
  const getAllOutlets =
    "http://192.168.18.225:3001/api/v1/ipos/outlet/getOutletStudent"
  // Function to make a GET request

  useEffect(() => {
    // Your Bearer token obtained from authentication

    // Call the fetchData function to make the GET requests
    // fetchData(getApiUrl)
    fetchDataCategories(categories)
    fetchAllCampus(getAllCampuses)
    fetchAllProfiles(getAllProfiles)
    fetchAllOutlets(getAllOutlets)
    fetchOutletById(OutletId)

    // Call the postData function to make the POST request
  }, [OutletId]) // The empty dependency array ensures this effect runs only once
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
        // console.log(apiData, "catogery responce")
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

  const fetchAllOutlets = (url: string) => {
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
        setOutlets(apiData)
      })
      .catch((error) => {
        console.error("GET API Error:", error)
      })
  }
  const fetchOutletById = (OutletId: any) => {
    console.log("OutletId", OutletId)
    const url = `http://192.168.18.224:3001/api/v1/student/order/getItemsByOutlet/${184}`
    // http://192.168.18.224:3001/api/v1/student/order/getItemsByOutlet/184
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
        setData(apiData)
        console.log("apiData.data", apiData)
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
        setOutlets,
        AllOutlets,
        setOutletGetById,
        OutletGetById,
        setOutletId,
      }}
    >
      {children}
    </ContextApiData.Provider>
  )
}
