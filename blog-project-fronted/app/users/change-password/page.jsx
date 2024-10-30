"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import getUserIdFromToken from "@/utils/getUserIdFromToken";
import Navbar from "@/components/Navbar/Navbar";
import { userAPI } from "@/app/api";

const ChangePasswordPage = () => {
  const router = useRouter();
  const token = localStorage.getItem("token");
  const userId = getUserIdFromToken(token);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChangePassword = async () => {
    if (newPassword !== confirmNewPassword) {
      setErrorMessage("Yeni şifreler eşleşmiyor.");
      return;
    }

    try {
      await userAPI.updatePassword(userId, currentPassword, newPassword);
      alert("Şifre başarıyla güncellendi.");
      router.push("/users/profile");
    } catch (error) {
      console.error("Şifre güncellenirken hata oluştu:", error);
      setErrorMessage("Şifre güncellenemedi.");
    }
  };

  return (
    <div className="bg-black min-h-screen">
      <Navbar /> 
      <div className="w-1/2 mt-20 mx-auto bg-neutral-900 p-6 rounded-lg">
        <h1 className="text-3xl text-center text-white mb-8">Şifre Değiştir</h1>
        
        {/* Eski Şifre */}
        <div className="mb-4">
          <label className="text-white">Eski Şifre</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full p-2 mt-2 bg-gray-800 text-white rounded"
            placeholder="Eski Şifre"
          />
        </div>

        {/* Yeni Şifre */}
        <div className="mb-4">
          <label className="text-white">Yeni Şifre</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-2 mt-2 bg-gray-800 text-white rounded"
            placeholder="Yeni Şifre"
          />
        </div>

        {/* Yeni Şifre (Tekrar) */}
        <div className="mb-4">
          <label className="text-white">Yeni Şifre (Tekrar)</label>
          <input
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            className="w-full p-2 mt-2 bg-gray-800 text-white rounded"
            placeholder="Yeni Şifre (Tekrar)"
          />
        </div>

        {/* Hata Mesajı */}
        {errorMessage && (
          <div className="text-red-500 mb-4">{errorMessage}</div>
        )}

        {/* Şifre Güncelleme Butonu */}
        <button
          onClick={handleChangePassword}
          className="w-full p-2 mt-4 bg-yellow-500 text-black rounded font-semibold hover:bg-yellow-600 transition"
        >
          Şifreyi Değiştir
        </button>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
