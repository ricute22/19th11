import "./assets/css/main.css";
import logoBC from "./assets/images/logo.png";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Layout = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // 🛒 Số lượng sản phẩm trong giỏ
  const [cartCount, setCartCount] = useState(
    parseInt(localStorage.getItem("cartCount")) || 0
  );

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const handleSearch = () => {
    console.log("Tìm kiếm với từ khóa:", searchTerm);
  };

  return (
    <html>
      <header>
        <div id="divheader" class="header1">
          <div id="banner" class="banner1">
            <div
              id="topleft"
              style={{
                display: "flex",
                alignItems: "center",
                paddingLeft: "20px",
              }}
            >
              <img
                src={logoBC}
                alt="Logo BC"
                style={{ height: "80px", marginRight: "20px" }}
              />

              {/* MENU TRANG CHỦ + QUẢN TRỊ */}
              <ul
                class="ul1"
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: 0,
                  padding: 0,
                }}
              >
                <li>
                  <a href="/">TRANG CHỦ</a>
                </li>

                {user && (
                  <li>
                    <a href="/products">QUẢN TRỊ</a>
                  </li>
                )}
              </ul>
            </div>

            {/* THANH TÌM KIẾM */}
            <div
              id="divtimkiem"
              style={{ display: "flex", alignItems: "center", width: "auto" }}
            >
              <input
                type="text"
                placeholder="Tìm kiếm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  padding: "8px 12px",
                  border: "1px solid #ccc",
                  borderRadius: "20px",
                  outline: "none",
                  fontSize: "16px",
                  width: "250px",
                }}
              />
              <button
                onClick={handleSearch}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  marginLeft: "-35px",
                  fontSize: "20px",
                  color: "#555",
                }}
              >
                &#x1F50D;
              </button>
            </div>
          </div>

          {/* ================================
                MENU CHÍNH + SUBMENU SẢN PHẨM
              ================================= */}
          <div id="menubar" className="menubar">
            <div className="menubar-left">
              {/* SẢN PHẨM + SUBMENU */}
              <div className="menu-item dropdown">
                <a className="menu-link">SẢN PHẨM ▼</a>

                <div className="dropdown-content">
                  <a href="/san-pham/quan">Quần</a>
                  <a href="/san-pham/ao">Áo</a>
                  <a href="/san-pham/giay">Giày</a>
                </div>
              </div>

              <a href="/lien-he" className="menu-item">
                LIÊN HỆ
              </a>
            </div>

            <div className="menubar-right">
              {/* 🛒 ICON GIỎ HÀNG */}
              <div
                style={{
                  marginRight: "20px",
                  position: "relative",
                  cursor: "pointer",
                }}
                onClick={() => navigate("/cart")}
              >
                <span style={{ fontSize: "28px" }}>🛒</span>

                {/* Đếm số lượng */}
                <span
                  style={{
                    position: "absolute",
                    top: "-8px",
                    right: "-8px",
                    background: "red",
                    color: "white",
                    borderRadius: "50%",
                    padding: "2px 7px",
                    fontSize: "12px",
                  }}
                >
                  {cartCount}
                </span>
              </div>

              {user ? (
                <>
                  <span className="username">👤 {user.username}</span>
                  <button className="logout-btn" onClick={handleLogout}>
                    Đăng xuất
                  </button>
                </>
              ) : (
                <a href="/login" className="login-link">
                  Đăng nhập
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

      <body>
        <div id="container" class="container">
          <Outlet />
        </div>
      </body>

      <footer></footer>
    </html>
  );
};

export default Layout;
