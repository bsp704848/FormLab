import axios from '../utils/axiosInstance';



export const saveForm = async (payload) => {
  const response = await axios.post('/api/forms', payload);
  return response.data;
};

export const fetchFormsForUser = async (userId) => {
  const response = await axios.get(`/api/forms/user/${userId}`);
  return response.data;
};

export const deleteForm = async (id) => {
  const response = await axios.delete(`/api/forms/${id}`);
  return response.data;
};

export const updateForm = async (id, payload) => {
  const response = await axios.put(`/api/forms/${id}`, payload);
  return response.data;
};

