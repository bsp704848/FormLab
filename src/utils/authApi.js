import axios from "../utils/axiosInstance";


export const loginUser = async (payload) => {
    const response = await axios.post('/api/auth/login', payload);
    return response.data;
  };
  
  export const registerUser = async (payload) => {
    const response = await axios.post('/api/auth/register', payload);
    return response.data;
  };