"use client"
import React, { useEffect, useState } from "react";
import Logo from "./Logo/Logo";
import Menu from "./Menu/Menu";
import ProfileImageWithDisplayName from "./ProfileImageWithDisplayName/ProfileImageWithDisplayName";
import Search from "../Search/Search";
import AddBlog from "./AddBlog/AddBlog";
import LoginBtn from "../Btn/LoginBtn/LoginBtn";
import RegisterBtn from "../Btn/RegisterBtn/RegisterBtn";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []); 

  return (
    <nav className="flex flex-row justify-between items-center bg-neutral-900 px-8 py-1">
      <div className="flex flex-row items-center space-x-6">
        <Logo />
        <div className="border-l-2 border-gray-500 h-12"></div>
        <Search />
        {isAuthenticated && <AddBlog />}
      </div>
      <div className="flex flex-row items-center space-x-4">
        <Menu />
        {isAuthenticated ? (
          <ProfileImageWithDisplayName />
        ) : (
          <>
            <LoginBtn />
            <RegisterBtn />
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
