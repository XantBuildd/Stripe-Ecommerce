import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";

import Protected from "../src/pages/Protected";

vi.mock("../src/context/useAuth.js", () => ({
  useAuth: vi.fn(),
}));

import { useAuth } from "../src/context/useAuth.js";

describe("Protected", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("debe mostrar Loading mientras se verifica la autenticación", () => {
    useAuth.mockReturnValue({
      loading: true,
      isAuthenticated: false,
    });

    render(
      <MemoryRouter>
        <Protected />
      </MemoryRouter>,
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("debe redirigir al login cuando el usuario no está autenticado", () => {
    useAuth.mockReturnValue({
      loading: false,
      isAuthenticated: false,
    });

    render(
      <MemoryRouter initialEntries={["/profile"]}>
        <Routes>
          <Route element={<Protected />}>
            <Route path="/profile" element={<h1>Profile</h1>} />
          </Route>

          <Route path="/login" element={<h1>Login Page</h1>} />
        </Routes>
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { name: "Login Page" }),
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("heading", { name: "Profile" }),
    ).not.toBeInTheDocument();
  });

  it("debe mostrar el contenido protegido cuando el usuario está autenticado", () => {
    useAuth.mockReturnValue({
      loading: false,
      isAuthenticated: true,
    });

    render(
      <MemoryRouter initialEntries={["/profile"]}>
        <Routes>
          <Route element={<Protected />}>
            <Route path="/profile" element={<h1>Profile</h1>} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { name: "Profile" }),
    ).toBeInTheDocument();
  });
});
