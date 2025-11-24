import React, { useState, useEffect } from "react";

import "./Home.css";

// --- IMPORT CÁC ẢNH BANNER (Giữ nguyên) ---
import baner1 from "./assets/images/baner1.png";
import baner2 from "./assets/images/baner2.png";
import baner3 from "./assets/images/baner3.png";
// ----------------------------------------------------

// --- IMPORT CÁC ẢNH SẢN PHẨM NỔI BẬT (Giữ nguyên) ---
import ao from "./assets/images/ao.jpg";
import quan from "./assets/images/quan.jpg";
import vay from "./assets/images/vay.jpg";
// ----------------------------------------------------

const banners = [baner1, baner2, baner3];

const products = [
  {
    id: 1,
    name: "Áo Polo Basic",
    image: ao,
    description:
      "Thiết kế tối giản, chất liệu Cotton Pima cao cấp, thoáng mát.",
  },
  {
    id: 2,
    name: "Quần Jeans Slim Fit",
    image: quan,
    description: "Form ống đứng ôm nhẹ, chất liệu denim co giãn thoải mái.",
  },
  {
    id: 3,
    name: "Váy Maxi Lụa",
    image: vay,
    description: "Thiết kế dài thướt tha, chất liệu lụa mềm mại, sang trọng.",
  },
];

const SLIDE_INTERVAL = 3000;

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Logic chuyển slide tự động
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === banners.length - 1 ? 0 : prevSlide + 1
      );
    }, SLIDE_INTERVAL);

    return () => clearInterval(slideTimer);
  }, []);

  // Khôi phục logic cho nút bấm:
  const nextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === banners.length - 1 ? 0 : prevSlide + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? banners.length - 1 : prevSlide - 1
    );
  };

  const transformStyle = {
    transform: `translateX(-${currentSlide * 100}%)`,
  };

  return (
    <div className="home-container">
      {/* --- SLIDESHOW (BANNER) --- */}
      <div className="slider">
        <button className="slide-btn prev-btn" onClick={prevSlide}>
          &lt;
        </button>

        <div className="slides" style={transformStyle}>
          {banners.map((bannerSrc, index) => (
            <img key={index} src={bannerSrc} alt={`Banner ${index + 1}`} />
          ))}
        </div>

        <button className="slide-btn next-btn" onClick={nextSlide}>
          &gt;
        </button>
      </div>
      {/* --------------------------- */}

      {/* 👕 SẢN PHẨM NỔI BẬT */}
      <section className="products-section">
        <h2>**Sản Phẩm Nổi Bật**</h2>

        <div className="product-cards">
          {products.map((product) => (
            <div key={product.id} className="card">
              <div className="product-image-wrapper">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
              </div>

              <h3>{product.name}</h3>

              <p>{product.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ======================================= */}
      {/* 🦶 FOOTER (VỀ CHÚNG TÔI) - SỬ DỤNG UNICODE/EMOJI */}
      {/* ======================================= */}

      <footer className="main-footer">
        <div className="footer-content">
          {/* Cột 1: Thông tin liên hệ và Cửa hàng */}
          <div className="footer-col contact-info">
            <h3 className="store-name">BC STORE</h3>

            {/* Thay thế icon headset bằng 📞 (Telephone Receiver) */}
            <p className="contact-item">
              <span role="img" aria-label="phone">
                📞
              </span>{" "}
              02866804333
            </p>

            {/* Thay thế icon paper-plane bằng ✉️ (Envelope) */}
            <p className="contact-item">
              <span role="img" aria-label="email">
                ✉️
              </span>{" "}
              bcstoresaigon@gmail.com
            </p>

            {/* Thay thế icon store bằng 📍 (Round Pushpin - Vị trí) */}
            <p className="contact-item address-item">
              <span role="img" aria-label="location">
                📍
              </span>{" "}
              58 Hồ Văn Huê, Phường 9, Quận Phú Nhuận
            </p>

            <p className="register-info">
              MST: 41P802615 - NGÀY CẤP: MST: 18/07/2020
            </p>
          </div>

          {/* Cột 2: Dịch vụ và Chính sách (Giữ nguyên) */}
          <div className="footer-col policies">
            <h3>DỊCH VỤ VÀ CHÍNH SÁCH</h3>

            <ul>
              <li>
                <a href="#search">Tìm kiếm</a>
              </li>

              <li>
                <a href="#intro">Giới thiệu</a>
              </li>

              <li>
                <a href="#products">Sản phẩm</a>
              </li>

              <li>
                <a href="#service-terms">Điều khoản dịch vụ</a>
              </li>

              <li>
                <a href="#exchange-policy">Chính sách đổi trả</a>
              </li>

              <li>
                <a href="#security-policy">Chính sách bảo mật</a>
              </li>

              <li>
                <a href="#payment-policy">Chính sách thanh toán</a>
              </li>

              <li>
                <a href="#ship-policy">
                  Chính sách vận chuyển và kiểm tra đơn hàng
                </a>
              </li>

              <li>
                <a href="#voucher">E-Voucher</a>
              </li>
            </ul>
          </div>

          {/* Cột 3: Liên kết mạng xã hội, Đăng ký nhận tin & Chứng nhận */}
          <div className="footer-col social-newsletter">
            <h3 className="social-heading">LIKE BC SG TRÊN MẠNG XÃ HỘI</h3>

            <div className="social-links">
              {/* Thay thế icon Facebook bằng 📘 (Blue Book) hoặc 🌐 (Globe) - Chọn 🌐 */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <span role="img" aria-label="facebook">
                  🌐
                </span>
              </a>

              {/* Thay thế icon Instagram bằng ✨ (Sparkles) hoặc 📸 (Camera) - Chọn 📸 */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <span role="img" aria-label="instagram">
                  📸
                </span>
              </a>
            </div>

            <h3 className="newsletter-heading">ĐĂNG KÝ NHẬN THÔNG TIN MỚI</h3>

            <div className="newsletter-form">
              <input
                type="email"
                placeholder="Nhập email của bạn..."
                aria-label="Email đăng ký nhận tin"
              />

              <button className="register-btn">ĐĂNG KÝ</button>
            </div>

            {/* Logo/Badge "Đã thông báo Bộ Công Thương" - Dùng placeholder image */}
            <div className="bct-badge">
              <img
                src="https://placehold.co/150x50/0000FF/FFFFFF?text=DA+THONG+BAO+BCT"
                alt="Đã thông báo Bộ Công Thương"
              />
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>Copyrights © 2024 by BCstore. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
