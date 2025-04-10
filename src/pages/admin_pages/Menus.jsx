import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import useProducts from "../../hooks/useProducts";
import Cookies from "js-cookie";

export default function Menus() {
  const navigate = useNavigate();
  const [token, setToken] = useState();
  const products = useProducts(false);

  // Check if the user is authenticated (has a valid token)
  useEffect(() => {
    const token = Cookies.get("auth_token");

    if (!token) {
      // If there's no token, redirect to login page

      navigate("/login");
    }
    setToken(token);
  }, [navigate]); // Empty dependency array means this runs once on mount

  // Edit handler - Navigate to the Edit page
  const handleEdit = (name) => {
    navigate(`/menuform/${name}`);
  };

  const handleRemove = async (name) => {
    const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_KEY;

    try {
      // Send delete request to the API
      const response = await axios.delete(`${API_BASE_URL}/menus/${name}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Log response for debugging
      console.log("Menu removed successfully", response.data);

      window.location.reload();
    } catch (error) {
      console.error("Error removing menu", error);
      alert("Failed to delete the menu. Please try again.");
    }
  };

  // Logout handler
  const handleLogout = () => {
    // Remove the auth token from cookies
    Cookies.remove("auth_token"); // Assuming the cookie's name is "auth_token"
    // Redirect to login page
    navigate("/login");
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
              <div className={`nav-option`} onClick={() => navigate("/orders")}>
                <img
                  src="https://media.geeksforgeeks.org/wp-content/uploads/20221210182148/Untitled-design-(29).png"
                  className="nav-img"
                  alt="dashboard"
                />
                <h3>Orders Tabel</h3>
              </div>

              <div
                className={`nav-option active`} // Add conditional className
                onClick={() => navigate("/menus")}
              >
                <img
                  src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183322/9.png"
                  className="nav-img"
                  alt="articles"
                />
                <h3>Menus Tabel</h3>
              </div>

              <div
                className="nav-option logout"
                onClick={handleLogout} // Logout action when clicked
              >
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
              <h1 className="recent-Articles">All Menus</h1>
              <button
                style={{
                  cursor: "pointer",
                  padding: "5px 10px",
                  marginRight: "10px",
                  backgroundColor: "blue", // Green color for edit
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                }}
                onClick={() => {
                  navigate("/menuform");
                }}
              >
                Add Menu
              </button>
            </div>

            <table>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Menu</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Category</th>
                  <th>Image</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((item, index) => (
                  <tr key={index}>
                    <td className="t-op-nextlvl">{index + 1}</td>
                    <td className="t-op-nextlvl">{item.name}</td>
                    <td className="t-op-nextlvl">
                      Rp{" "}
                      {item.price
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                    </td>
                    <td className="t-op-nextlvl">{item.quantity || "N/A"}</td>
                    <td className="t-op-nextlvl">
                      {item.category || "Uncategorized"}
                    </td>
                    <td className="t-op-nextlvl">
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ width: "100px", height: "100px" }}
                      />
                    </td>
                    <td>
                      {/* Edit Button */}
                      <button
                        onClick={() => handleEdit(item.name.toLowerCase())} // Pass item ID to handleEdit
                        style={{
                          
                          cursor: "pointer",
                          padding: "5px 10px",
                          marginRight: "10px",
                          backgroundColor: "#4CAF50", // Green color for edit
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                        }}
                      >
                        Edit
                      </button>

                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemove(item.name.toLowerCase())} // Pass item ID to handleRemove
                        style={{
                          cursor: "pointer",
                          padding: "5px 10px",
                          backgroundColor: "#f44336", // Red color for remove
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                        }}
                      >
                        Remove
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
