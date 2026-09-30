import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Product from "../src/pages/Product";

const mockNavigate = vi.fn();
const mockGetProduct = vi.fn();
const mockCreateItemCart = vi.fn();

vi.mock("react-router-dom", () => ({
  useParams: () => ({
    slug: "nike-air-max",
  }),
  useNavigate: () => mockNavigate,
}));

vi.mock("../src/api/productsApi", () => ({
  getProduct: (...args) => mockGetProduct(...args),
}));

vi.mock("../src/api/cartApi", () => ({
  createItemCart: (...args) => mockCreateItemCart(...args),
}));

const mockProduct = {
  _id: "product-1",
  title: "Nike Air Max",
  price: 250000,
  description: "A premium running shoe.",
  images: [
    {
      url: "https://example.com/nike-1.jpg",
    },
    {
      url: "https://example.com/nike-2.jpg",
    },
  ],
};

const renderProduct = () => {
  return render(<Product />);
};

describe("Product", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mockGetProduct.mockResolvedValue({
      product: mockProduct,
    });

    mockCreateItemCart.mockResolvedValue({
      message: "Product added to cart",
    });
  });

  it("debe mostrar Loading mientras carga el producto", () => {
    mockGetProduct.mockReturnValue(new Promise(() => {}));

    renderProduct();

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("debe llamar getProduct con el slug correcto", async () => {
    renderProduct();

    await waitFor(() => {
      expect(mockGetProduct).toHaveBeenCalledTimes(1);
    });

    expect(mockGetProduct).toHaveBeenCalledWith("nike-air-max");
  });

  it("debe mostrar la información del producto", async () => {
    renderProduct();

    expect(
      await screen.findByRole("heading", {
        name: "Nike Air Max",
      }),
    ).toBeInTheDocument();

    expect(screen.getByText("$250000")).toBeInTheDocument();

    expect(screen.getByText("A premium running shoe.")).toBeInTheDocument();

    expect(screen.getByText("New Collection")).toBeInTheDocument();
  });

  it("debe mostrar todas las imágenes del producto", async () => {
    renderProduct();

    const images = await screen.findAllByAltText("Nike Air Max");

    expect(images).toHaveLength(2);

    expect(images[0]).toHaveAttribute("src", "https://example.com/nike-1.jpg");

    expect(images[1]).toHaveAttribute("src", "https://example.com/nike-2.jpg");
  });

  it("debe mostrar las opciones de talla", async () => {
    renderProduct();

    await screen.findByRole("heading", {
      name: "Nike Air Max",
    });

    expect(screen.getByRole("button", { name: "S" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "M" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "L" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "XL" })).toBeInTheDocument();
  });

  it("debe mostrar el botón Add to Cart", async () => {
    renderProduct();

    const addButton = await screen.findByRole("button", {
      name: /add to cart/i,
    });

    expect(addButton).toBeInTheDocument();
  });

  it("debe agregar el producto al carrito", async () => {
    const user = userEvent.setup();

    renderProduct();

    const addButton = await screen.findByRole("button", {
      name: /add to cart/i,
    });

    await user.click(addButton);

    await waitFor(() => {
      expect(mockCreateItemCart).toHaveBeenCalledTimes(1);
    });

    expect(mockCreateItemCart).toHaveBeenCalledWith({
      productId: "product-1",
      quantity: 1,
    });
  });

  it("debe redirigir al login cuando el usuario no está autenticado", async () => {
    const user = userEvent.setup();

    mockCreateItemCart.mockRejectedValue({
      response: {
        status: 401,
      },
    });

    renderProduct();

    const addButton = await screen.findByRole("button", {
      name: /add to cart/i,
    });

    await user.click(addButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/login");
    });
  });

  it("debe renderizar los botones de navegación del carrusel", async () => {
    renderProduct();

    await screen.findByRole("heading", {
      name: "Nike Air Max",
    });

    const buttons = screen.getAllByRole("button");

    // 2 botones del carrusel + 4 tallas + Add to Cart
    expect(buttons.length).toBe(7);
  });
});
