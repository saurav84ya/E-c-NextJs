"use client"

import React, { useState } from 'react'
import Slidebar from './components/Slidebar'
import { Menu } from 'lucide-react'

export default function layout({ children }) {

  const [menu , setMenu] = useState(false)
  console.log("menu",menu)

  return (
    <main className='flex' >
      <Slidebar menu={menu}  setMenu ={setMenu} />
      <div className='flex-1' >
        <div className='flex p-4 gap-4 items-center ' >
          <div className='   ' >
            <button className=' block md:hidden' onClick={() => setMenu(!menu)} ><Menu size={30} /></button>
          </div>
          <h1 className='font-bold '  >  Dashboard</h1>
        </div>
        <section className='py-3 px-6' >
          {children}
        </section>
      </div>

    </main>
  )
}
