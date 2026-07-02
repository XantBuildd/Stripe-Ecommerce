import { useParams } from "react-router-dom";
import bannerShopData from "../data/bannerShopData";
import { IoFilterOutline } from "react-icons/io5";
import { getProductsFiltered } from "../api/productsApi.js";
import { useEffect, useState } from "react";
import NewProduct from "../components/NewProduct.jsx";
import BannerShop from "../assets/men-banner.png";
import filterData from "../data/filterData.js";
import { FaPlus } from "react-icons/fa6";

const Shop = () => {
  const { category } = useParams();
  const categorySelected = bannerShopData.find((item) => item.slug == category);

  const [products, setproducts] = useState([]);
  const [openFilter, setOpenFilter] = useState(false);
  const [openCategory, setOpenCategory] = useState(null);
  const [filters, setFilters] = useState({
    categories: [],
    minPrice: 0,
    maxPrice: 99999,
    sortBy: "",
  });

  const buildQueryParams = () => {
    const params = new URLSearchParams();

    const categories = [...filters.categories];

    if (category && !categories.includes(category)) {
      categories.push(category);
    }

    if (categories.length > 0) {
      params.append("categories", categories.join(","));
    }

    if (filters.minPrice > 0) {
      params.append("minPrice", filters.minPrice);
    }

    if (filters.maxPrice < 99999) {
      params.append("maxPrice", filters.maxPrice);
    }

    if (filters.sortBy) {
      params.append("sortBy", filters.sortBy);
    }

    return params.toString();
  };

  const parseQueryParams = async () => {
    try {
      const query = buildQueryParams();

      const data = await getProductsFiltered(query);

      setproducts(data.products);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFilter = (category, data, checked) => {
    if (checked) {
      if (category === "Category") {
        const exists = filters.categories.includes(data);
        if (exists) {
          const newCategory = filters.categories.filter(
            (category) => category != data,
          );
          setFilters((prev) => ({ ...prev, categories: newCategory }));
        } else {
          const newCategory = [...filters.categories];
          newCategory.push(data);
          setFilters((prev) => ({ ...prev, categories: newCategory }));
        }
      }
      if (category === "Price") {
        if (data === "Under $50") {
          setFilters((prev) => ({ ...prev, minPrice: 0, maxPrice: 50 }));
        } else if (data === "$50 - $100") {
          setFilters((prev) => ({ ...prev, minPrice: 50, maxPrice: 100 }));
        } else if (data === "$100 - $200") {
          setFilters((prev) => ({ ...prev, minPrice: 100, maxPrice: 200 }));
        } else if (data === "Over $200") {
          setFilters((prev) => ({ ...prev, minPrice: 200, maxPrice: 999999 }));
        }
      }
      if (category === "Sort By") {
        if (data === "Newest") {
          setFilters((prev) => ({ ...prev, sortBy: "newest" }));
        } else if (data === "Best Selling") {
          setFilters((prev) => ({ ...prev, sortBy: "bestSelling" }));
        } else if (data === "Price: Low to High") {
          setFilters((prev) => ({ ...prev, sortBy: "lowToHigh" }));
        } else if (data === "Price: High to Low") {
          setFilters((prev) => ({ ...prev, sortBy: "highToLow" }));
        }
      }
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      await parseQueryParams();
    };
    fetchProducts();
  }, [category]);

  return (
    <>
      <section className="w-full h-full">
        <article className="w-full bg-black text-white overflow-hidden">
          <div className="flex flex-col-reverse md:flex-row items-center justify-between px-6 py-8 md:px-12 md:py-10">
            <div className="w-full md:w-1/2 flex flex-col justify-center mt-6 md:mt-0">
              <span className="uppercase tracking-[0.3em] text-xs text-gray-400">
                Collection
              </span>

              <h2 className="mt-2 text-2xl md:text-6xl font-black leading-none">
                {categorySelected?.title ?? "SHOP"}
              </h2>

              <p className="mt-5 text-sm md:text-base text-gray-300 leading-7 max-w-md">
                {categorySelected?.description ??
                  "Technical apparel designed for everyday performance. Comfort, style and functionality in every piece."}
              </p>
            </div>

            <div className="w-full md:w-1/2 flex justify-center items-center">
              <div className="w-64 h-64 md:w-105 md:h-85 flex justify-center items-end">
                <img
                  src={categorySelected?.image ?? BannerShop}
                  alt={categorySelected?.title}
                  className="max-w-full min-h-60 object-cover select-none"
                />
              </div>
            </div>
          </div>
        </article>
        <article className="w-full h-full">
          <div className="w-full max-h-20 px-3 py-8 flex items-center justify-between">
            <button
              onClick={() => setOpenFilter(!openFilter)}
              className="px-5 py-2 bg-[#e4dede7c] rounded-xl cursor-pointer md:hidden flex items-center justify-center gap-2 font-semibold"
            >
              <IoFilterOutline />
              Filter
            </button>
          </div>
          <div
            className={`w-full flex flex-col md:flex-row gap-6 p-4 ${openFilter ? "flex" : "hidden"}`}
          >
            <aside className="w-full md:w-72 bg-white rounded-2xl border border-gray-200 h-fit p-5">
              <div className="flex items-center justify-between border-b pb-4">
                <h2 className="text-xl font-bold">Filters</h2>
                <button className="text-sm text-gray-500 hover:text-black transition">
                  Clear
                </button>
              </div>

              <ul className="mt-5 space-y-5">
                {filterData.map((data) => (
                  <li
                    key={data.title}
                    className="border-b border-gray-100 pb-5"
                  >
                    <div
                      className="flex justify-between items-center cursor-pointer"
                      onClick={() =>
                        setOpenCategory(
                          data.title === openCategory ? null : data.title,
                        )
                      }
                    >
                      <h3 className="font-semibold text-gray-900 transition-all duration-200 hover:text-black hover:font-bold">
                        {data.title}
                      </h3>

                      <FaPlus
                        className={`text-gray-500 transition-all duration-300 ${
                          openCategory === data.title ? "rotate-45" : "rotate-0"
                        }`}
                      />
                    </div>

                    <ul
                      className={`
                        overflow-hidden
                        transition-all
                        duration-300
                        ${
                          openCategory === data.title
                            ? "max-h-60 opacity-100 mt-4"
                            : "max-h-0 opacity-0"
                        }
                      `}
                    >
                      {data.options.map((option) => (
                        <li
                          key={option}
                          className="flex justify-between items-center rounded-lg px-2 py-2 cursor-pointer hover:bg-gray-100 transition-all duration-200"
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              value={option}
                              className="w-4 h-4 accent-black cursor-pointer"
                              onChange={(e) =>
                                handleFilter(
                                  data.title,
                                  e.target.value,
                                  e.target.checked,
                                )
                              }
                            />

                            <label className="text-sm text-gray-700 group-hover:text-black transition">
                              {option}
                            </label>
                          </div>

                          <span className="text-xs text-gray-400"></span>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
              <button
                onClick={parseQueryParams}
                className="
                  w-full
                  mt-6
                  py-3
                  rounded-xl
                  bg-black
                  text-white
                  font-semibold
                  transition-all
                  duration-300
                  hover:bg-neutral-800
                  active:scale-95
                  "
              >
                Apply Filters
              </button>
            </aside>
          </div>
          <section className="flex-1">
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {products.map((product) => (
                <NewProduct
                  key={product.slug}
                  image={product.images[0]?.url}
                  title={product.title}
                  price={product.price}
                />
              ))}
            </div>
          </section>
        </article>
      </section>
    </>
  );
};

export default Shop;
