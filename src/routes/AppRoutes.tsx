import { Route, Routes } from "react-router-dom";
import Home from "../pages/app/Home";
import LoginPage from "../pages/app/LoginPage";
import ProductsPage from "../pages/app/ProductsPage";
import ProductDetailsPage from "../pages/app/ProductDetailsPage";
import RegisterPage from "../pages/app/RegisterPage";
import WishlistPage from "../pages/app/WishlistPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/products" element={<ProductsPage />}></Route>
      <Route path="/products/:id" element={<ProductDetailsPage />}></Route>
      <Route path="/register" element={<RegisterPage />}></Route>
      <Route path="/wishlist" element={<WishlistPage />}></Route>
    </Routes>
  );
}

export default AppRoutes;
