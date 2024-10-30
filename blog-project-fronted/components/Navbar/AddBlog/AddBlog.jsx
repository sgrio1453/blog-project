import Link from "next/link";
import React from "react";
import { CiPen } from "react-icons/ci";

const AddBlog = () => {
  return (
    <Link href="/blog/add">
      <div className="flex flex-row items-center w-36 bg-yellow-400 p-2 font-medium text-lg rounded-lg text-black hover:bg-yellow-300 duration-500 space-x-4">
        <CiPen className='text-black w-6 h-6'/>
        <div>Blog Ekle</div>
      </div>
    </Link>
  );
};

export default AddBlog;
