import axios from 'axios'
import { useAuthStore } from '../context/store'
import { useNavigate } from 'react-router-dom'


const useRegister = () => {
    const { login } = useAuthStore()
    const navigate = useNavigate()

    const registerHook = async (data) => {
        try {
            const respo = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/register`, data)
            if (respo.data.accessToken) {
                console.log(respo.data.accessToken)
                localStorage.setItem('user', JSON.stringify(respo.data))
                login(respo.data)
                navigate('/')
                return null; // No error
            } else {
                console.log(respo.data.message)
                return respo.data.message; // Return the error message
            }
        } catch (error) {
            console.log(error)
            return "An error occurred during registration"; // Return a generic error message
        }
    }

    return { registerHook }
}

export default useRegister
