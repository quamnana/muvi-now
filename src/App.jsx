import React, { useState } from 'react'
import Search from './components/Search'

const App = () => {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <main>
      <div className="pattern" />
        <div className='wrapper'>
          <header>
          <img src="./hero-img.png" alt="hero-img" />
          <h1>Escape into a world of endless <span className='text-gradient'>entertainment</span>  🎬🍿</h1>

          </header>

          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>

          <div className='text-3xl text-white'>{searchTerm}</div>
        </div>
    </main>
  )
}


export default App