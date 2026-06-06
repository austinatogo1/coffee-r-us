// useCoffee.js
// Custom hook that centralizes all coffee data fetching and CRUD operations.
// Any component that needs coffee data imports this hook instead of writing
// its own fetch calls — single source of truth for state + side effects.

import { useState, useEffect, useCallback } from "react";

const API_URL = "http://localhost:3001";

export function useCoffee() {
  const [coffees, setCoffees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  // ── GET all coffees on mount ──────────────────────────────────────────────
  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/coffee`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch coffees");
        return res.json();
      })
      .then((data) => {
        setCoffees(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // ── POST — add a new coffee ───────────────────────────────────────────────
  const addCoffee = useCallback((newCoffee) => {
    return fetch(`${API_URL}/coffee`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCoffee),
    })
      .then((res) => res.json())
      .then((created) => {
        setCoffees((prev) => [...prev, created]);
        return created;
      });
  }, []);

  // ── PATCH — update a single field (e.g. price) ───────────────────────────
  const updateCoffee = useCallback((id, changes) => {
    return fetch(`${API_URL}/coffee/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(changes),
    })
      .then((res) => res.json())
      .then((updated) => {
        setCoffees((prev) =>
          prev.map((c) => (c.id === updated.id ? updated : c))
        );
        return updated;
      });
  }, []);

  // ── DELETE — remove a coffee ──────────────────────────────────────────────
  const deleteCoffee = useCallback((id) => {
    return fetch(`${API_URL}/coffee/${id}`, { method: "DELETE" }).then(() => {
      setCoffees((prev) => prev.filter((c) => c.id !== id));
    });
  }, []);

  return { coffees, loading, error, addCoffee, updateCoffee, deleteCoffee };
}