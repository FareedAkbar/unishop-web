"use client"

// App.js or App.tsx
import React from "react"
import { ToastContainer, toast } from "react-toastify"

import "react-toastify/dist/ReactToastify.css"

function App() {
  return (
    <div>
      <h1>Zod Toast Example</h1>
      <button onClick={showToast}>Show Toast</button>
      <ToastContainer />
    </div>
  )
}

function showToast() {
  // Display a success toast message
  toast.success("Button clicked and validated successfully", {
    position: "top-right",
  })
}

export default App
