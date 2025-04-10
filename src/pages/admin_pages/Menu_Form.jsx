import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

export default function Menu_Form() {
  const navigate = useNavigate();
  const { id } = useParams(); // Access name from the route
  const [token, setToken] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    category: "",
    quantity: 0,
    image: null,
  });
  const [isEditMode, setIsEditMode] = useState(false);

  // Handle change in form input values
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData((prevData) => ({
        ...prevData,
        image: files[0], // If the input type is file, save the selected file
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  // Fetch menu data for editing
  useEffect(() => {
    const token = Cookies.get("auth_token");
    if (!token) {
      navigate("/login");
    }
    setToken(token);

    if (id) {
      setIsEditMode(true);
      const fetchMenu = async () => {
        try {
          const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_KEY;
          const response = await axios.get(
            `${API_BASE_URL}/menus/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setFormData(response.data.data);
        } catch (error) {
          console.error("Error fetching menu data for editing", error);
        }
      };
      fetchMenu();
    }
  }, [navigate, id]);

  // Handle form submission (Add or Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object to send data with file
    const form = new FormData();
    form.append("name", formData.name);
    form.append("description", formData.description);
    form.append("price", parseFloat(formData.price));
    form.append("category", formData.category);
    form.append("quantity", parseInt(formData.quantity));
    form.append("image", formData.image);

    try {
      const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_KEY;
      const url = isEditMode
        ? `${API_BASE_URL}/menus/${id}` // PUT URL for editing
        : `${API_BASE_URL}/menus`; // POST URL for adding
      const method = isEditMode ? "put" : "post";

      const response = await axios[method](url, form, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(
        isEditMode ? "Menu updated successfully" : "Menu added successfully",
        response.data
      );
      navigate("/menus"); // Navigate to menus page after submission
    } catch (error) {
      console.error(
        isEditMode ? "Error updating menu" : "Error adding menu",
        error
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
              <div
                className={`nav-option `}
                onClick={() => navigate("/orders")}
              >
                <img
                  src="https://media.geeksforgeeks.org/wp-content/uploads/20221210182148/Untitled-design-(29).png"
                  className="nav-img"
                  alt="dashboard"
                />
                <h3>Orders Table</h3>
              </div>

              <div
                className={`nav-option active`}
                onClick={() => navigate("/menus")}
              >
                <img
                  src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183322/9.png"
                  className="nav-img"
                  alt="menus"
                />
                <h3>Menus Table</h3>
              </div>

              <div
                className="nav-option logout"
                onClick={() => {
                  Cookies.remove("auth_token");
                  navigate("/login");
                }}
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
              <h1 className="recent-Articles">
                {isEditMode ? "Edit Menu" : "Add New Menu"}
              </h1>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Description tidak boleh lebih dari 300 kata."
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select name="category" id="category" onChange={handleChange}>
                  <option value={""}>Pilih kategori</option>
                  <option value={"Mie"}>Mie</option>
                  <option value={"Bakso"}>Bakso</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="quantity">Quantity</label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="image">Image</label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                style={{
                  marginTop: "20px",
                  cursor: "pointer",
                  padding: "5px 10px",
                  marginRight: "10px",
                  backgroundColor: "blue",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                }}
              >
                {isEditMode ? "Update" : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>

      <script src="./index.js"></script>
    </div>
  );
}
