import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <div className="min-h-screen bg-canvas">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products/:slug" element={<ProductPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}
