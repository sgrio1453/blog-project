"use client";
import React, { useEffect, useState } from "react";
import ProfileImage from "../Navbar/ProfileImage/ProfileImage";
import DisplayName from "../Navbar/DisplayName/DisplayName";
import Image from "next/image";
import { blogAPI, categoryAPI } from "@/app/api";

const Post = () => {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState({});
  const profileImage = "/images/Me.jpg";
  const date = "18 ekim 2024";

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await blogAPI.getAll();
        setBlogs(data.data); 
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const data = await categoryAPI.getAll();
        const categoryMap = data.data.reduce((acc, category) => {
          acc[category.id] = category.name;
          return acc;
        }, {});
        setCategories(categoryMap);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchBlogs();
    fetchCategories();
  }, []);

  return (
    <div className="flex flex-col space-y-6">
      {blogs.length > 0 ? (
        blogs.map((blog) => (
          <div
            key={blog.id}
            className="flex flex-row justify-between w-full bg-neutral-900 p-8 rounded-xl mb-4"
          >
            <div className="flex flex-col justify-between space-y-6">
              {/* pp-username-tarih */}
              <div className="flex flex-row items-center space-x-2">
                <div className="h-7 w-7">
                  <ProfileImage width={28} height={28} />
                </div>
                <DisplayName fontSize={"text-sm"} />
                <div className="text-gray-300">•</div>
                <div className="text-xs text-gray-400">{date}</div>
              </div>
              {/* title */}
              <div className="text-3xl">{blog.title}</div>
              {/* kategori */}
              <div className="text-xl">
                {categories[blog.categoryId] || "Bilinmeyen Kategori"}
              </div>
            </div>
            <div className="w-40 h-40">
              <Image
                src={blog.imagePath || profileImage}
                width={80}
                height={160}
                unoptimized
                alt="blog image"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))
      ) : (
        <div className="text-white">Yükleniyor...</div>
      )}
    </div>
  );
};

export default Post;
