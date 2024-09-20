import React, { useState } from 'react';
import useLogin from '../hooks/useLogin';
import { Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';
import { Link } from 'react-router-dom';


const Login = () => {
    const { loginHook } = useLogin();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { username, password };
        const result = await loginHook(data);

        if (result) {
            setAlertMessage(result);
            setAlert(true);
            setTimeout(() => {
                setAlert(false);
            }, 3000); // Show alert for 3 seconds
        } else {
            setAlert(false);
        }
    };

    return (
        <div className='h-screen w-screen flex justify-center bg-[#111827] text-[#A8A8A8] items-center'>
            {alert && <div className="absolute top-10">
                <Alert status='error'>
                    <AlertIcon />
                    <AlertTitle>{alertMessage}</AlertTitle>
                    <AlertDescription>{alertMessage === "User doesn't exist" ? "Please register" : "Please enter correct credentials"}</AlertDescription>
                </Alert>
            </div>}
            <div className=''>
                <h1 className='text-6xl text-center mb-10'>Social Image</h1>
                <div className='bg-[#142A3A] p-10 rounded-2xl'>
                    <h2 className='text-center text-4xl pb-4'>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className='flex flex-col gap-2 py-3'>
                            <label htmlFor="username">Username</label>
                            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className='border border-gray-700 bg-[#111827] rounded-lg outline-none focus:border-black p-2' />
                        </div>
                        <div className='flex flex-col gap-2 py-3'>
                            <label htmlFor="password">Password</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='border border-gray-700 bg-[#111827] rounded-lg outline-none focus:border-black p-2' />
                        </div>
                        <div className='text-end pt-2'>
                            <button className='border border-gray-700 py-2 px-10 rounded-lg bg-[#111827] hover:bg-gray-950 transition-all duration-300' type="submit">Login</button>
                        </div>
                    </form>
                    <p>Don't Have an account <Link to={'/register'}>Register</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
