import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImages, setMainImages] = useState([]);
  const [mainIndex, setMainIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [hoverBack, setHoverBack] = useState(false);
  const [hoverCart, setHoverCart] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lấy thông tin sản phẩm
        const { data: productData, error: productError } = await supabase
          .from("product1")
          .select("*")
          .eq("id", id)
          .single();
        if (productError) throw productError;

        // Lấy bảng chi tiết — dùng maybeSingle để KHÔNG bị lỗi khi không có dữ liệu
        const { data: detailData, error: detailError } = await supabase
          .from("product_detail")
          .select("*")
          .eq("product_id", id)
          .maybeSingle();

        if (detailError)
          console.warn(
            "⚠ Không có dữ liệu chi tiết cho sản phẩm:",
            detailError
          );

        setProduct(productData);
        setDetail(detailData || null);

        // Xử lý hình ảnh
        const images = detailData?.images
          ? JSON.parse(detailData.images)
          : [productData.image];

        setMainImages(images);
        setMainIndex(0);
        setLoading(false);
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu:", err.message);
      }
    };

    fetchData();
  }, [id]);

  // Loading
  if (loading)
    return (
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        Đang tải thông tin sản phẩm...
      </div>
    );

  // Không có sản phẩm
  if (!product)
    return (
      <h2 style={{ textAlign: "center", marginTop: "40px" }}>
        ❌ Không tìm thấy sản phẩm
      </h2>
    );

  // Thêm vào giỏ hàng
  const addToCart = (sp) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const exist = cart.find((item) => item.id === sp.id);
    if (exist) exist.soluong += 1;
    else cart.push({ ...sp, soluong: 1 });

    localStorage.setItem("cart", JSON.stringify(cart));
    const total = cart.reduce((sum, item) => sum + item.soluong, 0);
    localStorage.setItem("cartCount", total);
    window.dispatchEvent(new Event("cartUpdated"));
    alert(`🛒 Đã thêm vào giỏ hàng! Tổng: ${total} sản phẩm`);
  };

  // Chuyển ảnh
  const changeImage = (index) => {
    setFade(false);
    setTimeout(() => {
      setMainIndex(index);
      setFade(true);
    }, 200);
  };

  const prevImage = () =>
    changeImage((mainIndex - 1 + mainImages.length) % mainImages.length);

  const nextImage = () => changeImage((mainIndex + 1) % mainImages.length);

  // STYLE
  const containerStyle = {
    maxWidth: "900px",
    margin: "30px auto",
    padding: "20px",
    border: "1px solid #eee",
    borderRadius: "12px",
    backgroundColor: "#fff",
    boxShadow: "0 6px 25px rgba(0,0,0,0.08)",
    fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
  };

  const backBtnStyle = {
    backgroundColor: "transparent",
    color: hoverBack ? "#ff7eb9" : "#ffb6c1",
    border: "1px solid #ffb6c1",
    padding: "10px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    marginBottom: "20px",
    transition: "0.3s",
  };

  const cartBtnStyle = {
    backgroundColor: hoverCart ? "#81ecec" : "#b0f2ff",
    color: hoverCart ? "#006d77" : "#0096c7",
    border: "none",
    padding: "12px 18px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "25px",
    transition: "0.3s",
  };

  const mainImageStyle = {
    width: "100%",
    borderRadius: "12px",
    transition: "opacity 0.3s ease-in-out",
    opacity: fade ? 1 : 0,
  };

  const navBtnStyle = {
    backgroundColor: "transparent",
    border: "1px solid #ccc",
    color: "#555",
    fontSize: "22px",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "0.3s",
  };

  return (
    <div style={containerStyle}>
      {/* Nút quay lại */}
      <button
        style={backBtnStyle}
        onMouseEnter={() => setHoverBack(true)}
        onMouseLeave={() => setHoverBack(false)}
        onClick={() => navigate(-1)}
      >
        ← Quay lại
      </button>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "30px" }}>
        {/* Ảnh sản phẩm */}
        <div
          style={{
            flex: "1 1 320px",
            maxWidth: "400px",
            background: "#fef9f9",
            borderRadius: "12px",
            padding: "10px",
            textAlign: "center",
            position: "relative",
          }}
        >
          <img
            src={mainImages[mainIndex]}
            alt={product.title}
            style={mainImageStyle}
          />

          {/* Điều hướng ảnh nếu có nhiều */}
          {mainImages.length > 1 && (
            <>
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: 0,
                  right: 0,
                  display: "flex",
                  justifyContent: "space-between",
                  transform: "translateY(-50%)",
                  padding: "0 10px",
                }}
              >
                <button style={navBtnStyle} onClick={prevImage}>
                  ◀
                </button>
                <button style={navBtnStyle} onClick={nextImage}>
                  ▶
                </button>
              </div>

              {/* Thumbnail */}
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  marginTop: "10px",
                }}
              >
                {mainImages.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt="thumb"
                    onClick={() => changeImage(index)}
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      cursor: "pointer",
                      border:
                        mainIndex === index
                          ? "2px solid #a5d6a7"
                          : "1px solid #ddd",
                      transition: "0.3s",
                    }}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Thông tin sản phẩm */}
        <div style={{ flex: "1 1 300px" }}>
          <h2>{product.title}</h2>
          <p
            style={{
              fontSize: "1.4rem",
              color: "#e07b91",
              fontWeight: "bold",
            }}
          >
            {Number(product.price).toLocaleString()} VNĐ
          </p>

          {product.rating_rate && (
            <p style={{ marginTop: "10px", color: "#555" }}>
              ⭐ {product.rating_rate} ({product.rating_count} đánh giá)
            </p>
          )}

          <p style={{ marginTop: "20px", lineHeight: "1.6", color: "#333" }}>
            {product.description || "Chưa có mô tả ngắn."}
          </p>

          {/* Nội dung chi tiết */}
          {detail?.content ? (
            <p
              style={{
                marginTop: "20px",
                color: "#444",
                lineHeight: "1.7",
                whiteSpace: "pre-line",
              }}
            >
              {detail.content}
            </p>
          ) : (
            <p
              style={{ marginTop: "20px", fontStyle: "italic", color: "#666" }}
            >
              Không có thông tin chi tiết cho sản phẩm này.
            </p>
          )}

          <button
            style={cartBtnStyle}
            onMouseEnter={() => setHoverCart(true)}
            onMouseLeave={() => setHoverCart(false)}
            onClick={() => addToCart(product)}
          >
            🛒 Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
