import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false); // Track loading state
  const [error, setError] = useState(""); // Track error messages
  const navigate = useNavigate(); // Use React Router's navigate function

  // UseEffect to check if the user is already logged in
  useEffect(() => {
    // Check if there's a valid token in the cookies
    const token = Cookies.get("auth_token");

    if (token) {
      // If token exists, navigate to the menus page
      navigate("/menus");
    }
  }, [navigate]); // Only run this once when the component mounts

  const handleSubmit = async (e) => {
    // Prevent form submission default behavior
    e.preventDefault();

    // Clear previous errors
    setError("");

    // Basic form validation
    if (!formData.email || !formData.password) {
      setError("Please fill out both fields.");
      return;
    }

    setLoading(true); // Start loading

    try {
      const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_KEY;
      const response = await axios.post(
        `${API_BASE_URL}/users/login`,
        formData
      );

      // Assuming the token is in `response.data.data.token`
      const token = response.data.data.token;

      // Store the token in a cookie
      Cookies.set("auth_token", token, { expires: 7, path: "/" });

      setLoading(false); // Stop loading

      // Redirect to Menus after successful login
      navigate("/menus");
    } catch (error) {
      setLoading(false); // Stop loading on error
      setError("Invalid email or password.");
      console.error(error);
    }
  };

  return (
    <div id="login-container">
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>

      <form onSubmit={handleSubmit}>
        <h3>Login Here</h3>

        {/* Display error message */}
        {error && <div style={{ color: "red" }}>{error}</div>}

        <label htmlFor="username">Email</label>
        <input
          type="text"
          placeholder="Email"
          id="username"
          name="email"
          value={formData.email}
          onChange={(e) => {
            const { name, value } = e.target;
            setFormData((prevData) => ({
              ...prevData,
              [name]: value,
            }));
          }}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          id="password"
          name="password"
          value={formData.password}
          onChange={(e) => {
            const { name, value } = e.target;
            setFormData((prevData) => ({
              ...prevData,
              [name]: value,
            }));
          }}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
