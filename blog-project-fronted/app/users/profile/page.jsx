"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import userAPI from "@/app/api/userApi";
import Navbar from "@/components/Navbar/Navbar";
import ProfileImage from "@/components/Navbar/ProfileImage/ProfileImage";
import Post from "@/components/Post/Post";

const AccountPage = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchUserData = async () => {
      if (token) {
        const userId = JSON.parse(atob(token.split(".")[1])).sub;
        console.log("User ID:", userId);
        try {
          const userResponse = await userAPI.getById(userId);
          console.log("User Response:", userResponse);
          if (userResponse && userResponse.data) {
            setUserData(userResponse.data);
          } else {
            console.error("Kullanıcı verisi alınamadı.");
          }
        } catch (error) {
          console.error("Veriler alınırken hata oluştu:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        console.error("Token mevcut değil, yönlendirme yapılıyor.");
        router.push("/login");
      }
    };

    fetchUserData();
  }, [router]);

  if (isLoading) {
    return <div className="text-white">Yükleniyor...</div>;
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <div className="w-1/2 mx-auto mt-10 bg-neutral-900 p-6 rounded-lg flex justify-between items-center">
        {/* Kullanıcı Profil Resmi */}
        {userData && (
          <div className="flex-shrink-0 w-32 h-32">
            <ProfileImage
              src={userData.profileImagePath}
              width={128}
              height={128}
              className="rounded-full"
            />
          </div>
        )}

        {/* Kullanıcı Bilgileri */}
        <div className="flex-grow ml-10">
          {userData && (
            <div className="bg-neutral-800 p-4 rounded-lg">
              <h1 className="text-3xl text-white mb-4">
                {userData.displayName}
              </h1>

              <div className="text-lg text-gray-400 space-y-2">
                <div className="flex items-center">
                  <span className="font-semibold text-white w-72">
                    Kullanıcı Adı:
                  </span>
                  <span>@{userData.userName}</span>
                </div>

                <div className="flex items-center">
                  <span className="font-semibold text-white w-72">
                    E-posta:
                  </span>
                  <span>{userData.email}</span>
                </div>

                <div className="flex items-center w-full">
                  <span className="font-semibold text-white w-72">
                    Hesap Oluşturulma Tarihi:
                  </span>
                  <span>{formatDate(userData.createdAt)}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Kullanıcı Postları */}
      <div className="w-1/2 mx-auto  my-20">
        <Post userId={userData?.id} />
      </div>
    </div>
  );
};

export default AccountPage;
