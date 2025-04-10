import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

export default function View_Order() {
  const [orderData, setOrderData] = useState();
  const [paymentMethod, setPaymentMethod] = useState();
  const navigate = useNavigate();
  const { id } = useParams();
  const token = Cookies.get("auth_token");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_KEY;
        const response = await axios.get(`${API_BASE_URL}/orders/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrderData(response.data.data);
        setPaymentMethod(response.data.data.paymentMethod);
      } catch (error) {
        console.log("Error while fetching order data", error);
      }
    };
    fetchOrder();
  }, [id, token]);

  // Handle logout
  const handleLogout = () => {
    Cookies.remove("auth_token"); 
    navigate("/login"); 
  };

  const handlePaymentMethodChange = (e) => {
    const { name, value } = e.target;
    setOrderData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleComplete = async () => {
    const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_KEY;

    if (orderData.paymentMethod === "Unsettled") {
      return alert(`Payment method cannot be ${orderData.paymentMethod}`);
    }
    await axios.patch(
      `${API_BASE_URL}/orders/${id}`,
      {
        status: "completed",
        paymentMethod: `${orderData.paymentMethod}`,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    alert("Order Completed");
    window.location.reload();
    try {
    } catch (error) {
      console.log(error);
      alert(
        "Something went wrong when completing task, please reload the page and try again."
      );
    }
  };
  return (
    <div id="admin">
      <header>
        <div className="logosec">
          <div className="logo">ADMIN PANEL</div>
        </div>
      </header>

      <div className="main-container">
        <div className="navcontainer">
          <nav className="nav">
            <div className="nav-upper-options">
              {/* Active class for navigation */}
              <div
                className={`nav-option ${
                  window.location.pathname === "/orders" ? "active" : ""
                }`}
                onClick={() => navigate("/orders")}
              >
                <img
                  src="https://media.geeksforgeeks.org/wp-content/uploads/20221210182148/Untitled-design-(29).png"
                  className="nav-img"
                  alt="dashboard"
                />
                <h3>Orders Tabel</h3>
              </div>

              <div
                className={`nav-option ${
                  window.location.pathname === "/menus" ? "active" : ""
                }`}
                onClick={() => navigate("/menus")}
              >
                <img
                  src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183322/9.png"
                  className="nav-img"
                  alt="menus"
                />
                <h3>Menus Tabel</h3>
              </div>

              <div className="nav-option logout" onClick={handleLogout}>
                <img
                  src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183321/7.png"
                  className="nav-img"
                  alt="logout"
                />
                <h3>Logout</h3>
              </div>
            </div>
          </nav>
        </div>
        <div className="main">
          <div className="report-container">
            <div className="report-header">
              <h1 className="recent-Articles">View Order</h1>
            </div>

            <div className="form-group">
              <label htmlFor="name">Nama pembeli: </label>
              <input
                type="text"
                value={orderData ? orderData.customer : "Loading"}
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="name">Status: </label>
              <input
                type="text"
                value={orderData ? orderData.status : "Loading"}
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="name">Daftar belanjaan: </label>
              <div className="order-items">
                {orderData?.items?.map((item, index) => (
                  <div key={index} className="item">
                    <img
                      style={{ width: "100px", height: "100px" }}
                      src={item.image}
                      alt={item.name}
                      className="item-image"
                    />
                    <div className="item-details">
                      <p>Name: {item.name}</p>
                      <p>
                        Price: Rp{" "}
                        {item.price
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                      </p>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                    <br />
                  </div>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="total">Total: </label>
              <input
                type="text"
                value={
                  orderData
                    ? `Rp ${orderData.total
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`
                    : "Loading"
                }
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="paymentMethod">Payment Method:</label>
              {paymentMethod == "Unsettled" ? (
                <>
                  <select
                    name="paymentMethod"
                    id="category"
                    onChange={handlePaymentMethodChange}
                  >
                    <option value={""}>Pilih Metode Pembayaran</option>
                    <option value={"qris"}>Qris</option>
                    <option value={"cash"}>Cash</option>
                  </select>
                </>
              ) : (
                <input
                  type="text"
                  value={paymentMethod ? paymentMethod : "Loading"}
                  disabled
                />
              )}
            </div>
            {paymentMethod == "Unsettled" ? (
              <button
                type="submit"
                onClick={handleComplete}
                style={{
                  marginTop: "20px",
                  cursor: "pointer",
                  padding: "5px 10px",
                  marginRight: "10px",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                }}
              >
                Complete Order
              </button>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>

      <script src="./index.js"></script>
    </div>
  );
}
