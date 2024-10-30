import Link from "next/link";
import React from "react";

const RegisterBtn = () => {
  return (
    <Link href="/register">
      <button className="h-10 w-20 bg-white hover:bg-gray-400 duration-500 text-black rounded-lg">
        Kayıt ol
      </button>
    </Link>
  );
};

export default RegisterBtn;
