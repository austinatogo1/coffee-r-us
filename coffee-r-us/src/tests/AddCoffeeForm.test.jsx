// AddCoffeeForm.test.jsx — tests form renders, validates, and submits
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import AddCoffeeForm from "../components/AddCoffeeForm";

describe("AddCoffeeForm", () => {
  it("renders all input fields and submit button", () => {
    render(<AddCoffeeForm onAddCoffee={vi.fn()} />);
    expect(screen.getByLabelText(/coffee name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/origin/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/price/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add coffee/i })).toBeInTheDocument();
  });

  it("shows validation errors when submitting empty form", async () => {
    render(<AddCoffeeForm onAddCoffee={vi.fn()} />);
    fireEvent.click(screen.getByRole("button", { name: /add coffee/i }));
    await waitFor(() => {
      expect(screen.getByText("Name is required")).toBeInTheDocument();
      expect(screen.getByText("Origin is required")).toBeInTheDocument();
      expect(screen.getByText("Enter a valid price")).toBeInTheDocument();
    });
  });

  it("calls onAddCoffee with correct data when form is valid", async () => {
    const mockAdd = vi.fn().mockResolvedValue({});
    render(<AddCoffeeForm onAddCoffee={mockAdd} />);

    fireEvent.change(screen.getByLabelText(/coffee name/i), {
      target: { value: "Test Brew" },
    });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: "A test coffee" },
    });
    fireEvent.change(screen.getByLabelText(/origin/i), {
      target: { value: "Kenya" },
    });
    fireEvent.change(screen.getByLabelText(/price/i), {
      target: { value: "9.99" },
    });

    fireEvent.click(screen.getByRole("button", { name: /add coffee/i }));

    await waitFor(() => {
      expect(mockAdd).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "Test Brew",
          origin: "Kenya",
          price: 9.99,
        })
      );
    });
  });

  it("clears form fields after successful submission", async () => {
    const mockAdd = vi.fn().mockResolvedValue({});
    render(<AddCoffeeForm onAddCoffee={mockAdd} />);

    fireEvent.change(screen.getByLabelText(/coffee name/i), {
      target: { value: "Test Brew" },
    });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: "desc" },
    });
    fireEvent.change(screen.getByLabelText(/origin/i), {
      target: { value: "Kenya" },
    });
    fireEvent.change(screen.getByLabelText(/price/i), {
      target: { value: "9" },
    });

    fireEvent.click(screen.getByRole("button", { name: /add coffee/i }));

    await waitFor(() => {
      expect(screen.getByLabelText(/coffee name/i)).toHaveValue("");
    });
  });
});