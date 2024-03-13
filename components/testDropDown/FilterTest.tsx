import React, { useState } from "react"
import Slider from "rc-slider"

import "rc-slider/assets/index.css"

const PriceRangeSlider = () => {
  const minPrice = 0
  const maxPrice = 100
  const [range, setRange] = useState([minPrice, maxPrice])

  const handleSliderChange = (newRange: any) => {
    setRange(newRange)
  }

  return (
    <div className="p-4 border border-gray-300 rounded-lg">
      <Slider
        min={minPrice}
        max={maxPrice}
        value={range}
        onChange={handleSliderChange}
        range
      />
      <div className="text-center mt-4">
        <span className="text-lg font-bold text-indigo-600">
          ${range[0]} - ${range[1]}
        </span>
      </div>
    </div>
  )
}

export default PriceRangeSlider
