import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/forms`;

export const saveForm = async (payload) => {
  const response = await axios.post(API_URL, payload);
  return response.data;
};

export const fetchFormsForUser = async (userId) => {
  const response = await axios.get(`${API_URL}/user/${userId}`);
  return response.data;
};

export const deleteForm = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

export const updateForm = async (id, payload) => {
  const response = await axios.put(`${API_URL}/${id}`, payload);
  return response.data;
};

