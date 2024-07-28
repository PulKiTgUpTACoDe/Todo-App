import React from 'react'

const Navbar = () => {
  return (
    <>
    <div className="md:container h-20 bg-neutral-900 mx-auto mt-3 rounded-lg md:justify-between items-center text-white md:flex justify-center w-full">
      <div className="logo font-bold md:text-2xl text-lg relative md:left-20">
        <h1 className='w-full flex justify-center'>Task Planner</h1>
      </div>
      <div className='flex list-none md:justify-between md:w-1/4 relative md:right-20 md:text-lg text-sm font-semibold md:gap-2 items-center gap-10 justify-evenly mt-3'>
        <li className='cursor-pointer hover:font-bold '>Home</li>
        <li className='cursor-pointer hover:font-bold '>Your tasks</li>
        <li className='cursor-pointer hover:font-bold '>Help</li>
      </div>
    </div>
    </>
  )
}

export default Navbar