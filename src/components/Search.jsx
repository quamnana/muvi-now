import React from 'react'

const Search = ({searchTerm, setSearchTerm}) => {
  return (
    <div className="search">
        <div>
            <img src="./search.svg" alt="search-icon" />  

        <input 
          type="text" 
          placeholder="Search for movies, TV shows, or exclusive content..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        </div>
 
    </div>
  )
}

export default Search