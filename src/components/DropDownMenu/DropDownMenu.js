import React, { useState } from 'react'
import './DropDownMenu.css'

const DropDownMenu = ({ options, onSelected, selected, placeholder }) => {
  const [showDropDown, setShowDropDown] = useState(false)

  const selectedOption = options?.find(option => option === selected)

  const handleToggleDropDown = () => {
    setShowDropDown(!showDropDown)
  }

  const handleChangeSelectedOption = option => {
    onSelected && onSelected(option)
    setShowDropDown(false)
  }

  return (
    <div>
      <div className="selectedContainer">
        <button className="option" onClick={handleToggleDropDown}>
          {selectedOption ? selectedOption : placeholder}
        </button>

        {showDropDown && (
          <div className="menuContainer">
            {options.map(option => (
              <div key={option} className="menuItem" onClick={() => handleChangeSelectedOption(option)}>
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default DropDownMenu
