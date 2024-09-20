import axios from "axios";

export const createFollowSlice = (set) => ({
    followRequests: [],
    loading: false,
    error: null,

    fetchFollowRequests: async (id) => {
        // Set loading to true when starting the fetch
        set({ loading: true, error: null });

        try {
            const response = await axios.get(`http://localhost:8000/api/v1/followers/${id}`);
            // Update the state with the fetched follow requests
            set({ followRequests: response.data, loading: false });
        } catch (error) {
            // Handle errors by updating the error state
            set({ error: error.message, loading: false });
        }
    }
});
