const BASE_URL = "http://localhost:5100/api"; 

const userAPI = {
  getAll: async () => {
    const response = await fetch(`${BASE_URL}/user`);
    return response.json();
  },
  getById: async (id) => {
    const response = await fetch(`${BASE_URL}/user/${id}`);
    return response.json();
  },
  create: async (data) => {
    const response = await fetch(`${BASE_URL}/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },
  update: async (id, data) => {
    const response = await fetch(`${BASE_URL}/user/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },
  delete: async (id) => {
    const response = await fetch(`${BASE_URL}/user/${id}`, {
      method: 'DELETE',
    });
    return response.json();
  }
};

export default userAPI;
