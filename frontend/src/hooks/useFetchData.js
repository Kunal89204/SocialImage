import axios from "axios";

const baseUrl = import.meta.env.VITE_BACKEND_URL

const fetchData = {
    
    getallposts: async (accessToken) => {
        try {
            const response = await axios.get(`${baseUrl}/getallpost`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            return response.data
        } catch (error) {
            console.log(error)
        }
    },

    getUsers: async (accessToken, username) => {
        try {
            const response = await axios.get(`${baseUrl}/getUsers`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            const filteredUsers = response.data.filter(u => u.username !== username);
            return filteredUsers
        } catch (error) {
            console.log(error)
        }
    },

    getFollowStatus: async (accessToken, userId, personId) => {
        try {
            const response = axios.post(`${baseUrl}/getFollowStatus/${userId}`, { personId }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },

            })

            return response
        } catch (error) {
            console.log(error)
            return error;
        }
    },

    getPostData: async (accessToken, postId) => {
        try {
            const response = await axios.get(`${baseUrl}/getPost/${postId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })

            return response.data
        } catch (error) {
            console.log(error)
            return error
        }
    },

    getLikesForAPost: async (accessToken, postId) => {
        try {
            const response = await axios.get(`${baseUrl}/getLikesForAPost/${postId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })

            return response.data
        } catch (error) {
            console.log(error)
            return error
        }
    },

    getSavedPost: async (accessToken, userId) => {
        try {
            const response = await axios.get(`${baseUrl}/getsavedpost/${userId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            return response.data
        } catch (error) {
            console.log(error)
            return error
        }
    },

    handleSave: async (accessToken, userId, postId) => {
        try {
            const response = await axios.post(`${baseUrl}/savepost`, { userId, postId }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })

            return response.data
        } catch (error) {
            console.log(error)
            return error
        }
    },

    handleLike: async (accessToken, userId, postId) => {
        try {
            const response = await axios.post(`${baseUrl}/toggleLike/${userId}`, { postId }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })

            return response.data
        } catch (error) {
            console.log(error)
            return error
        }
    },

    addComment: async (accessToken, postId, userId, content) => {
        try {
            const response = await axios.post(`${baseUrl}/addComment`, { userId, postId, content }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            return response.data
        } catch (error) {
            console.log(error)
            return error
        }
    },

    getCommentsForAPost: async (accessToken, postId) => {
        try {
            const response = axios.get(`${baseUrl}/getCommentsForAPost/${postId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })

            return response
        } catch (error) {
            console.log(error)
            return error
        }
    },

    deleteComment: async (accessToken, commentId) => {
        try {
            const response = await axios.delete(`${baseUrl}/deleteComment/${commentId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })

            return response.data
        } catch (error) {
            console.log(error)
            return error
        }
    }
}


export { fetchData }
