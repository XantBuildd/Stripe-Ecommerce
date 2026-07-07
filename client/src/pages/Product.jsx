import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { getProduct } from "../api/productsApi";
import { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const Product = () => {
  const { slug } = useParams();

  const [product, setProduct] = useState(null);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProduct(slug);
        setProduct(data.product);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProduct();
  }, [slug]);

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <section className="py-8 md:py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-start md:w-[90%]">
          <article className="relative min-w-0 overflow-hidden max-h-200">
            <Swiper
              modules={[Navigation]}
              spaceBetween={20}
              onBeforeInit={(swiper) => {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
              }}
            >
              {product.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="bg-neutral-100 rounded-xl overflow-hidden">
                    <img
                      src={image.url}
                      alt={product.title}
                      className="
                        w-full
                        aspect-cover
                        object-contain
                        p-6
                        md:p-10
                        select-none
                        max-h-150
                        rounded-xl
                        overflow-hidden
                      "
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <button
              ref={prevRef}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                z-20
                w-11
                h-11
                rounded-full
                bg-white
                shadow-lg
                flex
                justify-center
                items-center
                cursor-pointer
                hover:scale-110
                transition-all
              "
            >
              <FaArrowLeft />
            </button>

            <button
              ref={nextRef}
              className="
                absolute
                right-4
                top-1/2
                -translate-y-1/2
                z-20
                w-11
                h-11
                rounded-full
                bg-white
                shadow-lg
                flex
                justify-center
                items-center
                cursor-pointer
                hover:scale-110
                transition-all
              "
            >
              <FaArrowRight />
            </button>
          </article>

          <article className="flex flex-col gap-8">
            <div>
              <span className="uppercase text-xs tracking-[0.35em] text-gray-500">
                New Collection
              </span>

              <h1 className="text-3xl md:text-4xl font-black mt-3">
                {product.title}
              </h1>

              <p className="text-3xl font-bold mt-5">${product.price}</p>

              <p className="mt-6 text-gray-600 leading-8">
                {product.description}
              </p>
            </div>

            <div>
              <h2 className="font-semibold mb-4">Size</h2>

              <div className="flex gap-3 flex-wrap">
                {["S", "M", "L", "XL"].map((size) => (
                  <button
                    key={size}
                    className="
                      w-14
                      h-14
                      rounded-xl
                      border
                      border-gray-300
                      font-semibold
                      hover:bg-black
                      hover:text-white
                      transition-all
                    "
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <button
              className="
                w-full
                md:w-80
                py-4
                rounded-2xl
                bg-black
                text-white
                font-semibold
                text-lg
                hover:bg-neutral-800
                transition-all
                cursor-pointer
              "
            >
              Buy Now
            </button>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Product;
