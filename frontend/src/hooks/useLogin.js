import axios from 'axios';
import { useAuthStore } from '../context/store';
import { useNavigate } from 'react-router-dom';

const useLogin = () => {
    const { login } = useAuthStore();
    const navigate = useNavigate();

    const loginHook = async (data) => {
        try {
            const respo = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`, data);
            if (respo.data.accessToken) {
                login(respo.data);
                navigate('/');
                return null; // No error
            } else {
                console.log(respo.data.message);
                return respo.data.message; // Return the error message
            }
        } catch (error) {
            console.log({ error: "the error is", error });
            return "An error occurred during login"; // Return a generic error message
        }
    };

    return { loginHook };
};

export default useLogin;
