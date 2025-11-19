import React from "react";
import "./Home.css"; // File CSS riêng cho trang Home

const Home = () => {
  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Chào mừng bạn đến với Trang Chủ</h1>
          <p>
            Khám phá sự thanh lịch và hiện đại với giao diện pastel của chúng
            tôi.
          </p>
          <button className="cta-button">Tìm hiểu thêm</button>
        </div>
      </section>

      <section className="features-section">
        <h2>Các tính năng nổi bật</h2>
        <div className="feature-cards">
          <div className="card">
            <h3>Thiết kế đẹp mắt</h3>
            <p>Giao diện được thiết kế tinh tế với gam màu pastel dịu nhẹ.</p>
          </div>
          <div className="card">
            <h3>Dễ sử dụng</h3>
            <p>Tối ưu hóa trải nghiệm người dùng, giúp bạn dễ dàng thao tác.</p>
          </div>
          <div className="card">
            <h3>Hiệu suất cao</h3>
            <p>Ứng dụng chạy mượt mà, tải nhanh chóng trên mọi thiết bị.</p>
          </div>
        </div>
      </section>

      <section className="about-section">
        <h2>Về chúng tôi</h2>
        <p>
          Chúng tôi luôn nỗ lực mang đến những giải pháp công nghệ tốt nhất, với
          sự chú trọng vào trải nghiệm người dùng và thiết kế.
        </p>
      </section>
    </div>
  );
};

export default Home;
