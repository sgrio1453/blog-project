"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { CiSearch } from "react-icons/ci";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm(""); 
    }
  };

  return (
    <div className="flex bg-black w-full space-x-4 p-2 rounded-xl">
      <CiSearch className="text-gray-500 w-8 h-8" />
      <input
        type="text"
        placeholder="Arama"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
        className="bg-black outline-none w-full text-white"
      />
    </div>
  );
};

export default Search;
