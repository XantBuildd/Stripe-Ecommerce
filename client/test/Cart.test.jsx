import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import Cart from "../src/pages/Cart";

import { getCart, deleteItemCart, updateItemCart } from "../src/api/cartApi";

import { createCheckoutSession } from "../src/api/orderApi.js";

// Mock de la API del carrito
vi.mock("../src/api/cartApi", () => ({
  getCart: vi.fn(),
  deleteItemCart: vi.fn(),
  updateItemCart: vi.fn(),
}));

// Mock de la API de órdenes
vi.mock("../src/api/orderApi.js", () => ({
  createCheckoutSession: vi.fn(),
}));

// Mock de CartItem
vi.mock("../src/components/CartItem", () => ({
  default: ({ item, increaseQuantity, decreaseQuantity, removeItem }) => (
    <div>
      <p>{item.product.name}</p>

      <p data-testid={`quantity-${item.product._id}`}>{item.quantity}</p>

      <button onClick={() => increaseQuantity(item.product._id)}>
        Increase
      </button>

      <button onClick={() => decreaseQuantity(item.product._id)}>
        Decrease
      </button>

      <button onClick={() => removeItem(item.product._id)}>Remove</button>
    </div>
  ),
}));

const renderCart = () => {
  return render(
    <MemoryRouter>
      <Cart />
    </MemoryRouter>,
  );
};

const mockCart = {
  cart: {
    items: [
      {
        product: {
          _id: "product-1",
          name: "Nike Shoes",
          price: 100,
        },
        quantity: 2,
      },
      {
        product: {
          _id: "product-2",
          name: "Adidas Shirt",
          price: 50,
        },
        quantity: 1,
      },
    ],
  },
};

describe("Cart", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    getCart.mockResolvedValue(mockCart);
    updateItemCart.mockResolvedValue({});
    deleteItemCart.mockResolvedValue({});
  });

  it("debe mostrar el carrito vacío cuando no hay productos", async () => {
    getCart.mockResolvedValue({
      cart: {
        items: [],
      },
    });

    renderCart();

    await waitFor(() => {
      expect(screen.getByText("Your cart is empty")).toBeInTheDocument();
    });

    expect(
      screen.getByText("Looks like you haven't added anything yet."),
    ).toBeInTheDocument();
  });

  it("debe mostrar los productos del carrito", async () => {
    renderCart();

    await waitFor(() => {
      expect(screen.getByText("Nike Shoes")).toBeInTheDocument();
      expect(screen.getByText("Adidas Shirt")).toBeInTheDocument();
    });
  });

  it("debe llamar getCart cuando el componente se monta", async () => {
    renderCart();

    await waitFor(() => {
      expect(getCart).toHaveBeenCalledTimes(1);
    });
  });

  it("debe calcular correctamente el subtotal", async () => {
    renderCart();

    await waitFor(() => {
      /*
        Nike Shoes:
        100 * 2 = 200

        Adidas Shirt:
        50 * 1 = 50

        Subtotal:
        200 + 50 = 250
      */

      expect(screen.getByText("$250.00")).toBeInTheDocument();
    });
  });

  it("debe calcular correctamente el envío", async () => {
    renderCart();

    await waitFor(() => {
      expect(screen.getByText("$10.00")).toBeInTheDocument();
    });
  });

  it("debe calcular correctamente los impuestos", async () => {
    renderCart();

    await waitFor(() => {
      /*
        Subtotal = 250
        Taxes = 250 * 0.19
        Taxes = 47.50
      */

      expect(screen.getByText("$47.50")).toBeInTheDocument();
    });
  });

  it("debe calcular correctamente el total", async () => {
    renderCart();

    await waitFor(() => {
      /*
        Subtotal = 250
        Shipping = 10
        Taxes = 47.50

        Total = 307.50
      */

      expect(screen.getByText("$307.50")).toBeInTheDocument();
    });
  });

  it("debe aumentar la cantidad de un producto", async () => {
    const user = userEvent.setup();

    renderCart();

    await waitFor(() => {
      expect(screen.getByTestId("quantity-product-1")).toHaveTextContent("2");
    });

    await user.click(
      screen.getByRole("button", {
        name: "Increase",
      }),
    );

    expect(screen.getByTestId("quantity-product-1")).toHaveTextContent("3");

    expect(updateItemCart).toHaveBeenCalledWith("product-1", 1);
  });

  it("debe disminuir la cantidad de un producto", async () => {
    const user = userEvent.setup();

    renderCart();

    await waitFor(() => {
      expect(screen.getByTestId("quantity-product-1")).toHaveTextContent("2");
    });

    await user.click(
      screen.getByRole("button", {
        name: "Decrease",
      }),
    );

    expect(screen.getByTestId("quantity-product-1")).toHaveTextContent("1");

    expect(updateItemCart).toHaveBeenCalledWith("product-1", -1);
  });

  it("debe eliminar un producto del carrito", async () => {
    const user = userEvent.setup();

    renderCart();

    await waitFor(() => {
      expect(screen.getByText("Nike Shoes")).toBeInTheDocument();
    });

    await user.click(
      screen.getByRole("button", {
        name: "Remove",
      }),
    );

    await waitFor(() => {
      expect(screen.queryByText("Nike Shoes")).not.toBeInTheDocument();
    });

    expect(deleteItemCart).toHaveBeenCalledWith("product-1");
  });

  it("debe llamar createCheckoutSession al hacer checkout", async () => {
    const user = userEvent.setup();

    createCheckoutSession.mockResolvedValue({
      checkoutUrl: "https://checkout.stripe.com/test",
    });

    renderCart();

    await waitFor(() => {
      expect(
        screen.getByRole("button", {
          name: "Proceed to Checkout",
        }),
      ).toBeInTheDocument();
    });

    await user.click(
      screen.getByRole("button", {
        name: "Proceed to Checkout",
      }),
    );

    expect(createCheckoutSession).toHaveBeenCalledTimes(1);
  });
});
