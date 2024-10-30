"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { categoryAPI } from "../api";
import Navbar from "@/components/Navbar/Navbar";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryAPI.getAll();
        if (response && response.data) {
          setCategories(response.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (id) => {
    router.push(`/categories/${id}`);
  };

  return (
    <div>
        <Navbar />
        <div className="flex flex-col items-center mt-20">
        <h2 className="text-xl font-bold mb-4">Kategoriler</h2>
        <ul className="w-full max-w-md">
          {categories.map((category) => (
            <li
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className="cursor-pointer p-2 bg-neutral-800 text-white mb-2 rounded hover:bg-yellow-500 transition"
            >
              {category.categoryName}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoryList;
