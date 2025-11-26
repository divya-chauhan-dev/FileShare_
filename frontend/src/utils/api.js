const API_URL = 'http://localhost:5000/api';

export const api = {
  // Get all files
  getAllFiles: async () => {
    const response = await fetch(`${API_URL}/files`);
    return response.json();
  },

  // Get file by ID
  getFileById: async (id) => {
    const response = await fetch(`${API_URL}/files/${id}`);
    return response.json();
  },

  // Get file by share token
  getFileByToken: async (token) => {
    const response = await fetch(`${API_URL}/files/share/${token}`);
    return response.json();
  },

  // Create new file
  createFile: async (fileData) => {
    const response = await fetch(`${API_URL}/files`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fileData),
    });
    return response.json();
  },

  // Update file
  updateFile: async (id, fileData) => {
    const response = await fetch(`${API_URL}/files/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fileData),
    });
    return response.json();
  },

  // Delete file
  deleteFile: async (id) => {
    const response = await fetch(`${API_URL}/files/${id}`, {
      method: 'DELETE',
    });
    return response.json();
  },
};