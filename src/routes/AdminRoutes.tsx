import { Navigate, Route, Routes } from "react-router-dom";
import UsersPanel from "../pages/admin/UsersPanel";
import DashboardPanel from "../pages/admin/DashboardPanel";
import ProductsPanel from "../pages/admin/ProductsPanel";
import ProductAddPage from "../pages/admin/ProductAddPage";
import ProductEditPage from "../pages/admin/ProductEditPage";
import CategoriesPanel from "../pages/admin/CategoriesPanel";
import CategoriesAddPage from "../pages/admin/CategoriesAddPage";
import CategoriesEditPage from "../pages/admin/CategoriesEditPage";
import OrdersPanel from "../pages/admin/OrdersPanel";
import SettingsPanel from "../pages/admin/SettingsPanel";
import UsersEditPage from "../pages/admin/UsersEditPage";

function AdminRoutes() {
  return (
    <Routes>
      <Route index element={<Navigate to="dashboard" />} />
      <Route path="users" element={<UsersPanel />}></Route>
      <Route path="users/edit/:id" element={<UsersEditPage />}></Route>
      <Route path="dashboard" element={<DashboardPanel />}></Route>
      <Route path="products" element={<ProductsPanel />}></Route>
      <Route path="products/add" element={<ProductAddPage />}></Route>
      <Route path="products/edit/:id" element={<ProductEditPage />}></Route>
      <Route path="categories" element={<CategoriesPanel />}></Route>
      <Route path="categories/add" element={<CategoriesAddPage />}></Route>
      <Route
        path="categories/edit/:id"
        element={<CategoriesEditPage />}
      ></Route>
      <Route path="orders" element={<OrdersPanel />}></Route>
      <Route path="settings" element={<SettingsPanel />}></Route>
    </Routes>
  );
}

export default AdminRoutes;
