import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";
import { FaArrowRight } from "react-icons/fa6";
import { IoWaterOutline } from "react-icons/io5";
import { FaWind } from "react-icons/fa";
import { FaTree } from "react-icons/fa6";
import slides from "../data/heroData.js";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const Hero = () => {
  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 5000,
        }}
        effect="fade"
        loop
      >
        {slides.map((slide) => {
          const words = slide.title.split(" ");
          const lastWord = words[words.length - 1];
          const rest = words.slice(0, -1).join(" ");

          return (
            <SwiperSlide key={slide.title}>
              <header className="relative">
                <img
                  src={slide.img}
                  className="w-full h-[80vh] object-cover"
                  alt="img from slide"
                />
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="absolute inset-0 flex flex-col items-start text-white px-8 md:py-10 md:px-15">
                  <div className="my-8 w-full flex items-center gap-2 md:w-[30%]">
                    <div className="w-6 h-px bg-secundary"></div>
                    <h3 className="text-[12px] md:text-[16px] font-semibold">
                      NEW COLLECTION
                    </h3>
                  </div>
                  <main className="relative w-full h-auto my-5 md:w-[40%]">
                    <h2 className="text-4xl w-[40%] font-bold md:text-6xl">
                      {rest + " "}
                      <span className="text-secundary">{lastWord}</span>
                    </h2>
                    <p className="my-2 w-full">{slide.description}</p>
                  </main>
                  <button
                    className="bg-secundary z-10 overflow-hidden mt-10 absolute bottom-15 cursor-pointer flex items-center gap-2 px-8 py-3 rounded-2xl text-black font-bold
                  before:absolute before:w-full before:z-[-1] before:h-full before:top-0 before:bottom-0 before:-left-full before:bg-black before:rounded-[5px] before:translate-x-0 before:transition-transform before:duration-600 before:ease-in-out hover:scale-[1.03] hover:text-white hover:transition-all hover:duration-100 ease-in-out hover:before:translate-x-full"
                  >
                    <p>BUY NOW</p>
                    <FaArrowRight />
                  </button>
                  <div className="hidden md:flex md:flex-col md:h-full md:absolute md:top-0 md:right-10 md:translate-y-[30%]">
                    <ul className="w-40 h-50 border rounded-xl border-white/10 bg-white/10 backdrop-blur-[2px] flex flex-col items-center gap-8 p-4 justify-center">
                      <li className="flex gap-2 text-[16px] relative justify-center items-center">
                        <IoWaterOutline />
                        <p className="text-sm">WATERPROOF FABRIC</p>
                        <div className="w-full h-px bg-primary rounded-xl absolute -bottom-4"></div>
                      </li>
                      <li className="flex gap-2 relative w-full justify-center items-center">
                        <FaWind />
                        <p>BREATHABLE</p>
                        <div className="w-full h-px bg-primary rounded-xl absolute -bottom-4"></div>
                      </li>
                      <li className="flex gap-2 w-full justify-center items-center">
                        <FaTree />
                        <p>SUSTAINABLE</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </header>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default Hero;
