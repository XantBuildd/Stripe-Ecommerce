import { FiHeart } from "react-icons/fi";
import { FaArrowRight } from "react-icons/fa6";

const NewProduct = ({ image, title, price }) => {
  return (
    <>
      <div
        className=" h-full
        flex
        flex-col overflow-hidden bg-[#ececec] transition-all duration-300 ease-in rounded-xl relative shadow-[0_8px_30px_rgba(0,0,0,0.2)] cursor-pointer group hover:scale-[1.03]"
      >
        <div className="overflow-hidden">
          <img
            src={image}
            alt={title}
            className="rounded-tr-xl rounded-tl-xl object-cover w-full aspect-4/4.5
                      md:aspect-4/5 transition-transform
                      duration-700
                      group-hover:scale-110"
          />
        </div>
        <div
          className="absolute
            top-2
            left-0
            w-full
            px-2
            md:px-6
            flex
            justify-between
            items-center"
        >
          <h4 className="text-[10px] py-1 px-2 bg-secundary rounded-xl md:text-sm">
            NEW
          </h4>
          <FiHeart className="cursor-pointer md:text-xl" />
        </div>
        <div className="p-3 flex flex-col flex-1 text-sm text-wrap px-2 py-2">
          <h2
            className="font-medium
            line-clamp-2
            min-h-10
            md:min-h-12
            md:text-base
            "
          >
            {title}
          </h2>
          <p
            className="font-extrabold text-[14px]
            md:text-lg"
          >
            ${price}
          </p>
          <button
            className="flex relative md:text-base z-10 overflow-hidden justify-center items-center gap-1 py-1 px-3 rounded-[5px] bg-secundary my-2 w-full cursor-pointer
          before:absolute before:w-full before:z-[-1] before:h-full before:top-0 before:bottom-0 before:-left-full before:bg-black before:rounded-[5px] before:translate-x-0 before:transition-transform before:duration-600 before:ease-in-out group-hover:scale-[1.03] group-hover:text-white group-hover:transition-all group-hover:duration-100 ease-in-out group-hover:before:translate-x-full"
          >
            <p className="font-bold">BUY</p>
            <FaArrowRight />
          </button>
        </div>
      </div>
    </>
  );
};

export default NewProduct;
