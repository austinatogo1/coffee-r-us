// AdminPage.jsx
// Administrator portal with two tabs:
// 1. "Add Coffee"  — form to POST a new product
// 2. "Manage"      — table with inline PATCH (price) and DELETE per row
// Uses the custom useCoffee hook and useToast for feedback.

import { useState } from "react";
import { useCoffee } from "../hooks/useCoffee";
import { useToast } from "../hooks/useToast";
import AddCoffeeForm from "./AddCoffeeForm";

function AdminPage() {
  const { coffees, loading, addCoffee, updateCoffee, deleteCoffee } = useCoffee();
  const { message, showToast } = useToast();

  // Track which tab is active: "add" | "manage"
  const [activeTab, setActiveTab] = useState("manage");

  // Track the price being edited per row (keyed by coffee id)
  const [editPrices, setEditPrices] = useState({});

  function handleAddCoffee(newCoffee) {
    return addCoffee(newCoffee).then(() => {
      showToast("✅ Coffee added successfully!");
      setActiveTab("manage");
    });
  }

  function handlePriceChange(id, value) {
    setEditPrices((prev) => ({ ...prev, [id]: value }));
  }

  function handlePriceSave(id) {
    const newPrice = parseFloat(editPrices[id]);
    if (isNaN(newPrice) || newPrice < 0) {
      showToast("❌ Enter a valid price");
      return;
    }
    updateCoffee(id, { price: newPrice }).then(() => {
      showToast("✅ Price updated!");
      setEditPrices((prev) => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
    });
  }

  function handleDelete(id, name) {
    if (!window.confirm(`Delete "${name}"?`)) return;
    deleteCoffee(id).then(() => showToast(`🗑️ "${name}" deleted`));
  }

  if (loading) return <div className="page">Loading…</div>;

  return (
    <div className="page">
      <h2 className="page-title">Admin Portal</h2>

      {/* ── Tab Bar ── */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.75rem" }}>
        {["manage", "add"].map((tab) => (
          <button
            key={tab}
            className="btn"
            onClick={() => setActiveTab(tab)}
            style={{
              background: activeTab === tab ? "var(--brown-dark)" : "var(--cream-dark)",
              color: activeTab === tab ? "var(--white)" : "var(--brown-dark)",
            }}
          >
            {tab === "manage" ? "Manage Products" : "Add New Coffee"}
          </button>
        ))}
      </div>

      {/* ── Add Coffee Tab ── */}
      {activeTab === "add" && (
        <AddCoffeeForm onAddCoffee={handleAddCoffee} />
      )}

      {/* ── Manage Tab ── */}
      {activeTab === "manage" && (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Origin</th>
              <th>Price ($)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {coffees.map((coffee) => {
              const editingPrice =
                editPrices[coffee.id] !== undefined
                  ? editPrices[coffee.id]
                  : coffee.price;

              return (
                <tr key={coffee.id} data-testid="admin-row">
                  <td>{coffee.name}</td>
                  <td>{coffee.origin}</td>
                  <td>
                    {/* Inline price editing — PATCH on save */}
                    <input
                      type="number"
                      value={editingPrice}
                      onChange={(e) => handlePriceChange(coffee.id, e.target.value)}
                      aria-label={`Price for ${coffee.name}`}
                    />
                  </td>
                  <td style={{ display: "flex", gap: "0.5rem" }}>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handlePriceSave(coffee.id)}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(coffee.id, coffee.name)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {/* ── Toast notification ── */}
      {message && <div className="toast">{message}</div>}
    </div>
  );
}

export default AdminPage;