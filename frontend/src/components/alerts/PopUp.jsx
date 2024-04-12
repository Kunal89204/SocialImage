import React from 'react'

const PopUp = (props) => {
  return (
    <div className='absolute top-10 border-2 border-green-500 text-white px-10 py-2 rounded-lg bg-green-400'>
      {props.message}
    </div>
  )
}

export default PopUp
