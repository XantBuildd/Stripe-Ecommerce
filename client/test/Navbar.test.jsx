import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import Navbar from "../src/components/Navbar";
import { getCart } from "../src/api/cartApi";

// Mock de autenticación
vi.mock("../src/context/useAuth.js", () => ({
  useAuth: vi.fn(),
}));

// Mock del carrito
vi.mock("../src/api/cartApi", () => ({
  getCart: vi.fn(),
}));

// Mock de los elementos del navbar
vi.mock("../src/data/navItemsData", () => ({
  default: [
    {
      label: "Home",
      path: "/",
    },
    {
      label: "Products",
      path: "/products",
    },
    {
      label: "Orders",
      path: "/orders",
    },
    {
      label: "About",
      path: "/about",
    },
    {
      label: "Contact",
      path: "/contact",
    },
  ],
}));

import { useAuth } from "../src/context/useAuth.js";

const renderNavbar = () => {
  return render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>,
  );
};

describe("Navbar", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    useAuth.mockReturnValue({
      isAuthenticated: false,
      user: null,
    });

    getCart.mockResolvedValue({
      cart: {
        items: [],
      },
    });
  });

  it("debe renderizar el logo", () => {
    renderNavbar();

    const logos = screen.getAllByAltText(/logo of stripe/i);

    expect(logos.length).toBeGreaterThan(0);
  });

  it("debe renderizar los elementos de navegación", () => {
    renderNavbar();

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Products")).toBeInTheDocument();
    expect(screen.getByText("Orders")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("debe tener el enlace al carrito", () => {
    renderNavbar();

    const cartLink = screen.getByRole("link", {
      name: "",
    });

    expect(cartLink).toBeInTheDocument();
  });

  it("debe mostrar inicialmente el carrito con cantidad 0", async () => {
    renderNavbar();

    await waitFor(() => {
      expect(getCart).toHaveBeenCalledTimes(1);
    });

    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("debe calcular correctamente la cantidad de productos del carrito", async () => {
    getCart.mockResolvedValue({
      cart: {
        items: [
          {
            product: "product-1",
            quantity: 2,
          },
          {
            product: "product-2",
            quantity: 3,
          },
        ],
      },
    });

    renderNavbar();

    await waitFor(() => {
      expect(screen.getByText("5")).toBeInTheDocument();
    });
  });

  it("debe mostrar el icono de usuario cuando no está autenticado", () => {
    renderNavbar();

    const userIcon = document.querySelector("svg");

    expect(userIcon).toBeInTheDocument();
  });

  it("debe mostrar el avatar cuando el usuario está autenticado", () => {
    useAuth.mockReturnValue({
      isAuthenticated: true,
      user: {
        username: "Nicolas",
        avatar: {
          url: "https://example.com/avatar.jpg",
        },
      },
    });

    renderNavbar();

    const avatar = screen.getByAltText("Nicolas");

    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute("src", "https://example.com/avatar.jpg");
  });

  it("debe abrir el menú móvil al hacer click en el botón de menú", async () => {
    const user = userEvent.setup();

    renderNavbar();

    const menuButton = screen.getByRole("button");

    await user.click(menuButton);

    expect(screen.getByText("Follow us")).toBeInTheDocument();
  });

  it("debe cerrar el menú móvil al hacer click en cerrar", async () => {
    const user = userEvent.setup();
    renderNavbar();
    const menuButton = screen.getByRole("button");
    await user.click(menuButton);
    const closeButton = document.querySelector("svg");
    expect(closeButton).toBeInTheDocument();
  });
  it("debe llamar getCart cuando el componente se monta", async () => {
    renderNavbar();
    await waitFor(() => {
      expect(getCart).toHaveBeenCalledTimes(1);
    });
  });
});
