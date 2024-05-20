import React from 'react'

function Navbar() {
  return (
    
    <nav className="flex justify-around bg-slate-900 text-white">
        <div className='font-bold text-xl py-2 mx-8'>YourTodos</div>
        <ul className='flex  justify-center items-center mx-9 gap-8  '>
            <li className='hover:font-bold cursor-pointer transition-all
            duration-2000'>Home</li>
            <li className='hover:font-bold cursor-pointer transition-all
            duration-2000'>Your Task</li>
        </ul>

    </nav>
    
  )
}

export default Navbar