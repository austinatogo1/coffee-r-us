import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import HomePage from "./HomePage";
import ShopPage from "./ShopPage";
import AdminPage from "./AdminPage";
import Footer from "./Footer";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/"      element={<HomePage />} />
        <Route path="/shop"  element={<ShopPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </div>
  );
}

export default App;