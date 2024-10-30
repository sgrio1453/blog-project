const BASE_URL = "http://localhost:5100/api"; 

const commentAPI = {
  getAll: async () => {
    const response = await fetch(`${BASE_URL}/comment`);
    return response.json();
  },
  getById: async (id) => {
    const response = await fetch(`${BASE_URL}/comment/${id}`);
    return response.json();
  },
  getAllByBlogId: async (blogId) => {
    const response = await fetch(`${BASE_URL}/comment/blog/${blogId}`);
    return response.json();
  },
  create: async (data, token) => {
    const response = await fetch(`${BASE_URL}/comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, 
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },
  update: async (id, data) => {
    const response = await fetch(`${BASE_URL}/comment/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },
  delete: async (id) => {
    const response = await fetch(`${BASE_URL}/comment/${id}`, {
      method: 'DELETE',
    });
    return response.json();
  }
};

export default commentAPI;