import { Minus, Plus, Trash2 } from "lucide-react";

export default function CartItem({
  item,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
}) {
  return (
    <div
      className="
      border
      rounded-2xl
      p-3
      sm:p-4
      hover:shadow-md
      transition-all
      duration-300
      bg-white
    "
    >
      <div className="flex gap-4">
        {/* Imagen */}
        <div
          className="
          w-20 h-20
          sm:w-24 sm:h-24
          overflow-hidden
          rounded-xl
          shrink-0
        "
        >
          <img
            src={item.product.images[0].url}
            alt={item.product.title}
            className="
              w-full
              h-full
              object-cover
              hover:scale-105
              transition-transform
              duration-500
            "
          />
        </div>

        {/* Contenido */}
        <div className="flex-1 min-w-0">
          {/* Desktop */}
          <div className="hidden md:flex justify-between items-center h-full">
            <div>
              <h2 className="font-semibold text-lg truncate">
                {item.product.title}
              </h2>

              <p className="text-gray-500 text-sm mt-1">Premium Collection</p>

              <p className="font-bold text-lg mt-3">${item.product.price}</p>
            </div>

            <div className="flex items-center gap-4">
              <div
                className="
                flex
                items-center
                bg-gray-100
                rounded-full
                px-1
              "
              >
                <button
                  onClick={() => decreaseQuantity(item.product._id)}
                  className="
                    w-8 h-8
                    rounded-full
                    flex
                    justify-center
                    items-center
                    hover:bg-white
                    active:scale-90
                    transition-all
                  "
                >
                  <Minus size={16} />
                </button>

                <span className="w-6 text-center font-medium">
                  {item.quantity}
                </span>

                <button
                  onClick={() => increaseQuantity(item.product._id)}
                  className="
                    w-8 h-8
                    rounded-full
                    flex
                    justify-center
                    items-center
                    hover:bg-white
                    active:scale-90
                    transition-all
                  "
                >
                  <Plus size={16} />
                </button>
              </div>

              <button
                onClick={() => removeItem(item.product._id)}
                className="
                  text-gray-400
                  hover:text-red-500
                  transition-colors
                "
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>

          {/* Mobile */}
          <div className="md:hidden">
            <h2 className="font-semibold text-base truncate">
              {item.product.title}
            </h2>

            <p className="text-gray-500 text-sm mt-1">Premium Collection</p>

            <p className="font-bold mt-2">${item.product.price}</p>

            <div className="flex justify-between items-center mt-4">
              <div
                className="
                flex
                items-center
                bg-gray-100
                rounded-full
                px-1
              "
              >
                <button
                  onClick={() => decreaseQuantity(item.product._id)}
                  className="
                    w-8 h-8
                    rounded-full
                    flex
                    justify-center
                    items-center
                    hover:bg-white
                    active:scale-90
                    transition-all
                  "
                >
                  <Minus size={16} />
                </button>

                <span className="w-6 text-center font-medium">
                  {item.quantity}
                </span>

                <button
                  onClick={() => increaseQuantity(item.product._id)}
                  className="
                    w-8 h-8
                    rounded-full
                    flex
                    justify-center
                    items-center
                    hover:bg-white
                    active:scale-90
                    transition-all
                  "
                >
                  <Plus size={16} />
                </button>
              </div>

              <button
                onClick={() => removeItem(item.product._id)}
                className="
                  text-gray-400
                  hover:text-red-500
                  transition-colors
                "
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
