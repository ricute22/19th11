import "./styles.css";

// @ts-ignore
import Home from "./Home";
// @ts-ignore
import Layout from "./Layout";
// @ts-ignore
import Chitietsanpham from "./Chitietsanpham";
// @ts-ignore
import ProductDetail from "./ProductDetail";
// @ts-ignore
import ListProducts from "./ListProducts";
// @ts-ignore
import ListProducts_SP from "./ListProducts_SP";
// @ts-ignore
import SanPham from "./SanPham";
// @ts-ignore
import Cart from "./Cart"; // ← import giỏ hàng

import { BrowserRouter, Routes, Route } from "react-router-dom";

// @ts-ignore
import LoginPage from "./LoginPage";
// @ts-ignore
import LogoutPage from "./LogoutPage";
// @ts-ignore
import ProtectedRoute from "./ProtectedRoute";
// @ts-ignore
import ListProducts_SP_Admin from "./ListProducts_SP_Admin";
// @ts-ignore
import EditProduct from "./EditProduct";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout chung cho toàn bộ hệ thống */}
        <Route path="/" element={<Layout />}>
          {/* ------------------------ PUBLIC ROUTES ------------------------ */}
          <Route index element={<Home />} />

          {/* Danh sách sản phẩm */}
          <Route path="products" element={<ListProducts_SP />} />
          <Route path="sanpham" element={<SanPham />} />
          <Route path="sanpham/:id" element={<Chitietsanpham />} />

          {/* Giỏ hàng */}
          <Route path="cart" element={<Cart />} />

          {/* Đăng nhập / Đăng xuất */}
          <Route path="login" element={<LoginPage />} />
          <Route path="logout" element={<LogoutPage />} />

          {/* ------------------------ ADMIN ROUTES (CHỈ ADMIN ACCESS) ------------------------ */}
          <Route
            path="admin/products"
            element={
              <ProtectedRoute>
                <ListProducts_SP_Admin />
              </ProtectedRoute>
            }
          />
          <Route
            path="admin/edit/:id"
            element={
              <ProtectedRoute>
                <EditProduct />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
