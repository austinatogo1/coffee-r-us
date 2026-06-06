// useCoffee.test.jsx — unit tests for the custom useCoffee hook
import { renderHook, waitFor, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useCoffee } from "../hooks/useCoffee";

const mockCoffees = [
  { id: 1, name: "Vanilla Bean", description: "Medium Roast", origin: "Colombia", price: 10, image: "" },
  { id: 2, name: "House Blend",  description: "Dark Roast",   origin: "Vietnam",  price: 12, image: "" },
];

beforeEach(() => {
  global.fetch = vi.fn();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("useCoffee hook", () => {
  it("fetches coffees on mount and sets state", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockCoffees,
    });

    const { result } = renderHook(() => useCoffee());

    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.coffees).toHaveLength(2);
    expect(result.current.coffees[0].name).toBe("Vanilla Bean");
  });

  it("sets error state on fetch failure", async () => {
    global.fetch.mockResolvedValueOnce({ ok: false, json: async () => [] });

    const { result } = renderHook(() => useCoffee());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBeTruthy();
  });

  it("addCoffee POSTs and appends to state", async () => {
    const newCoffee = { id: 3, name: "New Brew", origin: "Kenya", price: 9, image: "" };

    global.fetch
      .mockResolvedValueOnce({ ok: true, json: async () => mockCoffees })
      .mockResolvedValueOnce({ ok: true, json: async () => newCoffee });

    const { result } = renderHook(() => useCoffee());
    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      await result.current.addCoffee(newCoffee);
    });

    expect(result.current.coffees).toHaveLength(3);
    expect(result.current.coffees[2].name).toBe("New Brew");
  });

  it("deleteCoffee removes coffee from state", async () => {
    global.fetch
      .mockResolvedValueOnce({ ok: true, json: async () => mockCoffees })
      .mockResolvedValueOnce({ ok: true, json: async () => ({}) });

    const { result } = renderHook(() => useCoffee());
    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      await result.current.deleteCoffee(1);
    });

    expect(result.current.coffees).toHaveLength(1);
    expect(result.current.coffees[0].id).toBe(2);
  });

  it("updateCoffee PATCHes and updates state", async () => {
    const updated = { ...mockCoffees[0], price: 99 };

    global.fetch
      .mockResolvedValueOnce({ ok: true, json: async () => mockCoffees })
      .mockResolvedValueOnce({ ok: true, json: async () => updated });

    const { result } = renderHook(() => useCoffee());
    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      await result.current.updateCoffee(1, { price: 99 });
    });

    expect(result.current.coffees[0].price).toBe(99);
  });
});