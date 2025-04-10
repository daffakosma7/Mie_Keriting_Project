import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [formData, setFormData] = useState({
    email: "",
    name: "admin",
    password: "",
    confirmPassword: "",
  });

  return (
    <div id="login-container">
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form
        onSubmit={async (e) => {
          try {
            e.preventDefault();
            console.log(formData);
            const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_KEY;
            const response = await axios.post(
              `${API_BASE_URL}/users/register`,
              formData
            );
            console.log(response);
          } catch (error) {
            console.log(error);
          }
        }}
      >
        <h3>Register Here</h3>

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
              confirmPassword: value,
              [name]: value,
            }));
          }}
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}
