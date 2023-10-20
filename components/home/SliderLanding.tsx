"use client"

import React, { useEffect, useState } from "react"

type Slide = {
  url: string
}

function CarouselWithContent() {
  const slides = [
    {
      url: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80",
    },
    {
      url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80",
    },
    {
      url: "https://images.unsplash.com/photo-1661961112951-f2bfd1f253ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto.format&fit=crop&w=2672&q=80",
    },
    {
      url: "https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2253&q=80",
    },
    {
      url: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto.format&fit=crop&w=2671&q=80",
    },
  ]

  const [currentIndex, setCurrentIndex] = useState<number>(0)

  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % slides.length
    setCurrentIndex(newIndex)
  }

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000) // 3000ms = 3 seconds

    return () => {
      clearInterval(interval)
    }
  }, [currentIndex])

  const Dot = ({ index }: { index: number }) => (
    <div
      onClick={() => setCurrentIndex(index)}
      className={`w-2 h-2 rounded-full mx-1 cursor-pointer ${
        index === currentIndex ? "bg-blue-500" : "bg-gray-300"
      }`}
    ></div>
  )

  return (
    <div className="w-full  h-[26rem]  m-auto  relative group">
      <div
        style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
        className="w-full h-full rounded-2xl bg-center bg-cover duration-500"
      ></div>
      <div className="flex top-4 justify-center py-2">
        {slides.map((slide, slideIndex) => (
          <Dot key={slideIndex} index={slideIndex} />
        ))}
      </div>
    </div>
  )
}

export default CarouselWithContent
