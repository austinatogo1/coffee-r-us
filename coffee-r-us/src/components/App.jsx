import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import HomePage from "./HomePage";
import ShopPage from "./ShopPage";
import AdminPage from "./AdminPage";
import Footer from "./Footer";

function App() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <Routes>
        <Route path="/"      element={<HomePage />} />
        <Route path="/shop"  element={<ShopPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;