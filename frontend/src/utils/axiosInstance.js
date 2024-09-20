import axios from "axios";
import { useAuthStore } from "../context/store";


const getAxiosInstance = () => {
    const { user } = useAuthStore()
    const token = user.accessToken;
    return axios.create({
        baseURL: import.meta.env.VITE_BACKEND_URL,
        timeout: 5000,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export default getAxiosInstance;