import React from 'react'
import './SearchBar.css'

const SearchBar = ({ searchBooks, inputValue }) => {
  return (
    <div className="searchBarContainer">
      <input type="search" className="searchInput" onChange={searchBooks} value={inputValue} placeholder="search..." />
    </div>
  )
}

export default SearchBar
