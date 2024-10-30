const BASE_URL = "http://localhost:5100/api"; 

const blogAPI = {
  getAll: async () => {
    const response = await fetch(`${BASE_URL}/blog`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Bloglar alınamadı.");
    }

    return response.json();
  },
  getById: async (id) => {
    const response = await fetch(`${BASE_URL}/blog/${id}`);
    return response.json();
  },
  getByCategoryIdWithBlogs: async (categoryId) => {
    const response = await fetch(`${BASE_URL}/blog/categoryWithBlogs/${categoryId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  },
  getByUserIdWithBlogs: async (userId) => {
    const response = await fetch(`${BASE_URL}/blog/userWithBlogs/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  },
  create: async (data) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/blog`, {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${token}`
      },
      body: data,
    });
  
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Hata: ${errorText}`);
    }
  
    return response.json();
  },
  update: async (id, data) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/blog/${id}`, {
      method: 'PUT',
      headers: {
        "Authorization": `Bearer ${token}`
      },
      body: data,
    });
    return response.json();
  },
  searchBlogs: async (searchTerm) => {
    const response = await fetch(`${BASE_URL}/blog/search?query=${searchTerm}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Bloglar alınamadı.");
    }

    return response.json();
  },
  delete: async (id) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/blog/${id}`, {
      method: 'DELETE',
      headers: {
        "Authorization": `Bearer ${token}`, 
        'Content-Type': 'application/json',
      },
    });
  
    if (!response.ok) {
      throw new Error('Blog silme işlemi başarısız.');
    }
  
    return response; 
  }
};
export default blogAPI;
