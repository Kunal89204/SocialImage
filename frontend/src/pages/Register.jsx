import React, { useState } from 'react'
import useRegister from '../hooks/useRegister'
import { Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const Register = () => {
  const { registerHook } = useRegister()
  const [username, setUsername] = useState("")
  const [fullName, setFullname] = useState("")
  const [password, setPassword] = useState("")
  const [alert, setAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = { username, password, fullName }
    const result = await registerHook(data)

    if (result) {
      setAlertMessage(result)
      setAlert(true)
      setTimeout(() => {
        setAlert(false)
      }, 1500)
    } else {
      setAlert(false)
    }
  }

  return (
    <div className='h-screen w-screen flex justify-center bg-[#111827] text-[#A8A8A8] items-center'>
      {alert && (
        <div className="absolute top-10">
          <Alert status='error'>
            <AlertIcon />
            <AlertTitle>{alertMessage}</AlertTitle>
            <AlertDescription>{alertMessage === "User doesn't exist" ? "Please Register" : alertMessage}</AlertDescription>
          </Alert>
        </div>
      )}
      <div>
        <h1 className='text-6xl text-center mb-10'>Social Image</h1>
        <div className='bg-[#142A3A] p-10 rounded-2xl'>
          <h2 className='text-center text-4xl pb-4'>Register</h2>
          <form onSubmit={handleSubmit}>
            <div className='flex flex-col gap-2 py-3'>
              <label htmlFor="fullname">Full Name</label>
              <input type="text" value={fullName} required onChange={(e) => setFullname(e.target.value)} className='border border-gray-700 bg-[#111827] rounded-lg outline-none focus:border-black p-2' />
            </div>
            <div className='flex flex-col gap-2 py-3'>
              <label htmlFor="username">Username</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className='border border-gray-700 bg-[#111827] rounded-lg outline-none focus:border-black p-2' />
            </div>
            <div className='flex flex-col gap-2 py-3'>
              <label htmlFor="password">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='border border-gray-700 bg-[#111827] rounded-lg outline-none focus:border-black p-2' />
            </div>
            <div className='text-end pt-2'><button className='border border-gray-700 py-2 px-10 rounded-lg bg-[#111827] hover:bg-gray-950 transition-all duration-300' type="submit">Register</button></div>
          </form>
          <p>Already have an account <Link to={'/login'}>Login</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Register
