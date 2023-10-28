"use client"

import React, { useState } from "react"

function Dropdown() {
  // Initialize state to store the selected value
  const [selectedValue, setSelectedValue] = useState("")

  // Function to handle the change event when an option is selected
  const handleSelectChange = (event: any) => {
    setSelectedValue(event.target.value)
  }

  return (
    <div>
      <label htmlFor="dropdown">Select an option:</label>
      <select id="dropdown" value={selectedValue} onChange={handleSelectChange}>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
        <option value="option4">Option 4</option>
      </select>
      <p>Selected Value: {selectedValue}</p>
    </div>
  )
}

export default Dropdown
