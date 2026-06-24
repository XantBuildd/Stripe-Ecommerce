import { Link } from "react-router-dom";
import Logo from "../assets/logo-stripe.png";
import {
  FiSearch,
  FiShoppingCart,
  FiUser,
  FiMenu,
  FiHeart,
  FiBriefcase,
  FiShoppingBag,
  FiHome,
  FiInstagram,
  FiFacebook,
} from "react-icons/fi";
import LogoWhite from "../assets/stripe-logo-white.png";
import { TfiClose } from "react-icons/tfi";
import { useState } from "react";
import { FaXTwitter } from "react-icons/fa6";

const Navbar = () => {
  const [menu, setMenu] = useState(false);

  const changeMenu = () => {
    setMenu(!menu);
  };

  return (
    <div className="w-full h-18 flex justify-center md:bg-black md:text-primary">
      <nav className="w-[90%] h-18 flex justify-between bg-primary items-center md:bg-black md:text-primary md:flex md:justify-between md:items-center">
        <div className="flex flex-1 text-xl md:hidden lg:hidden">
          <button
            onClick={changeMenu}
            className="mx-1 cursor-pointer transition-transform duration-200 active:scale-95"
          >
            <FiMenu />
          </button>
          <FiSearch className="mx-2 cursor-pointer transition-transform duration-200 active:scale-95" />
        </div>
        <img
          src={Logo}
          className="w-24 h-12 cursor-pointer transition-transform duration-200 active:scale-95 md:hidden lg:hidden"
          alt="Logo of Stripe"
        />

        <img
          src={LogoWhite}
          className="md:w-24 md:h-12 md:cursor-pointer md:block hidden"
          alt="Logo of Stripe"
        />

        <ul className="hidden md:flex md:justify-center md:items-center md:w-full md:h-full md:gap-3 lg:gap-8 md:text-xl">
          {["Home", "Shop", "Men", "Women", "accessories"].map((item) => {
            return (
              <li key={item} className="">
                <Link className="relative z-10 w-full block overflow-hidden rounded-md text-white md:p-2 md:before:w-full md:before:h-full md:before:bg-secundary md:before:absolute md:before:top-0 md:before:left-0 md:before:-z-10 md:before:-translate-x-full md:hover:before:translate-x-0 md:before:transition-transform md:before:duration-500 md:before:[transition-timing-function:cubic-bezier(0.16,1,0.3,1)] md:hover:text-black md:transition-all md:duration-500">
                  {item}
                </Link>
              </li>
            );
          })}
        </ul>

        <div
          className={`w-full h-screen fixed top-0 left-0 text-primary bg-black z-100 transition-all duration-600 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] origin-left ${
            menu
              ? "translate-x-0 opacity-100 visible"
              : "-translate-x-full opacity-0 invisible"
          }`}
        >
          <div
            className={`w-full h-[70%] p-5 transition-all duration-500 delay-100 ${menu ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
          >
            <div className="flex justify-between items-center">
              <img
                src={LogoWhite}
                className="w-24 h-14"
                alt="white Stripe logo"
              />
              <TfiClose
                onClick={changeMenu}
                className="mx-2 cursor-pointer transition-transform duration-200 hover:rotate-90 active:scale-95"
              />
            </div>

            <ul className="flex flex-col w-full h-auto relative top-10 gap-5 mx-2 text-xl">
              {["Home", "Shop", "Men", "Women", "accessories"].map(
                (item, index) => {
                  const Icons = [
                    FiHome,
                    FiShoppingBag,
                    FiUser,
                    FiUser,
                    FiBriefcase,
                  ];
                  const Icon = Icons[index];
                  return (
                    <li
                      key={item}
                      className="flex items-center w-full gap-2 relative after:bg-primary after:w-[80%] after:h-px after:absolute after:-bottom-3 before:bg-primary before:w-[80%] before:absolute before:left-0 before:-top-2 before:-bottom-3 before:scale-x-0 before:origin-left before:transition-transform before:duration-300 before:[transition-timing-function:cubic-bezier(0.25,1,0.5,1)] before:-z-10 hover:before:scale-x-100 transition-colors duration-200 hover:text-black group"
                    >
                      <Icon className="relative z-10 transition-transform duration-300 group-hover:scale-110" />
                      <Link className="relative z-10 w-full">{item}</Link>
                    </li>
                  );
                },
              )}
            </ul>
          </div>

          <div
            className={`w-full h-[30%] text-[#bbb] relative flex flex-col gap-5 justify-end p-8 transition-opacity duration-500 delay-200 ${menu ? "opacity-100" : "opacity-0"}`}
          >
            <div className="w-full h-px bg-[#bbb]"></div>
            <div className="flex w-full gap-5 items-center">
              <p>Follow us</p>
              <FiInstagram className="cursor-pointer transition-transform duration-200 hover:scale-125 hover:text-primary" />
              <FiFacebook className="cursor-pointer transition-transform duration-200 hover:scale-125 hover:text-primary" />
              <FaXTwitter className="cursor-pointer transition-transform duration-200 hover:scale-125 hover:text-primary" />
            </div>
          </div>
        </div>

        <ul className="flex flex-1 justify-end gap-2 text-xl md:flex md:gap-3 lg:gap-5">
          <div className="relative cursor-pointer transition-transform duration-200 active:scale-95">
            <FiShoppingCart />
            <p className="absolute -top-1.5 -right-2 min-w-4 h-4 px-1 flex items-center justify-center rounded-full bg-secundary text-xs">
              0
            </p>
          </div>
          <FiUser className="cursor-pointer transition-transform duration-200 active:scale-95" />
          <FiSearch className="hidden md:flex cursor-pointer transition-transform duration-200 active:scale-95" />
          <FiHeart className="hidden cursor-pointer" />
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
