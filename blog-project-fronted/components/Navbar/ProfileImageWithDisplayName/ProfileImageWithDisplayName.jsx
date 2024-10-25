"use client";
import Link from "next/link";
import React, { useState } from "react";
import DisplayName from "../DisplayName/DisplayName";
import ProfileImage from "../ProfileImage/ProfileImage";

const ProfileImageWithDisplayName = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsMenuOpen(true)}
      onMouseLeave={() => setIsMenuOpen(false)}
    >
      <Link href="/profile">
        <div className="flex flex-row items-center space-x-4 py-2 px-4 ">
          <DisplayName fontSize={"text-lg"} />
          <div className="h-10 w-10">
            <ProfileImage width={40} height={40} />
          </div>
        </div>
      </Link>

      {isMenuOpen && (
        <div className="absolute bg-black rounded-lg duration-500 w-full">
          <ul className="">
            <Link href="/profile">
              <li className="px-4 py-4 hover:bg-neutral-900">Hesabım</li>
            </Link>
            <Link href="/settings">
              <li className="px-4 py-4 hover:bg-neutral-900">Ayarlar</li>
            </Link>
            <Link href="/logout">
              <li className="px-4 py-4 hover:bg-neutral-900">Çıkış Yap</li>
            </Link>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileImageWithDisplayName;
