// HomePage.jsx
// Landing page: hero section with store info fetched from the backend.

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function HomePage() {
  // Store info is fetched separately from coffee data
  const [storeInfo, setStoreInfo] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/store_info")
      .then((res) => res.json())
      .then((data) => setStoreInfo(data[0]));
  }, []);

  return (
    <>
      {/* Hero banner */}
      <div className="hero">
        <h1>{storeInfo ? storeInfo.name : "Coffee R Us"}</h1>
        <p>{storeInfo ? storeInfo.description : "The go-to store for your coffee needs"}</p>
        {storeInfo && (
          <div className="hero-meta">
            <span>📞 {storeInfo.phone_number}</span>
            <span>📍 {storeInfo.location}</span>
          </div>
        )}
      </div>

      {/* Info section */}
      <div className="page">
        <h2 className="page-title">Welcome</h2>
        <p style={{ color: "var(--text-mid)", lineHeight: 1.7, maxWidth: 640 }}>
          Discover our hand-selected coffees sourced from the world's finest
          growing regions. Whether you prefer a bright Ethiopian light roast or a
          bold Sumatran dark roast, we have something for every palate.
        </p>
        <div style={{ marginTop: "2rem", display: "flex", gap: "1rem" }}>
          <Link to="/shop" className="btn btn-primary">
            Browse Our Shop →
          </Link>
          <Link to="/admin" className="btn" style={{ background: "var(--cream-dark)", color: "var(--brown-dark)" }}>
            Admin Portal
          </Link>
        </div>
      </div>
    </>
  );
}

export default HomePage;