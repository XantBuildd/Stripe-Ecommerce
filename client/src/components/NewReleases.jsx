import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import NewProduct from "./NewProduct";
import { getNewReleasesProducts } from "../api/productsApi.js";
import { useEffect, useState, useRef } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-cards";

const NewReleases = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getNewReleasesProducts();
        setProducts(products);
        console.log(products);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <>
      <section>
        <article className="w-full flex justify-between items-center px-2 md:px-10">
          <h2 className="text-[18px] font-bold">NEW RELEASES</h2>

          <div className="flex items-center gap-5">
            <Link className="font-semibold">View all</Link>
          </div>
        </article>
        <article className="relative md:px-8">
          <Swiper
            modules={[Navigation]}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            breakpoints={{
              0: {
                slidesPerView: 2,
                spaceBetween: 12,
              },
              640: {
                slidesPerView: 3,
                spaceBetween: 16,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 24,
              },
            }}
          >
            <div className="flex gap-2">
              <button
                ref={prevRef}
                className="
                absolute
                left-2
                top-1/2
                z-10
                -translate-y-1/2
                w-10
                h-10
                rounded-full
                bg-black
                text-white
                flex
                justify-center
                items-center
                shadow-lg
                hover:scale-110
                transition
                cursor-pointer
        "
              >
                <FaArrowLeft />
              </button>

              <button
                ref={nextRef}
                className="
                absolute
                right-2
                top-1/2
                z-10
                -translate-y-1/2
                w-10
                h-10
                rounded-full
                bg-black
                text-white
                flex
                justify-center
                items-center
                shadow-lg
                hover:scale-110
                transition
                cursor-pointer
        "
              >
                <FaArrowRight />
              </button>
            </div>
            {products.map((product) => {
              return (
                <SwiperSlide
                  className="w-full flex-wrap p-2"
                  key={product.slug}
                >
                  <NewProduct
                    image={product.images[0]?.url}
                    title={product.title}
                    price={product.price}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </article>
      </section>
    </>
  );
};

export default NewReleases;
