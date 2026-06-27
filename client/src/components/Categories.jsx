import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import categories from "../data/categoriesData";

const Categories = () => {
  return (
    <>
      <section className="ax-w-7xl mx-auto">
        <article className="w-full flex justify-between px-2 md:px-10">
          <h2 className="text-[18px] font-bold">CATEGORIES</h2>
          <div className="flex justify-center items-center font-semibold gap-2 cursor-pointer">
            <Link>View all</Link>
            <FaArrowRight />
          </div>
        </article>
        <article className="flex flex-wrap justify-between p-2 md:px-10">
          {categories.map((category) => {
            return (
              <div
                key={category.title}
                className="relative
                  w-[48%]
                  max-h-40
                  mb-2
                  aspect-3/4
                  md:w-[24%]
                  md:max-h-70
                  rounded-xl
                  overflow-hidden
                  group
                  hover:scale-[1.03]
                  transition-transform
                  duration-500
                  ease-out"
              >
                <div className="w-full h-full flex flex-col">
                  <img
                    src={category.img}
                    alt={category.title}
                    className="w-full
                      h-full
                      object-cover
                      transition-transform
                      duration-700
                      group-hover:scale-110"
                  />
                  <div
                    className="absolute inset-0 bg-black/40 before:absolute before:w-full before:h-[60%] before:bottom-[-70%] before:left-0 before:bg-black/70 before:translate-y-0 group-hover:before:-translate-y-full before:transition-transform
                      before:duration-500
                      before:ease-in-out"
                  ></div>
                  <div className="absolute bottom-6 left-2 md:bottom-10 md:left-6">
                    <h4 className="text-primary font-bold text-[14px] md:text-xl">
                      {category.title}
                    </h4>
                    <div className="flex items-center gap-2 cursor-pointer md:text-[16px]">
                      <Link className="text-primary text-[12px]">Explore</Link>
                      <FaArrowRight className="text-secundary" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </article>
      </section>
    </>
  );
};

export default Categories;
