import { useEffect, useMemo, useState } from "react";
import CartItem from "../components/CartItem";
import { getCart, deleteItemCart, updateItemCart } from "../api/cartApi";
import { Link } from "react-router-dom";
import { createCheckoutSession } from "../api/orderApi.js";

export default function Cart() {
  const [cart, setCart] = useState([]);

  const increaseQuantity = async (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.product._id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      ),
    );

    await updateItemCart(id, 1);
  };

  const handleCheckout = async () => {
    try {
      const response = await createCheckoutSession();
      console.log(response);
      const { checkoutUrl } = response;

      window.location.href = checkoutUrl;
    } catch (err) {
      console.log(err.response?.status);
      console.log(err.response?.data);
    }
  };

  const decreaseQuantity = async (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.product._id === id && item.quantity > 1
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item,
      ),
    );

    await updateItemCart(id, -1);
  };

  const removeItem = async (id) => {
    setCart((prev) => prev.filter((item) => item.product._id !== id));

    await deleteItemCart(id);
  };

  useEffect(() => {
    const fetchCart = async () => {
      const response = await getCart();
      console.log(response);
      setCart(response.cart.items);
    };
    fetchCart();
  }, []);

  const subtotal = useMemo(() => {
    return cart.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0,
    );
  }, [cart]);

  const shipping = subtotal > 0 ? 10 : 0;
  const taxes = subtotal * 0.19;
  const total = subtotal + shipping + taxes;

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col justify-center items-center text-center px-5">
        <span className="text-7xl mb-6">🛒</span>

        <h1 className="text-3xl font-bold">Your cart is empty</h1>

        <p className="text-gray-500 mt-3">
          Looks like you haven't added anything yet.
        </p>

        <button className="mt-8 px-8 py-3 bg-black text-white rounded-full hover:scale-105 duration-300">
          <Link to="/shop">Continue Shopping</Link>
        </button>
      </div>
    );
  }

  return (
    <section className="max-w-7xl px-2 py-10 overflow-hidden">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="flex flex-col gap-8">
        <div className="space-y-4">
          {cart.map((item) => (
            <CartItem
              key={item.product._id}
              item={item}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
              removeItem={removeItem}
            />
          ))}
        </div>

        <div
          className="
          h-fit
          lg:sticky
          lg:top-24
          border
          rounded-3xl
          p-6
          bg-white
          shadow-sm
        "
        >
          <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Taxes</span>
              <span>${taxes.toFixed(2)}</span>
            </div>

            <hr />

            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            className="
            w-full
            mt-8
            bg-black
            text-white
            py-4
            rounded-full
            hover:scale-[1.02]
            active:scale-95
            transition-all
          "
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </section>
  );
}
