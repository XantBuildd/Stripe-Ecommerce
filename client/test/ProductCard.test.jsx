import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import NewProduct from "../src/components/NewProduct";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

const mockProduct = {
  image: "https://example.com/product.jpg",
  title: "Nike Air Max",
  price: 250000,
  slug: "nike-air-max",
};

const renderProduct = () => {
  return render(<NewProduct {...mockProduct} />);
};

describe("NewProduct", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("debe renderizar la información del producto", () => {
    renderProduct();

    expect(screen.getByText("Nike Air Max")).toBeInTheDocument();
    expect(screen.getByText("$250000")).toBeInTheDocument();
    expect(screen.getByText("NEW")).toBeInTheDocument();
    expect(screen.getByText("BUY")).toBeInTheDocument();
  });

  it("debe renderizar correctamente la imagen del producto", () => {
    renderProduct();

    const image = screen.getByAltText("Nike Air Max");

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "https://example.com/product.jpg");
  });

  it("debe navegar al producto cuando se hace click en la tarjeta", async () => {
    const user = userEvent.setup();

    renderProduct();

    const title = screen.getByText("Nike Air Max");

    await user.click(title);

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith("/product/nike-air-max");
  });

  it("debe navegar usando el slug correcto", async () => {
    const user = userEvent.setup();

    render(
      <NewProduct
        image="product.jpg"
        title="Adidas Campus"
        price={180000}
        slug="adidas-campus"
      />,
    );

    await user.click(screen.getByText("Adidas Campus"));

    expect(mockNavigate).toHaveBeenCalledWith("/product/adidas-campus");
  });

  it("debe renderizar el botón BUY", () => {
    renderProduct();

    const buyButton = screen.getByRole("button", {
      name: /buy/i,
    });

    expect(buyButton).toBeInTheDocument();
  });
});
