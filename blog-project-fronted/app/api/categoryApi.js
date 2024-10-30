const BASE_URL = "http://localhost:5100/api"; 

const categoryAPI = {
  getAll: async () => {
    const response = await fetch(`${BASE_URL}/category`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  },
  getById: async (id) => {
    const response = await fetch(`${BASE_URL}/category/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  },
  create: async (data) => {
    const response = await fetch(`${BASE_URL}/category`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },
  update: async (id, data) => {
    const response = await fetch(`${BASE_URL}/category/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },
  delete: async (id) => {
    const response = await fetch(`${BASE_URL}/category/${id}`, {
      method: 'DELETE',
    });
    return response.json();
  }
};

export default categoryAPI;