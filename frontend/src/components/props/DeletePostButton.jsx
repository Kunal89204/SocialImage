import axios from 'axios'
import React from 'react'
import { useAuthStore } from '../../context/store'



const DeletePostButton = ({id, imgurl}) => {
    const {user} = useAuthStore()

    const handleDelete = () => {
        axios.delete(`${import.meta.env.VITE_BACKEND_URL}/deletePost/${id}`, {
          data:{
            imgurl:imgurl
          },
          headers:{
            Authorization: `Bearer ${user.accessToken}`
          }
        })        
      }
    
  return (
    <button onClick={() => handleDelete()} className='py-2 text-center hover:bg-gray-900'>Delete</button>
  )
}

export default DeletePostButton
