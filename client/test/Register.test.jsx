import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import Register from "../src/pages/Register";

vi.mock("../src/context/useAuth.js", () => ({
  useAuth: vi.fn(),
}));

import { useAuth } from "../src/context/useAuth.js";

const renderRegister = () => {
  return render(
    <MemoryRouter>
      <Register />
    </MemoryRouter>,
  );
};

describe("Register", () => {
  let registerUser;

  beforeEach(() => {
    vi.clearAllMocks();

    registerUser = vi.fn().mockResolvedValue({});

    useAuth.mockReturnValue({
      register: registerUser,
    });
  });

  it("debe renderizar el formulario de registro", () => {
    renderRegister();

    expect(
      screen.getByRole("heading", { name: /create account/i }),
    ).toBeInTheDocument();

    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /create account/i }),
    ).toBeInTheDocument();
  });

  it("debe mostrar error cuando el username está vacío", async () => {
    const user = userEvent.setup();

    renderRegister();

    await user.click(screen.getByRole("button", { name: /create account/i }));

    expect(screen.getByText("Username required")).toBeInTheDocument();
  });

  it("debe mostrar error cuando el email está vacío", async () => {
    const user = userEvent.setup();

    renderRegister();

    await user.type(screen.getByPlaceholderText("Username"), "Nicolas");

    await user.click(screen.getByRole("button", { name: /create account/i }));

    expect(screen.getByText("Email required")).toBeInTheDocument();
  });

  it("debe mostrar error cuando el password está vacío", async () => {
    const user = userEvent.setup();

    renderRegister();

    await user.type(screen.getByPlaceholderText("Username"), "Nicolas");

    await user.type(screen.getByPlaceholderText("Email"), "test@example.com");

    await user.click(screen.getByRole("button", { name: /create account/i }));

    expect(screen.getByText("Password required")).toBeInTheDocument();
  });

  it("debe validar que el password tenga mínimo 6 caracteres", async () => {
    const user = userEvent.setup();

    renderRegister();

    await user.type(screen.getByPlaceholderText("Username"), "Nicolas");

    await user.type(screen.getByPlaceholderText("Email"), "test@example.com");

    await user.type(screen.getByPlaceholderText("Password"), "123");

    await user.click(screen.getByRole("button", { name: /create account/i }));

    expect(registerUser).not.toHaveBeenCalled();
  });

  it("debe llamar registerUser con los datos del formulario", async () => {
    const user = userEvent.setup();

    renderRegister();

    await user.type(screen.getByPlaceholderText("Username"), "Nicolas");

    await user.type(
      screen.getByPlaceholderText("Email"),
      "nicolas@example.com",
    );

    await user.type(screen.getByPlaceholderText("Password"), "123456");

    await user.click(screen.getByRole("button", { name: /create account/i }));

    await waitFor(() => {
      expect(registerUser).toHaveBeenCalledTimes(1);
    });

    expect(registerUser).toHaveBeenCalledWith({
      username: "Nicolas",
      email: "nicolas@example.com",
      password: "123456",
    });
  });

  it("debe mostrar el enlace para registrarse con Google", () => {
    renderRegister();

    const googleLink = screen.getByRole("link", {
      name: /register with google/i,
    });

    expect(googleLink).toBeInTheDocument();

    expect(googleLink).toHaveAttribute(
      "href",
      "http://localhost:3000/api/auth/google",
    );
  });

  it("debe mostrar el enlace para iniciar sesión", () => {
    renderRegister();

    const loginLinks = screen.getAllByRole("link", {
      name: /login/i,
    });

    expect(loginLinks.length).toBeGreaterThan(0);

    expect(loginLinks[loginLinks.length - 1]).toHaveAttribute("href", "/login");
  });
});
