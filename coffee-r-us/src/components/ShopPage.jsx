// ShopPage.jsx
// Product listing page with:
// - Dynamic search filtering by name (updates on every keystroke)
// - Origin filter checkboxes in the sidebar
// - Product grid rendered via ProductCard components

import { useState, useMemo, useRef } from "react";
import { useCoffee } from "../hooks/useCoffee";
import ProductCard from "./ProductCard";

function ShopPage() {
  const { coffees, loading, error } = useCoffee();

  // Controlled search input — filters update on every keystroke
  const [searchQuery, setSearchQuery] = useState("");

  // Checkbox filters for origin
  const [selectedOrigins, setSelectedOrigins] = useState([]);

  // useRef to focus the search input on mount
  const searchRef = useRef(null);

  // Derive unique origins from the coffee list for the sidebar checkboxes
  const origins = useMemo(
    () => [...new Set(coffees.map((c) => c.origin))].sort(),
    [coffees]
  );

  // Toggle an origin in the selected list
  function handleOriginToggle(origin) {
    setSelectedOrigins((prev) =>
      prev.includes(origin)
        ? prev.filter((o) => o !== origin)
        : [...prev, origin]
    );
  }

  // Apply search + origin filters (client-side, no extra fetch)
  const filtered = useMemo(() => {
    return coffees.filter((c) => {
      const matchesSearch = c.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesOrigin =
        selectedOrigins.length === 0 || selectedOrigins.includes(c.origin);
      return matchesSearch && matchesOrigin;
    });
  }, [coffees, searchQuery, selectedOrigins]);

  if (loading) return <div className="page">Loading coffees…</div>;
  if (error)   return <div className="page">Error: {error}</div>;

  return (
    <div className="page">
      <h2 className="page-title">Our Coffees</h2>
      <div className="shop-layout">
        {/* ── Sidebar ── */}
        <aside className="sidebar">
          <h3>Filter</h3>
          <input
            ref={searchRef}
            className="search-input"
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search coffees"
          />
          <div>
            {origins.map((origin) => (
              <label key={origin} className="filter-label">
                <input
                  type="checkbox"
                  checked={selectedOrigins.includes(origin)}
                  onChange={() => handleOriginToggle(origin)}
                />
                {origin}
              </label>
            ))}
          </div>
        </aside>

        {/* ── Product Grid ── */}
        <div>
          {filtered.length === 0 ? (
            <p className="no-results">No coffees match your search.</p>
          ) : (
            <div className="product-grid">
              {filtered.map((coffee) => (
                <ProductCard key={coffee.id} coffee={coffee} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShopPage;