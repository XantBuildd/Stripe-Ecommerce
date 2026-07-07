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
  const [page, setPage] = useState(1);
  const [openCategory, setOpenCategory] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    totalProducts: 0,
  });
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

    params.append("page", page);
    params.append("limit", 12);

    return params.toString();
  };

  const parseQueryParams = async () => {
    try {
      const query = buildQueryParams();

      const data = await getProductsFiltered(query);

      setproducts(data.products);
      setPagination({
        page: data.page,
        totalPages: data.totalPages,
        totalProducts: data.totalProducts,
      });
      console.log(query);
      console.log(data);
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

    if (!checked) {
      if (category === "Category") {
        setFilters((prev) => ({
          ...prev,
          categories: prev.categories.filter((item) => item !== data),
        }));
      }

      if (category === "Price") {
        setFilters((prev) => ({
          ...prev,
          minPrice: 0,
          maxPrice: 99999,
        }));
      }

      if (category === "Sort By") {
        setFilters((prev) => ({
          ...prev,
          sortBy: "",
        }));
      }
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      await parseQueryParams();
    };
    fetchProducts();
  }, [category, page]);

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
        <article className="w-full">
          <div className="md:hidden px-4 py-4">
            <button
              onClick={() => setOpenFilter((prev) => !prev)}
              className="flex items-center gap-2 px-5 py-2 rounded-xl cursor-pointer bg-neutral-100 font-semibold"
            >
              <IoFilterOutline />
              Filters
            </button>
          </div>

          <div className="flex items-start gap-6 px-4 py-6">
            <aside
              className={`
        ${openFilter ? "block" : "hidden"}
        md:block
        w-full
        md:w-72
        lg:w-80
        shrink-0
      `}
            >
              <div className="bg-white border rounded-2xl p-5 md:sticky md:top-5">
                <div className="flex justify-between items-center border-b pb-4">
                  <h2 className="text-xl font-bold">Filters</h2>

                  <button className="text-sm text-gray-500 hover:text-black">
                    Clear
                  </button>
                </div>

                <ul className="mt-6 space-y-6">
                  {filterData.map((section) => (
                    <li
                      key={section.title}
                      className="border-b border-gray-100 pb-5"
                    >
                      <div
                        className="flex justify-between items-center md:cursor-default cursor-pointer"
                        onClick={() => {
                          if (window.innerWidth < 768) {
                            setOpenCategory(
                              openCategory === section.title
                                ? null
                                : section.title,
                            );
                          }
                        }}
                      >
                        <h3 className="font-semibold text-gray-900">
                          {section.title}
                        </h3>

                        <FaPlus
                          className={`
                    md:hidden
                    transition-transform duration-300
                    ${openCategory === section.title ? "rotate-45" : ""}
                  `}
                        />
                      </div>

                      <ul
                        className={`
                  overflow-hidden
                  transition-all
                  duration-300
                  md:max-h-[500px]
                  md:opacity-100
                  md:mt-4
                  ${
                    openCategory === section.title
                      ? "max-h-60 opacity-100 mt-4"
                      : "max-h-0 opacity-0"
                  }
                `}
                      >
                        {section.options.map((option) => (
                          <li
                            key={option}
                            className="flex items-center gap-3 py-2"
                          >
                            <input
                              type="checkbox"
                              value={option}
                              className="w-4 h-4 accent-black"
                              onChange={(e) =>
                                handleFilter(
                                  section.title,
                                  e.target.value,
                                  e.target.checked,
                                )
                              }
                            />

                            <label className="text-sm text-gray-700">
                              {option}
                            </label>
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
            hover:bg-neutral-800
            transition-all
          "
                >
                  Apply Filters
                </button>
              </div>
            </aside>

            <section className="flex-1 min-w-0">
              <div
                className="
          grid
          grid-cols-2
          md:grid-cols-3
          lg:grid-cols-3
          xl:grid-cols-4
          2xl:grid-cols-5
          gap-4
          lg:gap-6
        "
              >
                {products.map((product) => (
                  <NewProduct
                    key={product.slug}
                    image={product.images[0]?.url}
                    title={product.title}
                    price={product.price}
                    slug={product.slug}
                  />
                ))}
              </div>
            </section>
          </div>
        </article>
        <div className="flex justify-center items-center gap-3 mb-6">
          {Array.from({ length: pagination.totalPages }, (_, index) => {
            const pageNumber = index + 1;

            return (
              <button
                key={pageNumber}
                onClick={() => setPage(pageNumber)}
                className={`
          w-10
          h-10
          rounded-full
          font-semibold
          transition-all
          duration-200
          cursor-pointer
          ${
            page === pageNumber
              ? "bg-black text-white"
              : "bg-white border hover:bg-gray-100"
          }
        `}
              >
                {pageNumber}
              </button>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Shop;
