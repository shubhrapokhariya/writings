import React, { useContext } from "react";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <div className=" px-2 lg:px-8 mb-8 py-2  flex items-center carrier  shadow-md ">
      <div className="relative h-12  w-20   flex-shrink-0 cursor-pointer ">
        <Link href={"/"}>
          <Image
            src="/logo.png"
            layout="fill"
            // objectFit="contain"
            alt="logo"
          />
        </Link>
      </div>

      <span className="  text-3xl font-extrabold font-sans italic logo-font hidden sm:flex cursor-pointer">
        <Link href={"/"}>
          <span>Writings</span>
        </Link>
      </span>
      <div className="flex-1"></div>
      <span className=" text-gray-400  text-md font-semibold   px-2">
        About
      </span>
      <span className=" text-gray-400  text-md font-semibold   px-2">
        Contact
      </span>
      <span className=" text-gray-400  text-md font-semibold   px-2">
        Login
      </span>
    </div>
  );
};

export default Header;
