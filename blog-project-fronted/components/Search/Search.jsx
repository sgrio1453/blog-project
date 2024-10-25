import React from 'react'

import { CiSearch } from "react-icons/ci";

const Search = () => {
  return (
    <div className='flex bg-black w-full space-x-4 p-2 rounded-xl'>
        <CiSearch className='text-gray-500 w-8 h-8'/>
        <input type='text' placeholder='Arama' className='bg-background outline-none w-full'/>
    </div>
  )
}

export default Search