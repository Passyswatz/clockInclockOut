'use client'

import Image from 'next/image'
import { CustomButton } from './CustomButton';

export const Navbar = () => {
  return (
    <div className=" pr-4 pl-4   h-20 flex flex-row justify-between border-b-2 border-gray-700  shadow-md ">

    <Image 
          src="/time.png"
          alt='logo'
          width={70}
          height={120}
          className=' pb-2 pt-2 rounded-[10px] '/>

          <CustomButton  
          title="Contact Us"
          className="bg-blue-400 hover:bg-blue-600 text-white font bold my-2 mx-3 p-3 rounded-lg"/>

    </div>
  )
}
