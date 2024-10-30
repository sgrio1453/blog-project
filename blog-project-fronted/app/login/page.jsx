"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import NavbarLoginAndRegister from "@/components/Navbar/NavbarLoginAndRegister/NavbarLoginAndRegister";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineEmail, MdOutlineKey } from "react-icons/md";
import userAPI from "@/app/api/userApi";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); 
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      await userAPI.login(email, password);
      setMessage("Giriş başarılı!");


      router.push("/");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="w-full h-screen bg-black overflow-y-hidden">
      <NavbarLoginAndRegister />
      <div className="flex items-center justify-center h-full">
        <div className="w-3/5 md:w-2/5 lg:w-1/5 py-10 bg-white/10 backdrop-blur-lg rounded-2xl flex justify-center items-center">
          <form className="w-full" onSubmit={handleLogin}>
            <div className="flex flex-col items-center space-y-8 w-full">
              <div className="w-36 h-24 flex items-center justify-center m-auto py-4">
                <Image
                  src="/images/logo.png"
                  alt="logo"
                  width={144}
                  height={96}
                  className="object-contain"
                />
              </div>
              <div className="flex flex-row items-center px-2 rounded-xl w-2/3 space-y-1 bg-white/10">
                <MdOutlineEmail className="text-white w-8 h-8" />
                <input
                  type="email"
                  name="email"
                  placeholder="E-Posta adresinizi giriniz"
                  className="w-full h-10 rounded-lg bg-transparent text-white pl-2 outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-row items-center px-2 w-2/3 space-y-1 bg-white/10 rounded-xl">
                <MdOutlineKey className="text-white w-8 h-8" />
                <input
                  type="password"
                  name="password"
                  placeholder="Şifre"
                  className="w-full h-10 rounded-lg bg-transparent text-white pl-2 outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="h-10 w-2/3 bg-white hover:bg-gray-400 duration-500 text-black rounded-lg"
              >
                Giriş Yap
              </button>
              <Link href="/forgot-password">
                <p className="text-blue-500">Şifremi Unuttum</p>
              </Link>

              {/* Mesaj Gösterimi */}
              {message && (
                <p className={`text-sm mt-2 ${message.includes("başarılı") ? "text-green-500" : "text-red-500"}`}>
                  {message}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
