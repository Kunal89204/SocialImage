import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../context/store'


const useLogout = () => {
    const navigate = useNavigate()
    const { logout } = useAuthStore()
    const logoutHook = () => {
        localStorage.removeItem('user')
        logout();
        navigate('/login')
    }
    return { logoutHook }
}

export default useLogout
