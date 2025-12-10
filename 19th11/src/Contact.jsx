import { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("📩 Đã gửi thông tin liên hệ!");

    // Reset form sau khi gửi
    setForm({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f9f9f9",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "450px",
          background: "#fff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          textAlign: "left",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          📞 Liên Hệ
        </h2>

        <form onSubmit={handleSubmit}>
          <label>Họ và tên</label>
          <input
            type="text"
            name="name"
            placeholder="Nhập họ tên..."
            value={form.name}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "5px",
              marginBottom: "15px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              fontSize: "15px",
            }}
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Nhập email..."
            value={form.email}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "5px",
              marginBottom: "15px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              fontSize: "15px",
            }}
          />

          <label>Nội dung</label>
          <textarea
            name="message"
            placeholder="Nhập nội dung liên hệ..."
            rows="5"
            value={form.message}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "5px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              fontSize: "15px",
            }}
          ></textarea>

          <button
            type="submit"
            style={{
              marginTop: "15px",
              width: "100%",
              background: "#2b7cff",
              color: "#fff",
              padding: "10px",
              border: "none",
              borderRadius: "6px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Gửi liên hệ
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
