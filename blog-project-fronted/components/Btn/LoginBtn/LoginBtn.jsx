import Link from "next/link";
import React from "react";

const LoginBtn = () => {
  return (
    <Link href="/login">
      <button className="h-10 w-24 border bg-black hover:bg-neutral-600 duration-500 text-white rounded-lg">
        Giriş Yap
      </button>
    </Link>
  );
};

export default LoginBtn;
