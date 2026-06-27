import Banner from "../assets/discountbanner.png";
import { FaArrowRight } from "react-icons/fa6";

const CustomProductBanner = () => {
  return (
    <>
      <section className="w-full aspect-4/5 max-h-50 p-4 rounded-2xl overflow-hidden relative md:px-8">
        <img
          src={Banner}
          className="w-full h-full object-cover relative rounded-2xl"
          alt="Custom product banner"
        />
        <div className="absolute top-0 left-0 text-primary w-full h-full p-8 md:px-14 md:py-12">
          <article className="flex flex-col">
            <h3 className="text-secundary text-sm font-semibold md:text-base">
              CUSTOM YOUR STYLE
            </h3>
            <h2 className="text-2xl font-bold md:text-5xl">10% OFF</h2>
            <h3 className="text-[14px] font-semibold md:text-[16px]">
              IN YOUR FIRST PUCHARSE
            </h3>
          </article>
          <article className="flex justify-center items-center relative mt-3 max-w-70 md:left-60 md:bottom-10">
            <input type="email" placeholder="example@gmail.com" className="w-full p-1.5 md:p-2 border border-[#a5a0a07a] rounded-3xl text-sm"/>
            <button className="text-black p-2 bg-secundary rounded-full absolute right-2 cursor-pointer">
              <FaArrowRight />
            </button>
          </article>
        </div>
      </section>
    </>
  );
};

export default CustomProductBanner;
