import React from 'react'
import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Feed from '../components/Feed'
import PinDetail from '../components/PinDetail'
import CreatePin from '../components/CreatePin'
import Search from '../components/Search'


const Pins = ({userData}) => {
  const [searchTerm, setsearchTerm] = useState('')
  // console.log(userData);
  // search is in the pins and not search component because we have to 
  // share it across multiple component.
  return (
    <div className='px-2 md:px-5'>
      <div className='bg-gray-50'>
        <Navbar searchTerm={searchTerm} setsearchTerm={setsearchTerm} userData={userData}/>
      </div>
      <div className='h-full'>
        <Routes>
          <Route path='/' element={<Feed userData={userData} />}/>
          <Route path='/category/:categoryId' element={<Feed userData={userData}/>}/>
          <Route path='/pin-detail/:pinId' element={<PinDetail userData={userData}/>}/>
          <Route path='/create-pin' element={<CreatePin userData={userData}/>}/>
          <Route path='/search' element={<Search searchTerm={searchTerm} setsearchTerm={setsearchTerm} userData={userData}/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default Pins