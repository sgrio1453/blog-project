"use client";
import React, { useState, useEffect, useRef } from "react";
import { blogAPI, categoryAPI } from "../../api";
import Navbar from "@/components/Navbar/Navbar";
import { useRouter } from "next/navigation";
import { FaTimes } from "react-icons/fa"; 

const Page = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [blogImage, setBlogImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]); 
  const [searchTerm, setSearchTerm] = useState(""); 
  const [dropdownOpen, setDropdownOpen] = useState(false); 
  const router = useRouter();
  const dropdownRef = useRef(null); 

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryAPI.getAll();
        if (response && response.data) {
          setCategories(response.data);
          setFilteredCategories(response.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const filtered = categories.filter(
      (category) =>
        category?.categoryName &&
        category.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCategories(filtered);
  }, [searchTerm, categories]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title) {
        alert("Lütfen bir başlık giriniz.");
        return;
      }
    if (!content) {
        alert("Lütfen bir açıklama giriniz.");
        return;
      }
    if (!categoryId) {
        alert("Lütfen bir kategori seçin.");
        return;
      }

    const formData = new FormData();
    formData.append("title", title); 
    formData.append("content", content);
    formData.append("categoryId", categoryId);
    formData.append("blogImage", blogImage);

    try {
      const response = await blogAPI.create(formData);
      console.log("Response:", response);

      if (response && response.data) {
        router.push("/");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const clearCategory = () => {
    setCategoryId("");
    setSearchTerm("");
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen text-white flex flex-col items-center">
        <h1 className="text-2xl font-semibold mt-10">Yeni Blog Ekle</h1>
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg mt-6 bg-neutral-900 p-6 rounded-lg shadow-md"
          encType="multipart/form-data"
        >
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="title">
              Başlık
            </label>
            <input
              id="title"
              type="text"
              className="w-full p-2 rounded bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Başlık giriniz"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="content">
              İçerik
            </label>
            <textarea
              id="content"
              rows="8"
              className="w-full p-2 rounded bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="İçerik giriniz"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className="mb-4 relative" ref={dropdownRef}>
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="category"
            >
              Kategori Ara ve Seç
            </label>
            <div className="flex items-center bg-white/10 px-2">
              <input
                id="category"
                type="text"
                className="w-full p-2 rounded bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Kategori arayın"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setDropdownOpen(true); 
                }}
                onFocus={() => setDropdownOpen(true)}
              />
              {categoryId && (
                <div
                  className="cursor-pointer"
                  onClick={clearCategory} 
                  title="Kategoriyi Kaldır"
                >
                  <FaTimes className="text-red-500" />
                </div>
              )}
            </div>
            {dropdownOpen && filteredCategories.length > 0 && (
              <ul className="absolute bg-neutral-800 w-full mt-1 max-h-40 overflow-y-auto rounded shadow-md z-10">
                {filteredCategories.map((category) => (
                  <li
                    key={category.id}
                    className="p-2 hover:bg-yellow-500 hover:text-black cursor-pointer"
                    onClick={() => {
                      setCategoryId(category.id);
                      setSearchTerm(category.categoryName); 
                      setDropdownOpen(false); 
                    }}
                  >
                    {category.categoryName}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="blogImage"
            >
              Blog Resmi
            </label>
            <input
              id="blogImage"
              type="file"
              accept="image/*"
              className="w-full p-2 rounded bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              onChange={(e) => setBlogImage(e.target.files[0])}
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 mt-4 bg-yellow-500 text-black rounded font-semibold hover:bg-yellow-600 transition"
          >
            Blog Ekle
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
