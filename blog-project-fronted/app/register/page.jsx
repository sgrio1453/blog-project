"use client"
import NavbarLoginAndRegister from '@/components/Navbar/NavbarLoginAndRegister/NavbarLoginAndRegister';
import Image from 'next/image';
import React, { useState } from 'react';
import { MdOutlineEmail, MdOutlineKey } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import userAPI from '@/app/api/userApi';
import { useRouter } from 'next/navigation';

const Page = () => {
  const [formData, setFormData] = useState({
    displayName: '',
    username: '',
    email: '',
    password: '',
    image: null,
  });
  const [message, setMessage] = useState(''); 
  const router = useRouter(); 


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('displayName', formData.displayName);
    formDataToSend.append('userName', formData.username);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('password', formData.password);
    if (formData.image) {
      formDataToSend.append('ImagePath', formData.image);
    }

    try {
      const response = await userAPI.create(formDataToSend);
      if (response) {
        setMessage('Başarıyla kayıt olundu!'); 
        setTimeout(() => {
          router.push('/login'); 
        }, 3000);
      } else {
        setMessage('Kayıt başarısız. Lütfen tekrar deneyin.');
      }
    } catch (error) {
      setMessage('Bir hata oluştu: ' + error.message); 
    }
  };

  return (
    <div className="w-full h-screen bg-black overflow-y-hidden">
      <NavbarLoginAndRegister />
      <div className="flex items-center justify-center h-full">
        <div className="w-3/5 md:w-2/5 lg:w-1/5 py-10 bg-white/10 backdrop-blur-lg rounded-2xl flex flex-col justify-center items-center">
          <form className="w-full" onSubmit={handleSubmit} encType="multipart/form-data">
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
                <CgProfile className="text-white w-6 h-6" />
                <input
                  type="text"
                  name="displayName"
                  placeholder="Ad ve Soyadınızı giriniz"
                  className="w-full h-10 rounded-lg bg-transparent text-white pl-2 outline-none text-sm placeholder:text-sm"
                  value={formData.displayName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex flex-row items-center px-2 rounded-xl w-2/3 space-y-1 bg-white/10">
                <CgProfile className="text-white w-6 h-6" />
                <input
                  type="text"
                  name="username"
                  placeholder="Kullanıcı adı giriniz"
                  className="w-full h-10 rounded-lg bg-transparent text-white pl-2 outline-none text-sm placeholder:text-sm"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex flex-row items-center px-2 rounded-xl w-2/3 space-y-1 bg-white/10">
                <MdOutlineEmail className="text-white w-6 h-6" />
                <input
                  type="email"
                  name="email"
                  placeholder="E-Posta adresinizi giriniz"
                  className="w-full h-10 rounded-lg bg-transparent text-white pl-2 outline-none text-sm placeholder:text-sm"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex flex-row items-center px-2 w-2/3 space-y-1 bg-white/10 rounded-xl">
                <MdOutlineKey className="text-white w-6 h-6" />
                <input
                  type="password"
                  name="password"
                  placeholder="Şifrenizi giriniz"
                  className="w-full h-10 rounded-lg bg-transparent text-white pl-2 outline-none text-sm placeholder:text-sm"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex flex-row items-center px-2 w-2/3 space-y-1 bg-white/10 rounded-xl">
                <input
                  type="file"
                  name="image"
                  onChange={handleImageChange}
                  className="text-white"
                />
              </div>
              <button
                type="submit"
                className="h-10 w-2/3 bg-white hover:bg-gray-400 duration-500 text-black rounded-lg"
              >
                Kayıt Ol
              </button>
            </div>
          </form>

          {/* Mesaj Gösterimi */}
          {message && (
            <div className="mt-4 text-white text-sm bg-gray-700 p-2 rounded-lg">
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
