import "./styles.css";
// @ts-ignore
import Home from "./Home";
// @ts-ignore
import Layout from "./Layout";
// @ts-ignore
import Trang1 from "./Trang1";
// @ts-ignore
import Chitietsanpham from "./Chitietsanpham";

// @ts-ignore
import ProductDetail from "./ProductDetail";

// @ts-ignore
import ListProducts from "./ListProducts";

// @ts-ignore
import ListProducts_SP from "./ListProducts_SP";

// @ts-ignore
import Trang2 from "./Trang2";

import { BrowserRouter, Routes, Route } from "react-router-dom";

//@ts-ignore
import LoginPage from "./LoginPage";
//@ts-ignore
import LogoutPage from "./LogoutPage";
//@ts-ignore
import ProtectedRoute from "./ProtectedRoute";
//@ts-ignore
import ListProducts_SP_Admin from "./ListProducts_SP_Admin";
//@ts-ignore
import EditProduct from "./EditProduct";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ✅ Layout chung cho toàn bộ hệ thống */}
        <Route path="/" element={<Layout />}>
          {/* ----------------------------------------------------------- */}
          {/* 🌐 ROUTES CHO NGƯỜI DÙNG VÃNG LAI (PUBLIC ACCESS)             */}
          {/* ----------------------------------------------------------- */}

          {/* Trang chủ */}
          <Route index element={<Home />} />

          {/* Danh sách sản phẩm (ví dụ) */}
          <Route path="products" element={<ListProducts_SP />} />

          <Route path="trang1" element={<Trang1 />} />
          <Route path="trang2" element={<Trang2 />} />

          {/* 🎯 SỬA: Chi tiết sản phẩm (Dành cho Người dùng) */}
          {/* Khi click vào sản phẩm sẽ link đến trang này */}
          <Route path="sanpham/:id" element={<Chitietsanpham />} />

          {/* <Route path="detail/:id" element={<ProductDetail />} /> */}

          {/* Trang Đăng nhập/Đăng xuất */}
          <Route path="login" element={<LoginPage />} />
          <Route path="logout" element={<LogoutPage />} />

          {/* ----------------------------------------------------------- */}
          {/* 🔒 ROUTES QUẢN TRỊ (CHỈ ADMIN ACCESS)                        */}
          {/* ----------------------------------------------------------- */}

          {/* Trang Danh sách sản phẩm Admin: /admin/products */}
          <Route
            path="admin/products"
            element={
              <ProtectedRoute>
                <ListProducts_SP_Admin />
              </ProtectedRoute>
            }
          />

          {/* 🎯 SỬA: Chỉnh sửa sản phẩm (Dành cho Admin) */}
          {/* Route này phải được bảo vệ và dùng cho chức năng chỉnh sửa */}
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
