import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import CartItem from "../src/components/CartItem";

const mockItem = {
  product: {
    _id: "product-1",
    title: "Nike Air Max",
    price: 100,
    images: [
      {
        url: "https://example.com/nike.jpg",
      },
    ],
  },
  quantity: 2,
};

const renderCartItem = () => {
  const increaseQuantity = vi.fn();
  const decreaseQuantity = vi.fn();
  const removeItem = vi.fn();

  render(
    <CartItem
      item={mockItem}
      increaseQuantity={increaseQuantity}
      decreaseQuantity={decreaseQuantity}
      removeItem={removeItem}
    />,
  );

  return {
    increaseQuantity,
    decreaseQuantity,
    removeItem,
  };
};

describe("CartItem", () => {
  it("debe mostrar la información del producto", () => {
    renderCartItem();

    expect(screen.getAllByText("Nike Air Max").length).toBeGreaterThan(0);
    expect(screen.getAllByText("$100").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Premium Collection").length).toBeGreaterThan(0);
    expect(screen.getAllByText("2").length).toBeGreaterThan(0);
  });

  it("debe mostrar correctamente la imagen del producto", () => {
    renderCartItem();

    const images = screen.getAllByAltText("Nike Air Max");

    expect(images.length).toBeGreaterThan(0);
    expect(images[0]).toHaveAttribute("src", "https://example.com/nike.jpg");
  });

  it("debe llamar increaseQuantity con el id del producto", async () => {
    const user = userEvent.setup();

    const { increaseQuantity } = renderCartItem();

    const buttons = screen.getAllByRole("button");

    // Botones: disminuir, aumentar y eliminar.
    await user.click(buttons[1]);

    expect(increaseQuantity).toHaveBeenCalledTimes(1);
    expect(increaseQuantity).toHaveBeenCalledWith("product-1");
  });

  it("debe llamar decreaseQuantity con el id del producto", async () => {
    const user = userEvent.setup();

    const { decreaseQuantity } = renderCartItem();

    const buttons = screen.getAllByRole("button");

    await user.click(buttons[0]);

    expect(decreaseQuantity).toHaveBeenCalledTimes(1);
    expect(decreaseQuantity).toHaveBeenCalledWith("product-1");
  });

  it("debe llamar removeItem con el id del producto", async () => {
    const user = userEvent.setup();

    const { removeItem } = renderCartItem();

    const buttons = screen.getAllByRole("button");

    await user.click(buttons[2]);

    expect(removeItem).toHaveBeenCalledTimes(1);
    expect(removeItem).toHaveBeenCalledWith("product-1");
  });
});
