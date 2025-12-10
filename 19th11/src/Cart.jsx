import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const updateCartCount = (updatedCart) => {
    const total = updatedCart.reduce((sum, item) => sum + item.soluong, 0);
    localStorage.setItem("cartCount", total);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    updateCartCount(updatedCart);
  };

  const updateQuantity = (id, qty) => {
    if (qty < 1) return;
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, soluong: qty } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    updateCartCount(updatedCart);
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.soluong,
    0
  );

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Giỏ hàng đang trống!");
      return;
    }
    alert(
      `🛒 Tổng tiền thanh toán: ${totalPrice.toLocaleString()} VNĐ\nCảm ơn bạn đã mua hàng!`
    );
    setCart([]);
    localStorage.removeItem("cart");
    localStorage.setItem("cartCount", 0);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const btnStyle = {
    border: "none",
    borderRadius: "8px",
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "0.3s"
  };

  if (cart.length === 0) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <p style={{ fontSize: "18px", color: "#555" }}>Giỏ hàng của bạn đang trống.</p>
        <button
          onClick={() => navigate("/sanpham")}
          style={{
            ...btnStyle,
            backgroundColor: "#ffd6e0",
            color: "#ff4d6d",
            marginTop: "15px"
          }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = "#ffb6c1"}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = "#ffd6e0"}
        >
          ← Tiếp tục mua sắm
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto", fontFamily: "Segoe UI, sans-serif" }}>
      <h2 style={{ marginBottom: "20px", color: "#333" }}>Giỏ hàng của bạn</h2>
      {cart.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            alignItems: "center",
            background: "#f9f7ff",
            padding: "12px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            marginBottom: "15px"
          }}
        >
          <img
            src={item.image}
            alt={item.title}
            style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "8px" }}
          />
          <div style={{ marginLeft: "20px", flex: 1 }}>
            <h4 style={{ marginBottom: "8px", color: "#333" }}>{item.title}</h4>
            <p style={{ color: "#e07b91", fontWeight: "bold", marginBottom: "8px" }}>
              {Number(item.price).toLocaleString()} VNĐ
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <input
                type="number"
                min="1"
                value={item.soluong}
                onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                style={{
                  width: "60px",
                  padding: "6px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                  textAlign: "center"
                }}
              />
              <button
                onClick={() => removeItem(item.id)}
                style={{
                  ...btnStyle,
                  backgroundColor: "#ffb6b9",
                  color: "#fff"
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = "#ff6b81"}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = "#ffb6b9"}
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      ))}

      <h3 style={{ marginTop: "20px", color: "#333" }}>
        Tổng tiền: {totalPrice.toLocaleString()} VNĐ
      </h3>

      <div style={{ marginTop: "20px", display: "flex", gap: "15px", flexWrap: "wrap" }}>
        <button
          onClick={handleCheckout}
          style={{
            ...btnStyle,
            backgroundColor: "#a0e7e5",
            color: "#056676"
          }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = "#70d6d3"}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = "#a0e7e5"}
        >
          Thanh toán
        </button>

        <button
          onClick={() => navigate("/sanpham")}
          style={{
            ...btnStyle,
            backgroundColor: "#ffd6e0",
            color: "#ff4d6d"
          }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = "#ffb6c1"}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = "#ffd6e0"}
        >
          ← Tiếp tục mua sắm
        </button>
      </div>
    </div>
  );
};

export default Cart;
