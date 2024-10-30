"use client"
import Navbar from '@/components/Navbar/Navbar';
import React from 'react';
import { useRouter } from 'next/navigation';
import getUserIdFromToken from '@/utils/getUserIdFromToken'; 
import { userAPI } from '../api';

const page = () => {
  const router = useRouter();
  const token = localStorage.getItem('token');
  const userId = getUserIdFromToken(token); 

  
  const handleDeleteAccount = async () => {
    if (confirm("Hesabınızı silmek istediğinize emin misiniz?")) {
      try {
        const result = await userAPI.delete(userId);
        console.log(result);
        
        if (result.success) {
          localStorage.removeItem("token");
  
          alert("Hesabınız başarıyla silindi.");
          router.push("/");
        } else {
          alert("Hata: Kullanıcı silinemedi.");
        }
      } catch (error) {
        console.error("Silme işlemi sırasında hata:", error);
        alert("Bir hata oluştu, lütfen tekrar deneyin.");
      }
    }
  };
  

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center mt-20">
        <h2 className="text-xl font-bold mb-4">Ayarlar</h2>
        <ul className="w-full max-w-md">
          <li
            onClick={() => router.push('/users/edit')}
            className="cursor-pointer p-2 bg-neutral-800 text-white mb-2 rounded hover:bg-yellow-500 transition"
          >
            Bilgilerimi Düzenle
          </li>
          <li
            onClick={() => router.push('/users/change-password')}
            className="cursor-pointer p-2 bg-neutral-800 text-white mb-2 rounded hover:bg-yellow-500 transition"
          >
            Şifreyi Değiştir
          </li>
          <li
            onClick={handleDeleteAccount}
            className="cursor-pointer p-2 bg-red-600 text-white mb-2 rounded hover:bg-red-700 transition"
          >
            Hesabımı Sil
          </li>
        </ul>
      </div>
    </div>
  );
};

export default page;
