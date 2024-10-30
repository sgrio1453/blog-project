"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { blogAPI } from "@/app/api";
import Post from "@/components/Post/Post";
import Navbar from "@/components/Navbar/Navbar";

const SearchPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) return;

      try {
        const blogResults = await blogAPI.searchBlogs(query);
        setBlogs(blogResults.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Arama sonuçları alınırken hata:", error);
        setError("Arama sonuçları alınırken bir hata oluştu.");
        setIsLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  if (isLoading) return <div className="text-white">Yükleniyor...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="w-1/2 mx-auto mt-20">
        <h1 className="text-3xl text-white mb-8">Arama Sonuçları: "{query}"</h1>
        <Post blogs={blogs} searchQuery={query} />
      </div>
    </div>
  );
};

export default SearchPage;
