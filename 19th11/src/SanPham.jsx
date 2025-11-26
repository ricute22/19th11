import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

const SanPham = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load sản phẩm từ Supabase
  const loadProducts = async () => {
    const { data, error } = await supabase
      .from("product1")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.log("Lỗi Supabase:", error.message);
    } else {
      setProducts(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Hàm thêm vào giỏ hàng
  const addToCart = (sp) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const exist = cart.find((item) => item.id === sp.id);

    if (exist) {
      exist.soluong += 1;
    } else {
      cart.push({ ...sp, soluong: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    // Cập nhật tổng số lượng sản phẩm trong icon giỏ hàng
    const total = cart.reduce((sum, item) => sum + item.soluong, 0);
    localStorage.setItem("cartCount", total);

    // 🔔 Phát event để Layout lắng nghe
    window.dispatchEvent(new Event("cartUpdated"));

    alert("🛒 Đã thêm vào giỏ hàng!");
  };

  if (loading) return <p>Đang tải sản phẩm...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "40px" }}>
        Danh sách sản phẩm
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "50px 20px",
          marginTop: "10px",
        }}
      >
        {products.map((sp) => (
          <div
            key={sp.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "12px",
              padding: "15px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              transition: "transform 0.3s, box-shadow 0.3s",
              height: "100%",
              background: "#fff",
            }}
            className="sanpham-card"
          >
            <div
              style={{
                width: "100%",
                height: "220px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
                marginBottom: "10px",
              }}
            >
              <img
                src={sp.image}
                alt={sp.title}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                  borderRadius: "8px",
                  transition: "transform 0.3s",
                }}
                className="sanpham-img"
              />
            </div>
            <h3
              style={{
                marginTop: "10px",
                textAlign: "center",
                minHeight: "50px",
              }}
            >
              {sp.title}
            </h3>
            <p
              style={{
                color: "red",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              {Number(sp.price).toLocaleString()} VNĐ
            </p>
            <button
              onClick={() => addToCart(sp)}
              style={{
                background: "#007bff",
                color: "#fff",
                padding: "8px 14px",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "#0056b3";
                e.target.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "#007bff";
                e.target.style.transform = "scale(1)";
              }}
            >
              + Thêm giỏ hàng
            </button>
          </div>
        ))}
      </div>

      <style>{`
        .sanpham-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.2);
        }
        .sanpham-img:hover {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
};

export default SanPham;
