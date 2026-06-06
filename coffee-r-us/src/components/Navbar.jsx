// Navbar.jsx
// Sticky top navigation bar with links to Home, Shop, and Admin Portal.
// Uses NavLink from react-router-dom so the active route gets the "active" class.

import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-brand">
        ☕ Coffee R Us
      </NavLink>
      <ul className="navbar-links">
        <li>
          <NavLink to="/" end>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/shop">Shop</NavLink>
        </li>
        <li>
          <NavLink to="/admin">Admin Portal</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;