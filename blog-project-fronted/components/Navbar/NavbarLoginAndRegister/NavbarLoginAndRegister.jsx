import React from "react";
import Logo from "../Logo/Logo";
import Menu from "../Menu/Menu";
import LoginBtn from "@/components/Btn/LoginBtn/LoginBtn";
import RegisterBtn from "@/components/Btn/RegisterBtn/RegisterBtn";

const NavbarLoginAndRegister = () => {
  return (
    <nav className="flex flex-row justify-between items-center bg-neutral-900 px-8 py-1">
      <Logo />
      <div className="flex flex-row items-center space-x-4">
        <Menu />
        <LoginBtn />
        <RegisterBtn />
      </div>
    </nav>
  );
};

export default NavbarLoginAndRegister;
