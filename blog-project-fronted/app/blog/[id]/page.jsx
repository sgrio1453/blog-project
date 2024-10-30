"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { blogAPI, userAPI, categoryAPI, commentAPI } from "@/app/api";
import Image from "next/image";
import Navbar from "@/components/Navbar/Navbar";
import ProfileImage from "@/components/Navbar/ProfileImage/ProfileImage";
import Link from "next/link";
import { FaEdit, FaTrash } from "react-icons/fa";
import CommentList from "@/components/CommentList/CommentList";
import getUserIdFromToken from "@/utils/getUserIdFromToken";

const BlogDetailPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [author, setAuthor] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [token, setToken] = useState(null);
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    setToken(savedToken);

    if (savedToken) {
      const userId = getUserIdFromToken(savedToken);
      setLoggedInUserId(userId);
    }
  }, []);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await blogAPI.getById(id);
        if (response && response.data) {
          const blogData = response.data;
          setBlog(blogData);

          const userResponse = await userAPI.getById(blogData.userId);
          if (userResponse && userResponse.data) {
            setAuthor(userResponse.data);
          }

          const categoryResponse = await categoryAPI.getById(
            blogData.categoryId
          );
          if (categoryResponse && categoryResponse.data) {
            setCategoryName(categoryResponse.data.categoryName);
          }
        }

        const commentResponse = await commentAPI.getAllByBlogId(id);
        if (commentResponse && commentResponse.data) {
          const commentsData = commentResponse.data;

          const commentsWithUserDetails = await Promise.all(
            commentsData.map(async (comment) => {
              const userResponse = await userAPI.getById(comment.userId);
              if (userResponse && userResponse.data) {
                comment.user = userResponse.data;
              }
              return comment;
            })
          );

          setComments(commentsWithUserDetails);
        }
      } catch (error) {
        console.error("Veriler alınırken hata oluştu:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchBlogDetails();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    try {
      const commentData = { content: newComment, blogId: parseInt(id) };
      const response = await commentAPI.create(commentData, token);
      if (response && response.data) {
        const userResponse = await userAPI.getById(response.data.userId);
        if (userResponse && userResponse.data) {
          response.data.user = userResponse.data;
        }
        setComments((prevComments) => [...prevComments, response.data]);
        setNewComment("");
      }
    } catch (error) {
      console.error("Yorum eklenirken hata oluştu:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditBlog = () => {
    if (blog) {
      router.push(`/blog/edit/${blog.id}`);
    }
  };

  const handleDeleteBlog = async () => {
    const confirmDelete = confirm(
      "Blog yazısını silmek istediğinizden emin misiniz?"
    );
    if (confirmDelete && blog) {
      try {
        const deleteResponse = await blogAPI.delete(blog.id, token);
        if (deleteResponse && deleteResponse.ok) {
          alert("Blog yazısı başarıyla silindi.");
          router.push("/");
        } else {
          console.error("Blog silinirken hata oluştu.");
          alert("Blog silinirken bir hata oluştu.");
        }
      } catch (error) {
        console.error("Blog silinirken hata oluştu:", error);
      }
    }
  };

  if (isLoading) {
    return <div className="text-white">Yükleniyor...</div>;
  }

  if (!blog) {
    return <div className="text-red-500">Blog bulunamadı.</div>;
  }

  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <div className="w-1/2 mx-auto mt-10 bg-neutral-900 rounded-lg overflow-hidden">
        {/* Blog Görseli */}
        <div className="relative w-full h-60">
          <Image
            src={blog.imagePath}
            alt="Blog Image"
            layout="fill"
            objectFit="contain"
            unoptimized
          />
        </div>

        {/* Kullanıcı ve Tarih Bilgileri */}
        <div className="flex justify-between p-4 items-center">
          <div className="flex items-center space-x-4">
            <div
              className="h-7 w-7 cursor-pointer"
              onClick={() =>
                loggedInUserId === blog.userId
                  ? router.push("/users/profile")
                  : router.push(`/users/${blog.userId}`)
              }
            >
              <ProfileImage
                src={author?.profileImagePath}
                width={50}
                height={50}
              />
            </div>
            <div
              className="text-white text-xl cursor-pointer hover:underline"
              onClick={() =>
                loggedInUserId === blog.userId
                  ? router.push("/users/profile")
                  : router.push(`/users/${blog.userId}`)
              }
            >
              {author?.displayName}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="text-gray-400 text-sm">
              {new Date(blog.createdAt).toLocaleDateString()}
            </div>

            {/* Düzenle ve Sil Butonları */}
            {loggedInUserId === blog.userId && (
              <div className="flex space-x-4 ml-4">
                <div
                  onClick={handleEditBlog}
                  className="flex items-center px-2 py-1 space-x-2 rounded-lg bg-yellow-400 cursor-pointer hover:bg-yellow-300 duration-500"
                >
                  <FaEdit className="text-black" title="Blog Düzenle" />
                  <div className="text-black">Düzenle</div>
                </div>
                <div
                  onClick={handleDeleteBlog}
                  className="flex items-center px-2 py-1 space-x-2 rounded-lg bg-red-500 hover:bg-red-300 cursor-pointer duration-500"
                >
                  <FaTrash className="text-white" title="Blog Kaldır" />
                  <div className="text-white">Kaldır</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Kategori ve İçerik */}
        <div className="p-4">
          <Link href={`/categories/${blog.categoryId}`}>
            <div className="text-yellow-500 text-lg mb-2 cursor-pointer hover:underline">
              {categoryName}
            </div>
          </Link>
          <h1 className="text-3xl text-white mb-4">{blog.title}</h1>
          <p className="text-white text-lg">{blog.content}</p>
        </div>

        {/* Yorum Bileşeni */}
        <CommentList comments={comments} loggedInUserId={loggedInUserId} />

        {/* Yorum Ekleme */}
        {token ? (
          <form onSubmit={handleCommentSubmit} className="mt-4 p-4">
            <textarea
              className="w-full p-2 rounded bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              rows="3"
              placeholder="Yorumunuzu yazın..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button
              type="submit"
              className="mt-2 p-2 bg-yellow-500 text-black rounded font-semibold hover:bg-yellow-600 transition"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Yükleniyor..." : "Yorum Yap"}
            </button>
          </form>
        ) : (
          <p className="text-gray-400 mt-4">
            Yorum yapabilmek için giriş yapmanız gerekmektedir.
          </p>
        )}
      </div>
    </div>
  );
};

export default BlogDetailPage;
