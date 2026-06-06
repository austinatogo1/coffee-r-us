// Navbar.test.jsx — tests navigation links render and are accessible
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import Navbar from "../components/Navbar";

describe("Navbar", () => {
  function renderNavbar(initialPath = "/") {
    return render(
      <MemoryRouter initialEntries={[initialPath]}>
        <Navbar />
      </MemoryRouter>
    );
  }

  it("renders the brand name", () => {
    renderNavbar();
    expect(screen.getByText(/Coffee R Us/i)).toBeInTheDocument();
  });

  it("renders Home, Shop, and Admin Portal links", () => {
    renderNavbar();
    expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /shop/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /admin portal/i })).toBeInTheDocument();
  });

  it("Home link points to /", () => {
    renderNavbar();
    expect(screen.getByRole("link", { name: /home/i })).toHaveAttribute("href", "/");
  });

  it("Shop link points to /shop", () => {
    renderNavbar();
    expect(screen.getByRole("link", { name: /shop/i })).toHaveAttribute("href", "/shop");
  });

  it("Admin link points to /admin", () => {
    renderNavbar();
    expect(screen.getByRole("link", { name: /admin portal/i })).toHaveAttribute("href", "/admin");
  });
});