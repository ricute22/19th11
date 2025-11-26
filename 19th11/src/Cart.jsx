import React, { useEffect, useState } from "react";

const Cart = () => {
  const [cart, setCart] = useState([]);

  // Load giỏ hàng từ localStorage khi component mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // Hàm cập nhật tổng số lượng và dispatch event
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
    if (qty < 1) return; // tránh nhập số lượng < 1
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

    // Xóa giỏ hàng sau khi thanh toán
    setCart([]);
    localStorage.removeItem("cart");
    localStorage.setItem("cartCount", 0);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  if (cart.length === 0) {
    return <p style={{ padding: "20px" }}>Giỏ hàng của bạn đang trống.</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Giỏ hàng của bạn</h2>

      {cart.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            alignItems: "center",
            borderBottom: "1px solid #ccc",
            padding: "10px 0",
          }}
        >
          <img
            src={item.image}
            alt={item.title}
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
          <div style={{ marginLeft: "20px", flex: 1 }}>
            <h4>{item.title}</h4>
            <p style={{ color: "red", fontWeight: "bold" }}>
              {Number(item.price).toLocaleString()} VNĐ
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <input
                type="number"
                min="1"
                value={item.soluong}
                onChange={(e) =>
                  updateQuantity(item.id, Number(e.target.value))
                }
                style={{ width: "60px", padding: "4px" }}
              />
              <button
                onClick={() => removeItem(item.id)}
                style={{
                  background: "#dc3545",
                  color: "#fff",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      ))}

      <h3 style={{ marginTop: "20px" }}>
        Tổng tiền: {totalPrice.toLocaleString()} VNĐ
      </h3>

      <button
        onClick={handleCheckout}
        style={{
          marginTop: "15px",
          background: "#28a745",
          color: "#fff",
          border: "none",
          padding: "10px 20px",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "16px",
        }}
        onMouseEnter={(e) => (e.target.style.background = "#218838")}
        onMouseLeave={(e) => (e.target.style.background = "#28a745")}
      >
        Thanh toán
      </button>
    </div>
  );
};

export default Cart;
