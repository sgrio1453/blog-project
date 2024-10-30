"use client";
import Navbar from "@/components/Navbar/Navbar";
import Post from "@/components/Post/Post";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { categoryAPI } from "@/app/api";

const CategoryPage = () => {
  const { id } = useParams();
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryName = async () => {
      try {
        const response = await categoryAPI.getById(id);
        if (response && response.data) {
          setCategoryName(response.data.categoryName);
        }
      } catch (error) {
        console.error("Kategori alınırken hata oluştu:", error);
        setCategoryName("Bilinmeyen Kategori");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCategoryName();
    }
  }, [id]);

  if (loading) {
    return <div className="text-white">Yükleniyor...</div>;
  }

  return (
    <div className="bg-black">
      <Navbar />
      <div className="min-h-screen w-1/2 mx-auto mt-20 p-4">
        <h1 className="text-2xl text-white mb-4">
          {categoryName} Kategorisi
        </h1>
        <Post categoryId={id} />
      </div>
    </div>
  );
};

export default CategoryPage;
