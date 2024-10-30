"use client";
import React, { useEffect, useState } from "react";
import ProfileImage from "../Navbar/ProfileImage/ProfileImage";
import DisplayName from "../Navbar/DisplayName/DisplayName";
import Image from "next/image";
import { blogAPI, categoryAPI, userAPI } from "@/app/api";
import { useRouter } from "next/navigation";

const Post = ({ blogs = [], users = {}, categories = {}, categoryId = null, userId = null, searchQuery = null }) => {
  const [allBlogs, setAllBlogs] = useState([]);
  const [usersMap, setUsersMap] = useState({});
  const [categoriesMap, setCategoriesMap] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        let blogData;

        if (categoryId) {
          blogData = await blogAPI.getByCategoryIdWithBlogs(categoryId);
        } else if (userId) {
          blogData = await blogAPI.getByUserIdWithBlogs(userId);
        } else if (searchQuery) {
          blogData = await blogAPI.searchBlogs(searchQuery);
        } else {
          blogData = await blogAPI.getAll();
        }

        const blogs = blogData.data;

        const userPromises = blogs.map((blog) => userAPI.getById(blog.userId));
        const categoryPromises = blogs.map((blog) => categoryAPI.getById(blog.categoryId));

        const usersData = await Promise.all(userPromises);
        const categoriesData = await Promise.all(categoryPromises);

        const usersMap = usersData.reduce((acc, user) => {
          if (user && user.data) {
            acc[user.data.id] = {
              displayName: user.data.displayName,
              profileImagePath: user.data.profileImagePath,
            };
          }
          return acc;
        }, {});

        const categoriesMap = categoriesData.reduce((acc, category) => {
          if (category && category.data) {
            acc[category.data.id] = category.data.categoryName;
          }
          return acc;
        }, {});

        setAllBlogs(blogs);
        setUsersMap(usersMap);
        setCategoriesMap(categoriesMap);
        setIsLoading(false);
      } catch (error) {
        console.error("Veriler alınırken hata oluştu:", error);
        setError("Veriler alınırken bir hata oluştu.");
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, [categoryId, userId, searchQuery]);

  if (isLoading) return <div className="text-white">Yükleniyor...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="flex flex-col space-y-6">
      {allBlogs.length > 0 ? (
        allBlogs.map((blog) => (
          <div
            key={blog.id}
            className="flex flex-row justify-between w-full bg-neutral-900 p-8 rounded-xl mb-4 hover:bg-neutral-800 duration-500"
          >
            <div className="flex flex-col justify-between space-y-6">
              {/* Kullanıcı, tarih ve kategori bilgileri */}
              <div className="flex flex-row items-center space-x-2">
                <div
                  onClick={() => router.push(`/users/${blog.userId}`)}
                  className="h-7 w-7 cursor-pointer"
                >
                  <ProfileImage
                    src={usersMap[blog.userId]?.profileImagePath || "/images/default.jpg"}
                    width={28}
                    height={28}
                  />
                </div>
                <div
                  className="cursor-pointer hover:underline"
                  onClick={() => router.push(`/users/${blog.userId}`)}
                >
                  <DisplayName
                    fontSize={"text-sm"}
                    name={usersMap[blog.userId]?.displayName || "Bilinmeyen Kullanıcı"}
                  />
                </div>
                <div className="text-gray-300">•</div>
                <div className="text-xs text-gray-400">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </div>
              </div>
              {/* Blog Başlığı */}
              <div
                onClick={() => router.push(`/blog/${blog.id}`)}
                className="text-3xl cursor-pointer text-white hover:underline"
              >
                {blog.title}
              </div>
              {/* Kategori */}
              <div
                onClick={() => router.push(`/categories/${blog.categoryId}`)}
                className="text-xl cursor-pointer text-gray-400 hover:underline"
              >
                {categoriesMap[blog.categoryId] || "Bilinmeyen Kategori"}
              </div>
            </div>
            {/* Blog Görseli */}
            <div
              onClick={() => router.push(`/blog/${blog.id}`)}
              className="w-40 h-40 cursor-pointer"
            >
              <Image
                src={blog.imagePath}
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
        <div className="text-white">Henüz blog yok.</div>
      )}
    </div>
  );
};

export default Post;
