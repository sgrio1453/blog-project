const BASE_URL = "http://localhost:5100/api"; 

const userAPI = {
  getAll: async () => {
    const response = await fetch(`${BASE_URL}/user`);
    return response.json();
  },
  getById: async (id) => {
    const response = await fetch(`${BASE_URL}/user/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Kullanıcı verileri alınamadı.");
    }

    return response.json();
  },
  create: async (data) => {
    const response = await fetch(`${BASE_URL}/user/register`, {
      method: 'POST',
      body: data, 
    });
    return response.json();
  },
  login: async (email, password) => {
    const response = await fetch(`${BASE_URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Giriş başarısız. Bilgilerinizi kontrol edin.");
    }

    const result = await response.json();
    const token = result.data;
    localStorage.setItem("token", token);
    return token;
  },
  update: async (id, data) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/user/${id}`, {
      method: 'PUT',
      headers: {
        "Authorization": `Bearer ${token}`
      },
      body: data,
    });
    return response.json();
  },
  delete: async (id) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/user/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
  
    if (response.ok) {
      if (response.status === 204) {
        return { success: true };
      }
    }
  
    console.error("Silme işlemi başarısız:", response.statusText);
    throw new Error("Kullanıcı silinemedi.");
  },
  updatePassword: async (id, currentPassword, newPassword) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/user/${id}/update-password`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ currentPassword, newPassword }),
    });

    return response.json();
  }
};

export default userAPI;
