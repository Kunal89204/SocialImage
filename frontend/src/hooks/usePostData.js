import { useState } from "react";
import axios from "axios";

const usePostData = () => {
    const [totalLikes, setTotalLikes] = useState(0);

    const fetchTotalLikes = async (postId) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/getAllLikes`);
            const data = response.data;
            const filteredData = data.filter((dat) => dat._id === postId);

            if (filteredData.length > 0) {
                setTotalLikes(filteredData[0].totalLikes);
            } else {
                setTotalLikes(0); // Set to 0 if no likes found for the post
            }
        } catch (error) {
            console.error("Error fetching total likes:", error);
            setTotalLikes(0); // Optionally set to 0 in case of an error
        }
    };

    return { totalLikes, fetchTotalLikes };
};

export default usePostData;
