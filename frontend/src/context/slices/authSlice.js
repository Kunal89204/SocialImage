import axios from 'axios'

export const createAuthSlice = (set) => ({
    user: JSON.parse(localStorage.getItem('user')) || false,
    
    login: (userData) => {
      localStorage.setItem('user', JSON.stringify(userData))
        set({ user: userData });
      },
      
      logout: () => {
        localStorage.removeItem('user');
        set({ user: false });
      },

      validateToken: async () => {
        const user = JSON.parse(localStorage.getItem('user')) || false;
    
        if (user && user.accessToken) {
          try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/validate-token`, {
              headers: {
                Authorization: `Bearer ${user.accessToken}`,
              },
            });
    
            if (response.status === 200 && response.data.valid) {
              set({ user });
            } else {
              localStorage.removeItem('user');
              set({ user: false });
              console.log("toke invalid")
            }
          } catch (error) {
            console.error('Error validating token:', error);
            localStorage.removeItem('user');
            set({ user: null });
          }
        }
    }

})