import React, { useEffect } from 'react'
import {io} from 'socket.io-client'



const Messages = () => {
    useEffect(() => {
        const socket = io('http://localhost:8001')
    }, [])
  return (
    <div>
      
    </div>
  )
}

export default Messages
