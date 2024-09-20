import React from 'react';
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className='bg-[#000000] text-white h-screen flex flex-col border-r border-gray-900 sticky top-0 w-64'>
        <div className='py-10 text-center'><img src="" alt="" />Social Image</div>

      <div className='flex flex-col justify-between h-full'>
        <nav className='flex flex-col'>
          <Link className='rounded hover:bg-[#272727] text-center py-2 m-2 px-16' to={'/'}>Home</Link>
          <Link className='rounded hover:bg-[#272727] text-center py-2 m-2 px-16' to={'/posts'}>Posts</Link>
          <Link className='rounded hover:bg-[#272727] text-center py-2 m-2 px-16' to={'/explore'}>Explore</Link>
          <Link className='rounded hover:bg-[#272727] text-center py-2 m-2 px-16' to={'/messages'}>Messages</Link>
          <Link className='rounded hover:bg-[#272727] text-center py-2 m-2 px-16' to={'/notification'}>Notifications</Link>
        </nav>

        <div className='px-6 py-4'>
          More
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
