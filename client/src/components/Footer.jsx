import { FiInstagram, FiFacebook, FiPlus } from "react-icons/fi";
import { FaXTwitter, FaTiktok } from "react-icons/fa6";
import WhiteLogo from "../assets/stripe-logo-white.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import footerData from "../data/footerData";

const Footer = () => {
  const [openCategory, setOpenCategory] = useState(null);

  return (
    <>
      <footer className="bg-black w-full flex items-center justify-center flex-col text-primary">
        <section className="w-full h-full p-4">
          <article className="flex items-center justify-center flex-col">
            <img
              src={WhiteLogo}
              alt="White logo of Stripe"
              className="max-w-24 object-cover h-auto"
            />
            <ul className="flex gap-3 text-base">
              <li>
                <FiInstagram className="cursor-pointer" />
              </li>
              <li>
                <FiFacebook className="cursor-pointer" />
              </li>
              <li>
                <FaXTwitter className="cursor-pointer" />
              </li>
              <li>
                <FaTiktok className="cursor-pointer" />
              </li>
            </ul>
          </article>
          <article className="hidden md:grid md:grid-cols-4 md:gap-10 md:mt-10 md:px-10">
            {footerData.map((item) => (
              <div key={item.category}>
                <h3 className="font-bold uppercase mb-5 text-sm tracking-wider">
                  {item.category}
                </h3>

                <ul className="flex flex-col gap-3">
                  {item.list.map((link) => (
                    <li
                      key={link}
                      className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer"
                    >
                      <Link>{link}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </article>
          <article className="md:hidden">
            <ul>
              {footerData.map((item) => (
                <div
                  key={item.category}
                  className="border-b border-[#ffffff36]"
                  onClick={() =>
                    setOpenCategory(
                      item.category === openCategory ? null : item.category,
                    )
                  }
                >
                  <li
                    className="flex items-center justify-between h-12 cursor-pointer"
                    onClick={() => setOpenCategory(item.category)}
                  >
                    <h3 className="text-sm font-semibold">{item.category}</h3>

                    <FiPlus />
                  </li>

                  <div
                    className={`
                        overflow-hidden
                        transition-all
                        duration-300
                        ease-in-out
                        ${
                          openCategory === item.category
                            ? "max-h-60 opacity-100 pb-4"
                            : "max-h-0 opacity-0"
                        }
                      `}
                  >
                    <ul className="flex flex-col gap-3 pl-4">
                      {item.list.map((link) => (
                        <li
                          key={link}
                          className="text-sm text-gray-300 hover:text-white cursor-pointer transition-colors"
                        >
                          {link}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </ul>
          </article>
          <article className="mt-2 text-[12px] relative w-full flex items-center justify-center text-[#ffffff5e]">
            <p>© 2026 Stripe. All rights reserved</p>
          </article>
        </section>
      </footer>
    </>
  );
};

export default Footer;
