import React, { useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { IoAdd } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { useAuthStore } from '../context/store';




const Navbar = () => {
  const { user, logout } = useAuthStore()
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    console.log('logout clicked')
    logout()
  }

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  return (
    <div className='flex justify-between text-xl  p-2 bg-black text-white sticky top-0'>


      <div className=' w-1/3 m-auto relative'><input type="text" placeholder='Search' className='bg-[#272727] px-2 w-full m-auto rounded py-1 ' />
        <CiSearch className='absolute bottom-1/2 translate-y-1/2  right-2 ' /></div>

      <div className='flex gap-2'>
        <button className='flex items-center border-transparent hover:bg-gray-900 pr-4 pb-1 pl-1 rounded-full text-gray-300 '><IoAdd /><Link to={'/createpost'}>Create</Link></button>
        <div className='w-10'>
          <button
            onClick={toggleDropdown}
            className="text-white    rounded-lg text-xl  text-center inline-flex items-center "
          >
            <img src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg" className='rounded-full' alt="" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-5 z-10 bg-black border border-gray-700 divide-y divide-gray-100 rounded-lg shadow w-44 ">
              <ul className="px-2 text-sm flex flex-col text-gray-300 ">
                <Link to={`/profile/${user.user.username}`} className='text-center text-lg py-2'>Profile</Link>
                <Link className='text-center text-lg py-2 border-y border-gray-600'>Settings</Link>
                <button onClick={
                  handleLogout
                }><Link className='text-center text-lg py-2' >Logout</Link></button>
              </ul>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default Navbar
