import "./assets/css/main.css";
import logoBC from "./assets/images/logo.png"; // THAY TÊN FILE LOGO TẠI ĐÂY
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Layout = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(""); // State để quản lý giá trị input tìm kiếm

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const handleSearch = () => {
    // Xử lý logic tìm kiếm tại đây, ví dụ: navigate(`/search?q=${searchTerm}`);
    console.log("Tìm kiếm với từ khóa:", searchTerm);
    // Bạn có thể thêm navigate đến trang kết quả tìm kiếm ở đây
  };

  return (
    <html>
      <header>
        <div id="divheader" class="header1">
          <div id="banner" class="banner1">
            {/* ĐÃ SỬA: THÊM paddingLeft ĐỂ LOGO CÁCH MÉP TRÁI */}
            <div
              id="topleft"
              style={{
                display: "flex",
                alignItems: "center",
                paddingLeft: "20px", // THÊM KHOẢNG CÁCH RA 20PX
              }}
            >
              {/* LOGO ĐÃ ĐƯỢC LÀM TO HƠN */}
              <img
                src={logoBC}
                alt="Logo BC"
                style={{ height: "80px", marginRight: "20px" }} // Tăng chiều cao logo
              />
              <ul
                class="ul1"
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: 0,
                  padding: 0,
                }}
              >
                {/* ĐÃ CẬP NHẬT MENU ĐIỀU HƯỚNG */}
                <li>
                  <a href="/">TRANG CHỦ</a>
                </li>
                {/* HIỂN THỊ SẢN PHẨM CHỈ KHI ĐÃ ĐĂNG NHẬP */}
                {user && (
                  <li>
                    <a href="/products">QUẢN TRỊ</a>
                  </li>
                )}
              </ul>
            </div>

            <div id="logo" class="logo1">
              {/* Đã bỏ logo cũ */}
            </div>

            {/* PHẦN TÌM KIẾM ĐÃ ĐƯỢC THAY BẰNG THANH TÌM KIẾM CÓ ICON */}
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
                  borderRadius: "20px", // Bo tròn góc
                  outline: "none",
                  fontSize: "16px",
                  width: "250px", // Độ rộng của thanh tìm kiếm
                }}
              />
              <button
                onClick={handleSearch}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  marginLeft: "-35px", // Di chuyển icon vào trong input
                  fontSize: "20px",
                  color: "#555",
                }}
              >
                &#x1F50D; {/* Icon kính lúp */}
              </button>
            </div>
            {/* KẾT THÚC PHẦN SỬA ĐỔI THANH TÌM KIẾM */}
          </div>
          <div id="menubar" className="menubar">
            <div className="menubar-left">
              <a href="/menu1" className="menu-item">
                Menu 1
              </a>
              <a href="/menu2" className="menu-item">
                Menu 2
              </a>
              <a href="/menu3" className="menu-item">
                Menu 3
              </a>
            </div>

            <div className="menubar-right">
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
