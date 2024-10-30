"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar/Navbar";
import { useRouter } from "next/navigation";
import getUserIdFromToken from "@/utils/getUserIdFromToken";
import Image from "next/image";
import { userAPI } from "@/app/api";

const EditUserPage = () => {
  const router = useRouter();
  const token = localStorage.getItem("token");
  const userId = getUserIdFromToken(token);

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [imagePath, setImagePath] = useState(null);
  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await userAPI.getById(userId);

        if (response && response.data) {
          console.log("Kullanıcı Bilgileri:", response.data); 
          setUserName(response.data.userName || "");
          setEmail(response.data.email || "");
          setDisplayName(response.data.displayName || "");
          setImagePath(response.data.profileImagePath || null); 
        } else {
          console.error("Kullanıcı verileri boş döndü.");
        }
      } catch (error) {
        console.error("Kullanıcı verileri alınırken hata oluştu:", error);
      }
    };

    if (userId) {
      fetchUserDetails();
    }
  }, [userId]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewImage(e.target.files[0]); 
      setImagePath(URL.createObjectURL(e.target.files[0])); 
    }
  };

  const handleUpdateUser = async () => {
    const formData = new FormData();
    formData.append("UserName", userName);
    formData.append("Email", email);
    formData.append("DisplayName", displayName);
    formData.append("Id", userId);
    if (newImage) {
      formData.append("ImagePath", newImage); 
    }
  
    try {
      const result = await userAPI.update(userId, formData);
  
      console.log("API Yanıtı:", result); 
  
      if (result && result.data) {
        alert("Kullanıcı bilgileri başarıyla güncellendi.");
        router.push("/users/profile"); 
      } else if (result && result.errorMessage) {
        alert(`Güncelleme sırasında hata: ${result.errorMessage}`);
      } else {
        alert("Güncelleme sırasında bilinmeyen bir hata oluştu.");
      }
    } catch (error) {
      console.error("Güncelleme işlemi sırasında hata oluştu:", error);
      alert("Bir hata oluştu, lütfen tekrar deneyin.");
    }
  };
  

  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <h1 className="text-3xl text-center text-white my-8">Hesap Bilgilerimi Düzenle</h1>
      <div className="w-1/2 mx-auto bg-neutral-900 p-6 rounded-lg">
        {/* Kullanıcı Adı */}
        <div className="mb-4">
          <label className="text-white">Kullanıcı Adı</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full p-2 mt-2 bg-gray-800 text-white rounded"
            placeholder="Kullanıcı Adı"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="text-white">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mt-2 bg-gray-800 text-white rounded"
            placeholder="Email"
          />
        </div>

        {/* Görünüm Adı */}
        <div className="mb-4">
          <label className="text-white">Ad ve Soyad</label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full p-2 mt-2 bg-gray-800 text-white rounded"
            placeholder="Görünüm Adı"
          />
        </div>

        {/* Resim Önizleme ve Dosya Yükleme */}
        <div className="mb-4">
          <label className="text-white">Profil Resmi</label>
          <div className="mt-2">
            {imagePath && (
              <Image
                src={imagePath}
                alt="Profil Resmi"
                width={100}
                height={100}
                className="rounded"
                unoptimized
              />
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-2 text-white"
          />
        </div>

        {/* Kullanıcı Güncelleme Butonu */}
        <button
          onClick={handleUpdateUser}
          className="w-full p-2 mt-4 bg-yellow-500 text-black rounded font-semibold hover:bg-yellow-600 transition"
        >
          Güncelle
        </button>
      </div>
    </div>
  );
};

export default EditUserPage;
