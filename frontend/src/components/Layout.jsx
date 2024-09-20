import React, {useEffect} from 'react'
import { CiSearch } from 'react-icons/ci'
import { Link } from 'react-router-dom'
import { FaUserFriends } from "react-icons/fa";



import { Menu, MenuButton, MenuList, MenuItem, Avatar, Button } from '@chakra-ui/react'
import { useAuthStore, useFollowStore } from '../context/store'


const Layout = ({ children }) => {
  const { user, logout } = useAuthStore()
  const { followRequests, fetchFollowRequests, loading, error } = useFollowStore()
  const userId = user?.user?._id

  useEffect(() => {
    fetchFollowRequests(userId)
}, [userId])



  return (
    <div className='flex'>
      <div className='
        navbar  
        flex items-center justify-between border-b fixed top-0 w-full border-b-gray-600 p-2 bg-black  z-10'>
        <div><Link to={'/'}>SocialImage</Link></div>
        <div className='flex items-center relative w-1/4'>
          <input type="text" className='bg-gray-900 rounded-full w-full p-2' placeholder='Search...' />
          <CiSearch className='text-2xl absolute right-2' />
        </div>
        <div className='flex gap-4 items-center'>
          <Link to={'/requests'} className='relative'><FaUserFriends className='text-xl ' /><span className='absolute -top-1  text-white border-gray-600 border rounded-full aspect-square h-4 bg-black w-4 text-xs flex items-center justify-center -right-2'>{followRequests.length}</span></Link>
          <Link to={'/createpost'}><button className='bg-gray-900 py-2 px-6 rounded-full flex items-center'>+ Create</button></Link>
          <Menu>
            <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}>
              <Avatar
                width={'45px'}
                height={'45px'}
                borderRadius={'50%'}
                src={user?.user?.profileImg}
              />
            </MenuButton>
            <MenuList bg={'black'} >
              <Link to={`/${user?.user?.username}`}><MenuItem fontSize={'20px'} paddingRight={'20px'} backgroundColor={'rgb(31 41 55)'}>Profile</MenuItem></Link>
              <MenuItem fontSize={'20px'} paddingRight={'20px'} backgroundColor={'rgb(31 41 50)'} onClick={logout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>

      <div className='h-full fixed left-0 flex flex-col justify-between pb-16 pt-4 top-[58px] bottom-0 border-r border-gray-600'>
        <nav className='flex flex-col  w-56 '>
          <Link className='p-4 hover:bg-gray-800 flex items-center gap-2' to="/"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-home"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 12l-2 0l9 -9l9 9l-2 0" /><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" /><path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" /></svg>  Home</Link>
          <Link className='p-4 hover:bg-gray-800 flex items-center gap-2' to="/"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-chart-bar-popular"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 13a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /><path d="M9 9a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /><path d="M15 5a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /><path d="M4 20h14" /></svg>Popular</Link>
          <Link className='p-4 hover:bg-gray-800 flex items-center gap-2' to="/explore"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-brand-safari"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M8 16l2 -6l6 -2l-2 6l-6 2" /><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /></svg>Explore</Link>
          <Link className='p-4 hover:bg-gray-800 flex items-center gap-2' to="/"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-message-circle"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 20l1.3 -3.9c-2.324 -3.437 -1.426 -7.872 2.1 -10.374c3.526 -2.501 8.59 -2.296 11.845 .48c3.255 2.777 3.695 7.266 1.029 10.501c-2.666 3.235 -7.615 4.215 -11.574 2.293l-4.7 1" /></svg>Messages</Link>
          <Link className='p-4 hover:bg-gray-800 flex items-center gap-2' to="/"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-bookmarks"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M15 10v11l-5 -3l-5 3v-11a3 3 0 0 1 3 -3h4a3 3 0 0 1 3 3z" /><path d="M11 3h5a3 3 0 0 1 3 3v11" /></svg>Bookmarks</Link>
        </nav>
        <nav>
          <Link className='p-4 hover:bg-gray-800 flex items-center gap-2' to="/"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-user-circle"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" /></svg>Profile</Link>
        </nav>

      </div>

      <div className='content flex-grow ml-56 mt-[58px] p-4'>
        {children}
      </div>
    </div>
  )
}

export default Layout
