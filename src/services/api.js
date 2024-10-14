import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000',
});

export const fetchChatMessages = (conversationId) => api.get(`/chat/conversation/${conversationId}`);

export const sendChatMessage = (conversationId, message, file = null) => {
  // Create a FormData object to hold the payload
  const formData = new FormData();
  const userId = '550e8400-e29b-41d4-a716-446655440000'; // Replace with the actual UUID string for the user

  formData.append('user_id', userId); // Ensure user_id is a UUID string
  formData.append('content', message);
  formData.append('role', 'user');

  if (file) {
    formData.append('file', file); // Append the file to the FormData object
  }

  return api.put(`/chat/conversation/${conversationId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

export default api;
