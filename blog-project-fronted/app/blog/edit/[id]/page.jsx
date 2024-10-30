"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import { blogAPI, categoryAPI } from "@/app/api";
import Image from "next/image";

const EditBlogPage = () => {
  const { id } = useParams();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [imagePath, setImagePath] = useState(null);
  const [newImage, setNewImage] = useState(null); 
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); 

  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await blogAPI.getById(id);
        if (response && response.data) {
          const blogData = response.data;
          setTitle(blogData.title);
          setContent(blogData.content);
          setSelectedCategory(blogData.categoryId);
          setImagePath(blogData.imagePath);
        }
      } catch (error) {
        console.error("Blog detayları alınırken hata oluştu:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await categoryAPI.getAll();
        if (response && response.data) {
          setCategories(response.data);
          setFilteredCategories(response.data);
        }
      } catch (error) {
        console.error("Kategoriler alınırken hata oluştu:", error);
      }
    };

    fetchBlogDetails();
    fetchCategories();
  }, [id]);

  useEffect(() => {
    const filtered = categories.filter(
      (category) =>
        category?.categoryName &&
        category.categoryName.toLowerCase().includes(searchTerm?.toLowerCase() || "")
    );
    setFilteredCategories(filtered);
  }, [searchTerm, categories]);

  const handleUpdateBlog = async () => {
    const formData = new FormData();
    formData.append("Title", title);
    formData.append("Content", content);
    formData.append("categoryId", selectedCategory);
    if (newImage) {
      formData.append("blogImage", newImage);
    }
    console.log("data burada", formData);
    
    try {
      const response = await blogAPI.update(id, formData);
      if (response && response.ok) {
        alert("Blog başarıyla güncellendi!");
        router.push("/");
      } else {
        alert("Blog güncellenirken bir hata oluştu.");
      }
    } catch (error) {
      console.error("Blog güncellenirken hata oluştu:", error);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewImage(e.target.files[0]); 
      setImagePath(e.target.files[0]); 
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-black min-h-screen">
      <h1 className="text-3xl text-center text-white mb-8">Blog Düzenle</h1>
      <div className="w-1/2 mx-auto bg-neutral-900 p-6 rounded-lg">
        {/* Başlık */}
        <div className="mb-4">
          <label className="text-white">Başlık</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 mt-2 bg-gray-800 text-white rounded"
          />
        </div>

        {/* İçerik */}
        <div className="mb-4">
          <label className="text-white">İçerik</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 mt-2 bg-gray-800 text-white rounded"
            rows="5"
          ></textarea>
        </div>

        {/* Kategori arama ve seçim */}
        <div className="mb-4 relative" ref={dropdownRef}>
          <label className="text-white">Kategori Ara ve Seç</label>
          <div
            className="w-full p-2 mt-2 bg-gray-800 text-white rounded cursor-pointer"
            onClick={toggleDropdown}
          >
            {selectedCategory
              ? categories.find((cat) => cat.id === selectedCategory)?.categoryName
              : "Kategori seçin"}
          </div>

          {isDropdownOpen && (
            <div className="absolute w-full mt-2 bg-gray-800 text-white rounded z-10">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 bg-gray-700 text-white rounded"
                placeholder="Kategori arayın"
              />
              <div className="max-h-40 overflow-y-auto">
                {filteredCategories.map((category) => (
                  <div
                    key={category.id}
                    onClick={() => {
                      setSelectedCategory(category.id);
                      setIsDropdownOpen(false);
                    }}
                    className={`p-2 cursor-pointer hover:bg-yellow-500 ${
                      selectedCategory === category.id
                        ? "bg-yellow-500 text-black"
                        : "bg-gray-800 text-white"
                    }`}
                  >
                    {category.categoryName}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Resim önizleme ve dosya seçme */}
        <div className="mb-4">
          <label className="text-white">Blog Resmi</label>
          <div className="mt-2">
            {imagePath && (
              <Image
                src={`${imagePath}`}
                alt="Blog Resmi"
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

        {/* Blog Güncelleme Butonu */}
        <button
          onClick={handleUpdateBlog}
          className="w-full p-2 mt-4 bg-yellow-500 text-black rounded font-semibold hover:bg-yellow-600 transition"
        >
          Blog Güncelle
        </button>
      </div>
    </div>
  );
};

export default EditBlogPage;
