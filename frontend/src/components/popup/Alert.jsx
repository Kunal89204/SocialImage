import React from 'react'

const Alert = ({value}) => {
  return (
    <div className='absolute top-10 bg-[#fc3b3b] border py-2 px-10 rounded-lg shadow-md'>
      {value}
    </div>
  )
}

export default Alert
