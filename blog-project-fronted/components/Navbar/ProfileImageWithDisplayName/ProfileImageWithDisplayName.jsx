"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DisplayName from "../DisplayName/DisplayName";
import ProfileImage from "../ProfileImage/ProfileImage";
import userAPI from "@/app/api/userApi";


const decodeToken = (token) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.sub;
    
  } catch (error) {
    console.error("Token çözülürken hata oluştu:", error);
    return null;
  }
};

const ProfileImageWithDisplayName = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const router = useRouter(); 


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userId = decodeToken(token);
      if (userId) {

        userAPI
          .getById(userId)
          .then((response) => {
            if (response && response.data) {
              
              setUserData(response.data); 
            }
          })
          .catch((error) => {
            console.error("Kullanıcı verileri alınırken hata oluştu:", error);
          });
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsMenuOpen(true)}
      onMouseLeave={() => setIsMenuOpen(false)}
    >

        <div className="flex flex-row items-center space-x-4 py-2 px-4">
          {userData ? (
            <>
              <DisplayName fontSize={"text-lg"} name={userData.displayName} />
              <div className="h-10 w-10">
                <ProfileImage src={userData.profileImagePath} width={40} height={40} />
              </div>
            </>
          ) : (
            <p>Yükleniyor...</p>
          )}
        </div>


      {isMenuOpen && (
        <div className="absolute bg-black rounded-lg duration-500 w-full">
          <ul>
            <Link href="/users/profile">
              <li className="px-4 py-4 hover:bg-neutral-900">Hesabım</li>
            </Link>
            <Link href="/settings">
              <li className="px-4 py-4 hover:bg-neutral-900">Ayarlar</li>
            </Link>
            <li
              className="px-4 py-4 hover:bg-neutral-900 cursor-pointer"
              onClick={handleLogout}
            >
              Çıkış Yap
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileImageWithDisplayName;
