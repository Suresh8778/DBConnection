import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5175/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("loggedInUser", JSON.stringify(data.user));
        navigate("/userinfo");
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("Server error");
    }
  };

  return (
    <div className="container d-flex justify-content-center">
      <div className="form-container my-5">
        <div className="form p-3">
          <p className="form-head">LOGIN</p>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email :
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter your Email"
              onChange={handleChange}
              value={formData.email}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password :
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter your Password"
              onChange={handleChange}
              value={formData.password}
            />
          </div>

          <div className="d-flex justify-content-between mt-3">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => navigate("/forgot")}
            >
              Forgot Password
            </button>

            <button
              type="button"
              className="btn btn-success"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
          <div className="mt-4 text-center">
            <span className="fs-small">
              Don't have an Account?{" "}
              <a href="/" className="text-decoration-none text-dark">
                <u>Register</u>
              </a>
            </span>
          </div>
        </div>

        <div className="text-center my-5">
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => navigate("/users")}
          >
            All Users
          </button>
        </div>
      </div>
    </div>
  );
}

export default login;
