import React, { useState } from 'react'
import { HiMagnifyingGlass, HiMiniXMark } from 'react-icons/hi2';

const SearchBar = () => {

  const [searchTerm,setsearchTerm] = useState("");
  const [isOpen, setisOpen] = useState(false);

  const handleSearchToggle=()=>
  {
    setisOpen(!isOpen);
  }

  const handleSearch=(e) =>
  {
    e.preventDefault();
    console.log("Search Term: ", searchTerm);
    setisOpen(false);
  }
  return (
    <div className={`flex items-center justify-center w-full transition-all duration-300 ${isOpen ? "absolute top-0 left-0 w-full bg-white h-24 z-50" : "w-auto"}`}>
      {
        isOpen ? (
        <form onSubmit={handleSearch}className="relative flex items-center justify-center w-full">
          <div className="relative w-1/2">
          <input 
            type='text'
            placeholder="Search..."
            onChange={(e)=> setsearchTerm(e.target.value)}
            value={searchTerm}
            className="bg-gray-100 px-4 py-2
             pl-2 pr-12 rounded-lg focus:outline w-full placeholder:text-gray-700">
          </input>
          {/*Seacrh Icon */}
          <button type='submit' className="absolute right-2 top-1/2 transform -translate-y-1/2
           text-gray-600 hover:text-gray-800">
            <HiMagnifyingGlass className='h-6 w-6 text-gray-700'/>
          </button>
          </div>
          {/*Close button */}
          <button
          type='button'
          onClick={handleSearchToggle}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800">
            <HiMiniXMark className="h-6 w-6"/>
          </button>
        </form>
        ) : (
          <button onClick={handleSearchToggle}>
            <HiMagnifyingGlass className="h-6 w-6 text-gray-700"/>
          </button>
        )
      }
    </div>
  )
}

export default SearchBar