import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import Login from "../src/pages/Login";

vi.mock("../src/context/useAuth.js", () => ({
  useAuth: vi.fn(),
}));

import { useAuth } from "../src/context/useAuth.js";

const renderLogin = () => {
  return render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>,
  );
};

describe("Login", () => {
  let login;

  beforeEach(() => {
    vi.clearAllMocks();

    login = vi.fn().mockResolvedValue({});

    useAuth.mockReturnValue({
      login,
    });
  });

  it("debe renderizar el formulario de login", () => {
    renderLogin();

    expect(
      screen.getByRole("heading", { name: /welcome back/i }),
    ).toBeInTheDocument();

    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /sign in/i }),
    ).toBeInTheDocument();
  });

  it("debe mostrar error cuando el email está vacío", async () => {
    const user = userEvent.setup();

    renderLogin();

    const button = screen.getByRole("button", {
      name: /sign in/i,
    });

    await user.click(button);

    expect(screen.getByText("Email is required")).toBeInTheDocument();
  });

  it("debe mostrar error cuando el password está vacío", async () => {
    const user = userEvent.setup();

    renderLogin();

    const email = screen.getByPlaceholderText("Email");
    const button = screen.getByRole("button", {
      name: /sign in/i,
    });

    await user.type(email, "test@example.com");
    await user.click(button);

    expect(screen.getByText("Password is required")).toBeInTheDocument();
  });

  it("debe validar que el password tenga mínimo 6 caracteres", async () => {
    const user = userEvent.setup();

    renderLogin();

    const email = screen.getByPlaceholderText("Email");
    const password = screen.getByPlaceholderText("Password");

    await user.type(email, "test@example.com");
    await user.type(password, "123");
    await user.click(screen.getByRole("button", { name: /sign in/i }));

    expect(screen.getByText("Minimum 6 characters")).toBeInTheDocument();

    expect(login).not.toHaveBeenCalled();
  });

  it("debe llamar login con los datos del formulario", async () => {
    const user = userEvent.setup();

    renderLogin();

    const email = screen.getByPlaceholderText("Email");
    const password = screen.getByPlaceholderText("Password");

    await user.type(email, "test@example.com");
    await user.type(password, "123456");

    await user.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => {
      expect(login).toHaveBeenCalledTimes(1);
    });

    expect(login).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "123456",
    });
  });

  it("debe mostrar el enlace para continuar con Google", () => {
    renderLogin();

    const googleLink = screen.getByRole("link", {
      name: /continue with google/i,
    });

    expect(googleLink).toBeInTheDocument();

    expect(googleLink).toHaveAttribute(
      "href",
      "https://stripe-ecommerce-production.up.railway.app/api/auth/google",
    );
  });

  it("debe mostrar el enlace para registrarse", () => {
    renderLogin();

    const registerLink = screen.getByRole("link", {
      name: /register/i,
    });

    expect(registerLink).toBeInTheDocument();
    expect(registerLink).toHaveAttribute("href", "/register");
  });
});
