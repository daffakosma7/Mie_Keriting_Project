import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

export default function Orders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(""); // Track errors

  // Check for token when the component mounts and redirect if no token
  useEffect(() => {
    const token = Cookies.get("auth_token");

    if (!token) {
      // If there's no token, redirect to login page
      navigate("/login");
    } else {
      // If the token exists, fetch the orders
      const fetchOrders = async () => {
        try {
          // Replace with your actual API URL
          const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_KEY;
          const response = await axios.get(`${API_BASE_URL}/orders`, {
            headers: {
              Authorization: `Bearer ${token}`, // Attach the token in Authorization header
            },
          });
          setOrders(response.data.data.orders); // Update the orders state with fetched data
        } catch (err) {
          setError("Failed to fetch orders");
          console.error(err);
        } finally {
          setLoading(false); // Stop loading after API call completes
        }
      };

      fetchOrders();
    }
  }, [navigate]); // The empty dependency array ensures this runs only once when the component mounts
  console.log(orders);
  // Handle Action
  const handleAction = async (code) => {
    const token = Cookies.get("auth_token"); // Get the token again in case it's needed

    try {
      const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_KEY;

      const response = await axios.patch(
        `${API_BASE_URL}/orders/${code}`, // The URL
        {
          status: "completed", // Request body (data to be sent)
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Correctly setting headers
          },
        }
      );

      console.log(response);
      window.location.reload(); // Reload the page after the update
    } catch (err) {
      alert("Error while changing order status");
      console.error(err);
    }
  };

  const handleView = async (code) => {
    navigate(`/vieworder/${code}`);
  };
  // Handle logout
  const handleLogout = () => {
    Cookies.remove("auth_token"); // Correct cookie removal
    navigate("/login"); // Redirect to login page after logout
  };

  if (loading) {
    return <div>Loading orders...</div>; // Loading state
  }

  if (error) {
    return <div>{error}</div>; // Error state
  }

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
                <h3>Menus Table</h3>
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
              <h1 className="recent-Articles">Recent Orders</h1>
            </div>

            <table>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Customer Name</th>
                  <th>Transaction Code</th>
                  <th>Total Price</th>
                  <th>Payment Method</th>
                  <th>Order Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{order.customer_name}</td>
                    <td>{order.transaction_code}</td>
                    <td>
                      Rp{" "}
                      {order.total_price
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                    </td>
                    <td>{order.payment_method}</td>
                    <td>
                      <button
                        className="button-remove"
                        style={{
                          cursor: "default",
                          padding: "5px 10px",
                          marginRight: "10px",
                          backgroundColor:
                            order.order_status === "Pending"
                              ? "#F7CB73"
                              : "#4CAF50", // Green color for "Completed"
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                        }}
                      >
                        {order.order_status === "Pending"
                          ? "Pending"
                          : "Completed"}
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => handleView(order.transaction_code)} // Pass order ID to handleAction
                        className="button-remove"
                        style={{
                          cursor: "pointer",
                          padding: "5px 10px",
                          marginRight: "10px",
                          backgroundColor: "blue",
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                        }}
                      >
                        View Order
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <script src="./index.js"></script>
    </div>
  );
}
