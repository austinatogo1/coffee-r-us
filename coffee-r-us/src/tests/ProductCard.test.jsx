// ProductCard.test.jsx — tests product card renders all fields correctly
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ProductCard from "../components/ProductCard";

const mockCoffee = {
  id: 1,
  name: "Vanilla Bean",
  description: "Medium Roast, nutty flavor",
  origin: "Colombia",
  price: 10.0,
  image: "https://example.com/coffee.jpg",
};

describe("ProductCard", () => {
  it("renders the coffee name", () => {
    render(<ProductCard coffee={mockCoffee} />);
    expect(screen.getByText("Vanilla Bean")).toBeInTheDocument();
  });

  it("renders the description", () => {
    render(<ProductCard coffee={mockCoffee} />);
    expect(screen.getByText("Medium Roast, nutty flavor")).toBeInTheDocument();
  });

  it("renders the origin", () => {
    render(<ProductCard coffee={mockCoffee} />);
    expect(screen.getByText(/Colombia/)).toBeInTheDocument();
  });

  it("renders the price formatted to 2 decimal places", () => {
    render(<ProductCard coffee={mockCoffee} />);
    expect(screen.getByText("$10.00")).toBeInTheDocument();
  });

  it("renders an img with the correct alt text", () => {
    render(<ProductCard coffee={mockCoffee} />);
    expect(screen.getByRole("img", { name: "Vanilla Bean" })).toBeInTheDocument();
  });

  it("has data-testid='product-card'", () => {
    render(<ProductCard coffee={mockCoffee} />);
    expect(screen.getByTestId("product-card")).toBeInTheDocument();
  });
});