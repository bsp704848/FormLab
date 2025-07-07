import axios from "axios"; 

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/auth`;

export const loginUser = async (payload) => {
    const response = await axios.post(`${API_URL}/login`, payload) 
    return response.data
} 

export const registerUser = async (payload) => {
    const response = await axios.post(`${API_URL}/register`, payload)
    return response.data
}