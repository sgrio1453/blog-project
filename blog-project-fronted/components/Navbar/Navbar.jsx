import React from "react";
import Logo from "./Logo/Logo";
import Menu from "./Menu/Menu";
import ProfileImageWithDisplayName from "./ProfileImageWithDisplayName/ProfileImageWithDisplayName";
import Search from "../Search/Search";
import AddBlog from "./AddBlog/AddBlog";

const Navbar = () => {
  return (
    <nav className="flex flex-row justify-between items-center bg-neutral-900 px-8 py-1">
      <div className="flex flex-row items-center space-x-6">
        <Logo />
        <div className="border-l-2 border-gray-500 h-12"></div>
        <Search/>
        <AddBlog/>
      </div>
      <div className="flex flex-row space-x-4">
      <Menu />
      <ProfileImageWithDisplayName />
      </div>
    </nav>
  );
};

export default Navbar;
